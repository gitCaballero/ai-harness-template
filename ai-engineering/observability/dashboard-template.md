# Observability Dashboard Template

Use this template to define dashboards for AI-assisted delivery. Metrics should be generated from CI, PRs, tickets or harness evidence, not from unverifiable chat summaries.

## Delivery Health

- Harness checks pass rate.
- Native tests pass rate.
- Average time from ticket to `READY_FOR_PR`.
- Percentage of work ending as `BLOCKED`.

## Quality Signals

- Regression test coverage for bugfixes.
- Hotfixes with human approval recorded.
- PRs with updated evidence and validation artifacts.
- Reopened tickets after AI-assisted delivery.

## Context Quality

- Memory files updated per delivery.
- Risks closed versus newly opened.
- Specs with observable evidence.
- Decisions using deterministic policy instead of LLM judgment.

## Alerts

- Harness failed on main branch.
- Hotfix without approval evidence.
- Delivery command missing terminal status.
- Stack-specific tests skipped without explanation.

