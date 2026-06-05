import workflowRoutes from '../ai-engineering/workflows/workflow-routes.json' with { type: 'json' };

const aliases = {
  story: 'feature',
  task: 'chore',
  defect: 'bugfix',
  bug: 'bugfix',
  research: 'spike',
};

export function normalizeWorkType(workType) {
  const normalized = String(workType ?? '').trim().toLowerCase();
  return aliases[normalized] ?? normalized;
}

export function getWorkflowRoute(workType) {
  const normalized = normalizeWorkType(workType);
  const route = workflowRoutes.routes[normalized];

  if (!route) {
    return {
      found: false,
      workType: normalized || 'unknown',
      message: `No workflow route configured for ${normalized || 'unknown'}.`,
    };
  }

  return {
    found: true,
    workType: normalized,
    ...route,
  };
}

export function getExecutionMode(complexity) {
  const normalized = String(complexity ?? '').trim().toLowerCase();
  return workflowRoutes.complexity[normalized] ?? workflowRoutes.complexity.medium;
}

export function shouldUseSubagents(workType, complexity) {
  const route = getWorkflowRoute(workType);
  const executionMode = getExecutionMode(complexity);

  return Boolean(
    route.found &&
      (executionMode.mode === 'orchestrator_plus_specialized_review' ||
        route.humanApprovalRequired ||
        route.reviewIterations > 1),
  );
}

export function getTaskDecompositionDecision(workType, complexity) {
  const route = getWorkflowRoute(workType);
  const executionMode = getExecutionMode(complexity);

  if (!route.found) {
    return {
      required: false,
      strategy: executionMode.taskStrategy,
      reason: route.message,
    };
  }

  const normalizedComplexity = String(complexity ?? '').trim().toLowerCase() || 'medium';
  const isMediumOrLarge = ['medium', 'large'].includes(normalizedComplexity);
  const isLarge = normalizedComplexity === 'large';
  const hasTaskArtifact = route.artifacts?.includes('tasks.md') ?? false;
  const requiresDecomposition =
    route.taskDecomposition === 'required' ||
    (route.taskDecomposition === 'when_medium_or_large' && isMediumOrLarge) ||
    (route.taskDecomposition === 'minimal_when_large' && isLarge) ||
    (route.taskDecomposition === 'research_questions' && isMediumOrLarge);

  return {
    required: Boolean(requiresDecomposition || (hasTaskArtifact && isMediumOrLarge)),
    strategy: executionMode.taskStrategy,
    artifact: hasTaskArtifact || requiresDecomposition ? 'tasks.md' : null,
    reason: route.taskDecomposition,
  };
}
