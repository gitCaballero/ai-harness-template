# Current State

## Estado actual

Template refinado con constitución compacta, glosario operativo, prompts alineados, detección de stack profiles, perfil Node.js para JavaScript/TypeScript y perfil .NET para Azure DevOps, code review, SOLID y Clean Architecture pragmática.

## Próximo paso obligatorio

Aplicar bootstrap operativo:

1. mapear repositorio;
2. identificar entry points;
3. completar `PROJECT_CONTEXT.md`;
4. completar `ARCHITECTURE_OBSERVED.md`;
5. registrar incertidumbres en `RISKS_AND_GAPS.md`;
6. usar `prompts/MASTER_ANALYSIS.md`.

## Última verificación

- `npm run ai:harness`: 20/20 checks passed después de agregar detección de stack profiles.
- `node --test`: 17/17 tests passed fuera del sandbox después de `spawn EPERM` en ejecución restringida.
