import assert from 'node:assert/strict';
import test from 'node:test';
import { assertToolAllowed, toolCatalog, toolsForAudience } from '../src/tool-policy.js';

test('customer audience cannot execute specialist workflow tools', () => {
  const result = assertToolAllowed('customer', 'execute_workflow');

  assert.equal(result.allowed, false);
  assert.match(result.message, /not available/);
});

test('engineer audience can run implementation checks', () => {
  const result = assertToolAllowed('engineer', 'run_checks');

  assert.equal(result.allowed, true);
});

test('audience tools are explicit and discoverable', () => {
  const tools = toolsForAudience('specialist').map((tool) => tool.name);

  assert.deepEqual(tools, ['check_status', 'list_cases', 'validate_policy', 'execute_workflow', 'explain_case']);
});

test('tool descriptions use clear operational keywords', () => {
  const descriptions = toolCatalog.map((tool) => tool.description).join(' ');

  assert.match(descriptions, /business request/i);
  assert.match(descriptions, /deterministic business policy/i);
  assert.match(descriptions, /AI evaluations/i);
  assert.match(descriptions, /CI\/CD/i);
});
