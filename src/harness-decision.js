import specKitRoutes from '../ai-engineering/spec-kit/github-spec-kit-routes.json' with { type: 'json' };
import workflowRoutes from '../ai-engineering/workflows/workflow-routes.json' with { type: 'json' };
import { existsSync } from 'node:fs';
import { getSpecKitRoute } from './spec-kit-router.js';
import { detectStackProfiles } from './stack-profile-router.js';
import {
  getExecutionMode,
  getTaskDecompositionDecision,
  getWorkflowRoute,
  shouldUseSubagents,
} from './workflow-router.js';

const artifactTemplates = {
  'spec.md': '../ai-engineering/templates/spec-template.md',
  'plan.md': '../ai-engineering/templates/plan-template.md',
  'tasks.md': '../ai-engineering/templates/tasks-template.md',
  'evidence.md': '../ai-engineering/templates/evidence-template.md',
  'validation.md': '../ai-engineering/templates/validation-template.md',
};

export function createHarnessDecision({ workType, complexity = 'medium', specKitContext = {}, repositoryContext = {} } = {}) {
  const workflow = getWorkflowRoute(workType);
  const executionMode = getExecutionMode(complexity);
  const taskDecomposition = getTaskDecompositionDecision(workType, complexity);
  const spec = getSpecKitRoute(workType, specKitContext);
  const stackProfiles = detectStackProfiles(repositoryContext);
  const implementationAllowed = Boolean(
    (workflow.implementationAllowed ?? true) && (spec.implementationAllowed ?? true),
  );
  const humanApprovalRequired = Boolean(
    workflow.humanApprovalRequired ||
      spec.humanApprovalRequired ||
      executionMode.humanApprovalRequired,
  );

  return {
    found: Boolean(workflow.found && spec.found),
    workType: workflow.workType,
    complexity: String(complexity ?? 'medium').trim().toLowerCase() || 'medium',
    route: workflow.route,
    specProvider: spec.provider,
    spec,
    documentation: {
      minimumRequiredArtifacts: workflow.artifacts ?? [],
      providerArtifacts: spec.artifacts ?? [],
      providerCommands: spec.commands ?? [],
      supplementalRequired: spec.provider === 'github_spec_kit' ? workflow.artifacts ?? [] : [],
    },
    stackProfiles,
    taskDecomposition,
    execution: {
      mode: executionMode.mode,
      useSubagents: shouldUseSubagents(workType, complexity),
    },
    gates: {
      humanApprovalRequired,
      implementationAllowed,
      reviewIterations: workflow.reviewIterations ?? 0,
      tests: workflow.tests ?? [],
    },
  };
}

export function validateHarnessConfiguration() {
  const issues = [];

  for (const [workType, workflowRoute] of Object.entries(workflowRoutes.routes)) {
    const specRoute = specKitRoutes.routes[workType];

    if (!specRoute) {
      issues.push(`Missing GitHub Spec Kit route for ${workType}.`);
      continue;
    }

    const workflowArtifacts = workflowRoute.artifacts ?? [];
    const fallbackArtifacts = specRoute.simpleSdd?.artifacts ?? [];

    if (JSON.stringify(workflowArtifacts) !== JSON.stringify(fallbackArtifacts)) {
      issues.push(`Simple SDD fallback artifacts differ from workflow artifacts for ${workType}.`);
    }

    const workflowApproval = workflowRoute.humanApprovalRequired ?? false;
    const specApproval = specRoute.humanApprovalRequired ?? false;

    if (workflowApproval !== specApproval) {
      issues.push(`Human approval differs between workflow and Spec Kit route for ${workType}.`);
    }

    const workflowImplementation = workflowRoute.implementationAllowed ?? true;
    const specImplementation = specRoute.implementationAllowed ?? true;

    if (workflowImplementation !== specImplementation) {
      issues.push(`Implementation permission differs between workflow and Spec Kit route for ${workType}.`);
    }

    if (workflowRoute.taskDecomposition === 'required' && !workflowArtifacts.includes('tasks.md')) {
      issues.push(`Required task decomposition for ${workType} must include tasks.md.`);
    }

    for (const artifact of workflowArtifacts) {
      const template = artifactTemplates[artifact];

      if (!template) {
        issues.push(`No template mapping configured for ${artifact}.`);
        continue;
      }

      if (!existsSync(new URL(template, import.meta.url))) {
        issues.push(`Missing template for ${artifact}: ${template}.`);
      }
    }
  }

  return {
    valid: issues.length === 0,
    issues,
  };
}
