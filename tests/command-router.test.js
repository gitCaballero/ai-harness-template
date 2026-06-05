import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import {
  getCommandRoute,
  listCommandRoutes,
  normalizeCommand,
  validateCommandConfiguration,
} from '../src/command-router.js';

test('command router maps documented ai-harness commands to routes', () => {
  const commands = [
    'help',
    'analyze',
    'adopt',
    'decide',
    'feature',
    'bugfix',
    'hotfix',
    'refactor',
    'spike',
    'chore',
    'spec-kit',
    'review',
    'release',
  ];

  for (const command of commands) {
    const route = getCommandRoute(command);

    assert.equal(route.found, true, `${command} should have a command route`);
    assert.ok(route.process.length > 0, `${command} should have process steps`);
    assert.ok(route.outputs.length > 0, `${command} should have outputs`);
    assert.ok(route.terminalStatuses.length > 0, `${command} should have terminal statuses`);
  }
});

test('command aliases normalize to executable command routes', () => {
  assert.equal(normalizeCommand('story'), 'feature');
  assert.equal(normalizeCommand('defect'), 'bugfix');
  assert.equal(normalizeCommand('bug'), 'bugfix');
  assert.equal(normalizeCommand('research'), 'spike');
  assert.equal(normalizeCommand('task'), 'chore');
  assert.equal(getCommandRoute('story').workType, 'feature');
});

test('delivery commands reference workflow work types and terminal delivery status', () => {
  const deliveryCommands = listCommandRoutes().filter((route) => route.kind === 'delivery');

  assert.ok(deliveryCommands.length > 0);

  for (const route of deliveryCommands) {
    assert.equal(typeof route.workType, 'string', `${route.command} should map to a work type`);
    assert.ok(route.terminalStatuses.includes('READY_FOR_PR'), `${route.command} should be able to finish ready`);
    assert.ok(route.terminalStatuses.includes('BLOCKED'), `${route.command} should be able to finish blocked`);
  }
});

test('all documented base commands are covered by command routes', () => {
  const commandsDoc = readFileSync(new URL('../prompts/EDITOR_CHAT_COMMANDS.md', import.meta.url), 'utf8');
  const documentedCommands = [...commandsDoc.matchAll(/### `\/ai-harness ([^`\s]+)/g)].map((match) => match[1]);

  for (const command of documentedCommands) {
    assert.equal(getCommandRoute(command).found, true, `${command} should be configured`);
  }
});

test('command route configuration is internally consistent', () => {
  const result = validateCommandConfiguration();

  assert.equal(result.valid, true, result.issues.join('\n'));
});
