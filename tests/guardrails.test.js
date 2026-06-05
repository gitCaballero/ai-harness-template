import assert from 'node:assert/strict';
import test from 'node:test';
import { evaluateBusinessPolicy } from '../src/deterministic-policy.js';
import { maskEmail, maskIdentifier } from '../src/pii.js';

test('critical decisions stay deterministic', () => {
  const result = evaluateBusinessPolicy({
    caseId: 'case-1',
    riskLevel: 'high',
    approval: 'automatic',
  });

  assert.equal(result.approved, false);
  assert.deepEqual(result.violations, ['High risk cases require manual approval.']);
});

test('valid deterministic policy input is approved', () => {
  const result = evaluateBusinessPolicy({
    caseId: 'case-2',
    riskLevel: 'high',
    approval: 'manual',
  });

  assert.equal(result.approved, true);
});

test('PII helpers mask sensitive values', () => {
  assert.equal(maskEmail('person@example.com'), 'p***@example.com');
  assert.equal(maskIdentifier('123456789'), '*****6789');
});
