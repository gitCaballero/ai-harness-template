# Implementation Status

## MVP

- [x] Template inicial.
- [x] Tool policy.
- [x] Guardrails.
- [x] Harness automático.
- [x] GitHub Actions.
- [x] Harness.io pipeline.
- [x] Workflow SDLC AI Harness.
- [x] Routing por feature, bugfix, hotfix, refactor, spike y chore.
- [x] Implementation Auditor definido como gate.
- [x] Glosario operativo para términos clave LLM.
- [x] Constitución compactada para reducir redundancia.
- [x] Prompts y skills alineados con glosario.
- [x] Perfil Node.js con package manager, lockfile, lint, typecheck, tests, build, seguridad y code review.
- [x] Perfil .NET con Azure DevOps, code review, SOLID y Clean Architecture pragmática.
- [x] Detección de stack profiles durante adopción y decisión unificada del harness.
- [x] Command routing para entradas `/ai-harness ...`, aliases, procesos, salidas y estados terminales.
- [x] Runner `npm run ai:harness` alineado con los casos críticos de la suite nativa.
- [x] GitHub Actions y Harness.io ejecutan harness y tests nativos.
- [x] Pipeline base `azure-pipelines.yml` con detección condicional Node/.NET.
- [x] Plantillas de adopción para audiencias, tools, integraciones y dashboards de observabilidad.

## Pendiente por adopción real

- [ ] Completar audiencias con roles y aprobaciones del dominio real.
- [ ] Registrar tools reales en un manifiesto propio del proyecto.
- [ ] Materializar dashboards con métricas de CI, PRs y tickets reales.
- [ ] Conectar Jira/Confluence/Slack o equivalentes con credenciales y permisos del entorno.
- [ ] Configurar ambientes Harness.io, approvals y secrets específicos del proyecto.
