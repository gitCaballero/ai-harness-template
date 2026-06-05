import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { evaluateBusinessPolicy } from '../src/deterministic-policy.js';
import { createHarnessDecision, validateHarnessConfiguration } from '../src/harness-decision.js';
import { maskEmail, maskIdentifier } from '../src/pii.js';
import { getSpecKitRoute } from '../src/spec-kit-router.js';
import { detectStackProfiles } from '../src/stack-profile-router.js';
import { assertToolAllowed, toolsForAudience } from '../src/tool-policy.js';
import { getTaskDecompositionDecision, getWorkflowRoute, shouldUseSubagents } from '../src/workflow-router.js';

const tests = [];

function test(name, fn) {
  tests.push({ name, fn });
}

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

test('constitution is present and contains mandatory delivery controls', () => {
  const constitution = readFileSync(new URL('../CONSTITUTION.md', import.meta.url), 'utf8');

  assert.match(constitution, /hecho observado/i);
  assert.match(constitution, /antipatterns/i);
  assert.match(constitution, /performance/i);
  assert.match(constitution, /cobertura de pruebas/i);
  assert.match(constitution, /actualizar la memoria operativa/i);
  assert.match(constitution, /checklist end-to-end/i);
  assert.match(constitution, /propagación de antipatterns/i);
  assert.match(constitution, /referencia de negocio/i);
});

test('glossary is present and defines shared AI harness terms', () => {
  const glossary = readFileSync(new URL('../ai-engineering/GLOSSARY.md', import.meta.url), 'utf8');

  assert.match(glossary, /AI harness/i);
  assert.match(glossary, /Evidencia observable/i);
  assert.match(glossary, /Deterministic policy/i);
  assert.match(glossary, /Subagente/i);
});

test('.NET profile defines Azure DevOps, review and architecture gates', () => {
  const dotnetProfile = readFileSync(new URL('../ai-engineering/profiles/dotnet.md', import.meta.url), 'utf8');

  assert.match(dotnetProfile, /Azure DevOps/i);
  assert.match(dotnetProfile, /Code review/i);
  assert.match(dotnetProfile, /SOLID/i);
  assert.match(dotnetProfile, /Clean Architecture/i);
  assert.match(dotnetProfile, /Prohibiciones explícitas/i);
  assert.match(dotnetProfile, /propagar antipatterns/i);
  assert.match(dotnetProfile, /referencia de negocio/i);
  assert.match(dotnetProfile, /dotnet build/i);
  assert.match(dotnetProfile, /dotnet test/i);
});

test('Node.js profile defines package manager, typecheck and security gates', () => {
  const nodejsProfile = readFileSync(new URL('../ai-engineering/profiles/nodejs.md', import.meta.url), 'utf8');

  assert.match(nodejsProfile, /package manager/i);
  assert.match(nodejsProfile, /package\.json/i);
  assert.match(nodejsProfile, /lockfile/i);
  assert.match(nodejsProfile, /TypeScript/i);
  assert.match(nodejsProfile, /typecheck/i);
  assert.match(nodejsProfile, /npm ci/i);
  assert.match(nodejsProfile, /pnpm install --frozen-lockfile/i);
  assert.match(nodejsProfile, /Code review/i);
  assert.match(nodejsProfile, /Prohibiciones explícitas/i);
  assert.match(nodejsProfile, /propagar antipatterns/i);
  assert.match(nodejsProfile, /dependencias/i);
});

