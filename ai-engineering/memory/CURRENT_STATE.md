# Current State

## Estado actual

Template refinado con constitución compacta, glosario operativo, prompts alineados, command routing para `/ai-harness ...`, detección de stack profiles, perfil Node.js para JavaScript/TypeScript y perfil .NET para Azure DevOps, code review, SOLID y Clean Architecture pragmática.

El runner estable `npm run ai:harness` cubre policy, guardrails, memoria mínima, rutas SDLC, Spec Kit, command routes, scripts, pipelines y plantillas de adopción. GitHub Actions, Harness.io y Azure Pipelines están alineados para ejecutar harness y tests nativos; Azure detecta Node/.NET antes de correr pasos específicos de stack.

## Próximo paso obligatorio

Aplicar bootstrap operativo:

1. mapear repositorio;
2. identificar entry points;
3. completar `PROJECT_CONTEXT.md`;
4. completar `ARCHITECTURE_OBSERVED.md`;
5. registrar incertidumbres en `RISKS_AND_GAPS.md`;
6. usar `prompts/MASTER_ANALYSIS.md`.

## Última verificación esperada

- `npm run ai:harness`: runner determinístico obligatorio.
- `npm run test:native`: suite nativa para CI o entornos que permitan `node --test`.
- `npm run test:all`: harness más suite nativa.
