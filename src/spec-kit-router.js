import specKitRoutes from '../ai-engineering/spec-kit/github-spec-kit-routes.json' with { type: 'json' };
import { normalizeWorkType } from './workflow-router.js';

export function detectSpecKit(context = {}) {
  const commands = new Set(context.commands ?? []);
  const markers = new Set(context.markers ?? []);
  const cliAvailable = Boolean(context.cliAvailable ?? commands.has(specKitRoutes.detection.cli));
  const projectInitialized = Boolean(
    context.projectInitialized ??
      specKitRoutes.detection.projectMarkers.some((marker) => markers.has(marker)),
  );

  if (cliAvailable && projectInitialized) {
    return {
      status: 'ready',
      provider: 'github_spec_kit',
      cli: specKitRoutes.detection.cli,
      projectInitialized,
    };
  }

  if (!cliAvailable) {
    return {
      status: 'install_required',
      provider: 'simple_sdd',
      cli: specKitRoutes.detection.cli,
      projectInitialized,
      suggestion: specKitRoutes.installSuggestion,
    };
  }

  return {
    status: 'init_required',
    provider: 'simple_sdd',
    cli: specKitRoutes.detection.cli,
    projectInitialized,
    suggestion: specKitRoutes.installSuggestion,
  };
}

export function getSpecKitRoute(workType, context = {}) {
  const normalized = normalizeWorkType(workType);
  const route = specKitRoutes.routes[normalized];
  const detection = detectSpecKit(context);

  if (!route) {
    return {
      found: false,
      workType: normalized || 'unknown',
      provider: 'simple_sdd',
      detection,
      message: `No Spec Kit route configured for ${normalized || 'unknown'}.`,
    };
  }

  if (detection.status === 'ready') {
    return {
      found: true,
      workType: normalized,
      provider: 'github_spec_kit',
      detection,
      scope: route.githubSpecKit.scope,
      commands: route.githubSpecKit.commands,
      humanApprovalRequired: route.humanApprovalRequired ?? false,
      implementationAllowed: route.implementationAllowed ?? true,
    };
  }

  return {
    found: true,
    workType: normalized,
    provider: 'simple_sdd',
    detection,
    artifacts: route.simpleSdd.artifacts,
    suggestion: detection.suggestion,
    humanApprovalRequired: route.humanApprovalRequired ?? false,
    implementationAllowed: route.implementationAllowed ?? true,
  };
}