test('stack profile router detects Node.js and .NET from repository signals', () => {
  const result = detectStackProfiles({
    files: ['package.json', 'pnpm-lock.yaml', 'src/index.ts', 'api/Api.csproj'],
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

test('minimum memory and prompt structure exists', () => {
  const requiredFiles = [
    '../ai-engineering/memory/PROJECT_CONTEXT.md',
    '../ai-engineering/memory/ARCHITECTURE_OBSERVED.md',
    '../ai-engineering/memory/DOMAIN_MAP.md',
    '../ai-engineering/memory/CURRENT_STATE.md',
    '../ai-engineering/memory/ARCHITECTURE_DECISIONS.md',
    '../ai-engineering/memory/WORKING_NOTES.md',
    '../ai-engineering/memory/RISKS_AND_GAPS.md',
    '../prompts/MASTER_ANALYSIS.md',
    '../prompts/IMPLEMENTATION_GUARDRAILS.md',
    '../prompts/REVIEW_CHECKLIST.md',
    '../prompts/ORCHESTRATOR_WORKFLOW.md',
    '../prompts/EDITOR_CHAT_COMMANDS.md',
    '../ai-engineering/GLOSSARY.md',
    '../ai-engineering/profiles/nodejs.md',
    '../ai-engineering/profiles/dotnet.md',
    '../ai-engineering/templates/plan-template.md',
    '../ai-engineering/templates/tasks-template.md',
    '../ai-engineering/templates/evidence-template.md',
    '../ai-engineering/templates/validation-template.md',
    '../ai-engineering/workflows/SDLC_AI_WORKFLOW.md',
    '../ai-engineering/workflows/workflow-routes.json',
    '../azure-pipelines.yml',
  ];

  for (const file of requiredFiles) {
    assert.equal(existsSync(new URL(file, import.meta.url)), true, `${file} should exist`);
  }
});

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

test('complex work is decomposed before implementation', () => {
  assert.equal(getTaskDecompositionDecision('feature', 'small').required, true);
  assert.equal(getTaskDecompositionDecision('bugfix', 'small').required, false);
  assert.equal(getTaskDecompositionDecision('bugfix', 'medium').required, true);
  assert.equal(getTaskDecompositionDecision('hotfix', 'large').strategy, 'decompose_by_domain_boundary');
});

test('github spec kit is preferred when detected and simple SDD is the fallback', () => {
  const readyRoute = getSpecKitRoute('feature', {
    commands: ['specify'],
    markers: ['.specify'],
  });
  const fallbackRoute = getSpecKitRoute('feature', {});

  assert.equal(readyRoute.provider, 'github_spec_kit');
  assert.deepEqual(readyRoute.commands.slice(0, 3), ['/speckit.specify', '/speckit.clarify', '/speckit.plan']);
  assert.equal(fallbackRoute.provider, 'simple_sdd');
  assert.deepEqual(fallbackRoute.artifacts, ['spec.md', 'plan.md', 'tasks.md', 'evidence.md', 'validation.md']);
  assert.match(fallbackRoute.suggestion.persistentInstall, /github\/spec-kit/);
});

test('harness decision composes workflow, spec provider, tasks and gates', () => {
  const decision = createHarnessDecision({
    workType: 'hotfix',
    complexity: 'large',
    specKitContext: { commands: ['specify'], markers: ['.specify'] },
  });

  assert.equal(decision.found, true);
  assert.equal(decision.route, 'emergency_fix');
  assert.equal(decision.specProvider, 'github_spec_kit');
  assert.equal(decision.taskDecomposition.required, true);
  assert.deepEqual(decision.documentation.minimumRequiredArtifacts, ['spec.md', 'evidence.md', 'validation.md']);
  assert.deepEqual(decision.documentation.supplementalRequired, ['spec.md', 'evidence.md', 'validation.md']);
  assert.equal(decision.gates.humanApprovalRequired, true);
  assert.equal(decision.gates.implementationAllowed, true);
});

test('harness decision includes stack profiles for targeted adoption', () => {
  const decision = createHarnessDecision({
    workType: 'feature',
    repositoryContext: {
      files: ['package.json', 'tsconfig.json'],
    },
  });

  assert.deepEqual(decision.stackProfiles.profilesToLoad, ['ai-engineering/profiles/nodejs.md']);
  assert.equal(decision.stackProfiles.detected[0].stack, 'nodejs');
});

test('harness configuration stays consistent across routers', () => {
  const result = validateHarnessConfiguration();

  assert.equal(result.valid, true, result.issues.join('\n'));
});

test('editor chat commands expose aligned ai harness entries', () => {
  const commands = readFileSync(new URL('../prompts/EDITOR_CHAT_COMMANDS.md', import.meta.url), 'utf8');

  assert.match(commands, /\/ai-harness adopt/);
  assert.match(commands, /\/ai-harness decide/);
  assert.match(commands, /\/ai-harness feature/);
  assert.match(commands, /\/ai-harness spec-kit/);
  assert.match(commands, /decisión unificada del harness/i);
  assert.match(commands, /simple_sdd/);
  assert.match(commands, /github_spec_kit/);
});

let failures = 0;

for (const item of tests) {
  try {
    item.fn();
    console.log(`ok - ${item.name}`);
  } catch (error) {
    failures += 1;
    console.error(`not ok - ${item.name}`);
    console.error(error);
  }
}

console.log(`\n${tests.length - failures}/${tests.length} checks passed`);

if (failures > 0) {
  process.exitCode = 1;
}
