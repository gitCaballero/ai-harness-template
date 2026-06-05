export const audiences = {
  customer: ['create_request', 'check_status', 'explain_case'],
  specialist: ['check_status', 'list_cases', 'validate_policy', 'execute_workflow', 'explain_case'],
  engineer: ['create_spec', 'run_checks', 'update_docs', 'prepare_release', 'explain_case'],
};

export const toolCatalog = [
  {
    name: 'create_request',
    description: 'Create a business request or case.',
    requiredParameters: ['caseId'],
  },
  {
    name: 'check_status',
    description: 'Check case or implementation status.',
    requiredParameters: ['caseId'],
  },
  {
    name: 'list_cases',
    description: 'List operational cases.',
    requiredParameters: [],
  },
  {
    name: 'validate_policy',
    description: 'Run deterministic business policy validation.',
    requiredParameters: ['caseId'],
  },
  {
    name: 'execute_workflow',
    description: 'Execute an approved operational workflow.',
    requiredParameters: ['caseId'],
  },
  {
    name: 'create_spec',
    description: 'Create or update an SDD specification.',
    requiredParameters: ['specId'],
  },
  {
    name: 'run_checks',
    description: 'Run tests, quality gates and AI evaluations.',
    requiredParameters: [],
  },
  {
    name: 'update_docs',
    description: 'Update technical documentation and implementation state.',
    requiredParameters: ['docId'],
  },
  {
    name: 'prepare_release',
    description: 'Prepare release evidence for CI/CD.',
    requiredParameters: ['releaseId'],
  },
  {
    name: 'explain_case',
    description: 'Explain status, policies and next steps.',
    requiredParameters: ['caseId'],
  },
];

export function toolsForAudience(audience) {
  const allowed = audiences[audience] ?? [];
  return toolCatalog.filter((tool) => allowed.includes(tool.name));
}

export function canUseTool(audience, toolName) {
  return toolsForAudience(audience).some((tool) => tool.name === toolName);
}

export function assertToolAllowed(audience, toolName) {
  if (!canUseTool(audience, toolName)) {
    return {
      allowed: false,
      message: `Tool ${toolName} is not available for audience ${audience}.`,
    };
  }

  return {
    allowed: true,
    message: `Tool ${toolName} is available for audience ${audience}.`,
  };
}
