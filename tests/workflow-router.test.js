import assert from 'node:assert/strict';
import test from 'node:test';
import { getSpecKitRoute } from '../src/spec-kit-router.js';
import {
  getTaskDecompositionDecision,
  getWorkflowRoute,
  shouldUseSubagents,
} from '../src/workflow-router.js';

test('workflow router maps core work types to expected routes', () => {
  assert.equal(getWorkflowRoute('feature').route, 'full_sdd');
  assert.equal(getWorkflowRoute('bug').route, 'focused_fix');
  assert.equal(getWorkflowRoute('hotfix').humanApprovalRequired, true);
  assert.equal(getWorkflowRoute('spike').implementationAllowed, false);
});

test('subagents are not the default for small focused work', () => {
  assert.equal(shouldUseSubagents('bugfix', 'small'), false);
  assert.equal(shouldUseSubagents('feature', 'large'), true);
});

test('task decomposition is required for features and complex work', () => {
  assert.equal(getTaskDecompositionDecision('feature', 'small').required, true);
  assert.equal(getTaskDecompositionDecision('bugfix', 'small').required, false);
  assert.equal(getTaskDecompositionDecision('bugfix', 'medium').required, true);
  assert.equal(getTaskDecompositionDecision('hotfix', 'large').artifact, 'tasks.md');
});

test('github spec kit route falls back to simple SDD when not detected', () => {
  const route = getSpecKitRoute('feature', {});

  assert.equal(route.provider, 'simple_sdd');
  assert.equal(route.detection.status, 'install_required');
  assert.deepEqual(route.artifacts, ['spec.md', 'plan.md', 'tasks.md', 'evidence.md', 'validation.md']);
});

test('github spec kit route is selected when CLI and project markers exist', () => {
  const route = getSpecKitRoute('feature', {
    commands: ['specify'],
    markers: ['.specify'],
  });

  assert.equal(route.provider, 'github_spec_kit');
  assert.equal(route.detection.status, 'ready');
  assert.deepEqual(route.commands.slice(0, 4), [
    '/speckit.specify',
    '/speckit.clarify',
    '/speckit.plan',
    '/speckit.tasks',
  ]);
});
