# Integration Checklist

Use this checklist when adopting the template in a real project. Do not mark an integration ready until credentials, permissions and failure behavior are verified in the target environment.

## Jira or Azure Boards

- Ticket identifier is required in `/ai-harness feature`, `/ai-harness bugfix`, `/ai-harness hotfix`, `/ai-harness refactor` and `/ai-harness chore`.
- Agent can read ticket title, acceptance criteria and linked incidents.
- Agent cannot change ticket state without explicit approval.
- Delivery evidence links back to the ticket.

## Confluence or Knowledge Base

- Agent can read approved project documentation.
- Agent records whether a fact came from docs or from repository evidence.
- Stale or conflicting pages are recorded in `ai-engineering/memory/RISKS_AND_GAPS.md`.

## Slack or Teams

- Notifications are limited to delivery status, blockers and approval requests.
- No sensitive data is posted unless the channel is approved for that data class.
- Hotfix approvals record approver, timestamp and scope.

## Harness.io

- Target environments are mapped before deployment.
- Approval gates are configured for hotfixes and releases.
- Pipeline variables do not contain secrets in plain text.
- Promotion requires `npm run ai:harness` and stack-specific checks.

