import { existsSync } from 'node:fs';
import commandRoutes from '../ai-engineering/workflows/command-routes.json' with { type: 'json' };
import workflowRoutes from '../ai-engineering/workflows/workflow-routes.json' with { type: 'json' };

export function normalizeCommand(command) {
  const normalized = String(command ?? '').trim().toLowerCase();
  return commandRoutes.aliases[normalized] ?? normalized;
}

export function getCommandRoute(command) {
  const normalized = normalizeCommand(command);
  const route = commandRoutes.commands[normalized];

  if (!route) {
    return {
      found: false,
      command: normalized || 'unknown',
      message: `No command route configured for ${normalized || 'unknown'}.`,
    };
  }

  return {
    found: true,
    command: normalized,
    ...route,
  };
}

export function listCommandRoutes() {
  return Object.keys(commandRoutes.commands).map(getCommandRoute);
}

export function validateCommandConfiguration() {
  const issues = [];

  for (const [command, route] of Object.entries(commandRoutes.commands)) {
    if (!Array.isArray(route.inputRequired)) {
      issues.push(`Command ${command} must declare inputRequired.`);
    }

    if (!Array.isArray(route.process) || route.process.length === 0) {
      issues.push(`Command ${command} must declare at least one process step.`);
    }

    if (!Array.isArray(route.outputs) || route.outputs.length === 0) {
      issues.push(`Command ${command} must declare outputs.`);
    }

    if (!Array.isArray(route.terminalStatuses) || route.terminalStatuses.length === 0) {
      issues.push(`Command ${command} must declare terminalStatuses.`);
    }

    if (route.workType && !workflowRoutes.routes[route.workType]) {
      issues.push(`Command ${command} references missing work type ${route.workType}.`);
    }

    if (route.processPrompt && !existsSync(new URL(`../${route.processPrompt}`, import.meta.url))) {
      issues.push(`Command ${command} references missing process prompt ${route.processPrompt}.`);
    }
  }

  for (const [alias, command] of Object.entries(commandRoutes.aliases)) {
    if (!commandRoutes.commands[command]) {
      issues.push(`Alias ${alias} points to missing command ${command}.`);
    }
  }

  return {
    valid: issues.length === 0,
    issues,
  };
}
