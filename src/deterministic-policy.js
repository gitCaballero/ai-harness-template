export function evaluateBusinessPolicy(input) {
  const violations = [];

  if (!input || typeof input !== 'object') {
    violations.push('Input must be an object.');
  }

  if (!input?.caseId) {
    violations.push('caseId is required.');
  }

  if (input?.riskLevel === 'high' && input?.approval !== 'manual') {
    violations.push('High risk cases require manual approval.');
  }

  return {
    approved: violations.length === 0,
    violations,
    policyVersion: '1.0.0',
  };
}
