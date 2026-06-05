import assert from 'node:assert/strict';
import test from 'node:test';
import { createHarnessDecision, validateHarnessConfiguration } from '../src/harness-decision.js';
import { detectStackProfiles } from '../src/stack-profile-router.js';

test('harness decision combines route, spec provider and gates', () => {
  const decision = createHarnessDecision({
    workType: 'feature',
    complexity: 'large',
    specKitContext: { commands: ['specify'], markers: ['.specify'] },
  });

  assert.equal(decision.found, true);
  assert.equal(decision.workType, 'feature');
  assert.equal(decision.route, 'full_sdd');
  assert.equal(decision.specProvider, 'github_spec_kit');
  assert.deepEqual(decision.documentation.minimumRequiredArtifacts, [
    'spec.md',
    'plan.md',
    'tasks.md',
    'evidence.md',
    'validation.md',
  ]);
  assert.deepEqual(decision.documentation.supplementalRequired, [
    'spec.md',
    'plan.md',
    'tasks.md',
    'evidence.md',
    'validation.md',
  ]);
  assert.equal(decision.taskDecomposition.required, true);
  assert.equal(decision.execution.useSubagents, true);
  assert.equal(decision.gates.humanApprovalRequired, true);
});

test('harness decision falls back to simple SDD without Spec Kit', () => {
  const decision = createHarnessDecision({
    workType: 'bugfix',
    complexity: 'small',
  });

  assert.equal(decision.specProvider, 'simple_sdd');
  assert.deepEqual(decision.documentation.minimumRequiredArtifacts, ['spec.md', 'evidence.md', 'validation.md']);
  assert.deepEqual(decision.documentation.providerArtifacts, ['spec.md', 'evidence.md', 'validation.md']);
  assert.deepEqual(decision.documentation.supplementalRequired, []);
  assert.equal(decision.taskDecomposition.required, false);
  assert.deepEqual(decision.spec.artifacts, ['spec.md', 'evidence.md', 'validation.md']);
});

test('stack profile detection maps repository signals to profiles', () => {
  const result = detectStackProfiles({
    files: ['package.json', 'pnpm-lock.yaml', 'src/api/cases.ts', 'backend/Service.csproj'],
  });

  assert.deepEqual(
    result.detected.map((profile) => profile.stack),
    ['nodejs', 'dotnet'],
  );
  assert.deepEqual(result.profilesToLoad, [
    'ai-engineering/profiles/nodejs.md',
    'ai-engineering/profiles/dotnet.md',
  ]);
  assert.equal(result.requiresProfile, true);
});

test('harness decision includes detected stack profiles', () => {
  const decision = createHarnessDecision({
    workType: 'feature',
    repositoryContext: {
      files: ['package.json', 'tsconfig.json'],
    },
  });

  assert.deepEqual(decision.stackProfiles.profilesToLoad, ['ai-engineering/profiles/nodejs.md']);
  assert.equal(decision.stackProfiles.detected[0].stack, 'nodejs');
});

test('harness configuration is internally consistent', () => {
  const result = validateHarnessConfiguration();

  assert.equal(result.valid, true, result.issues.join('\n'));
});
