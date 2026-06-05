# Spec Driven Implementation

## Cuándo usar

Usa esta skill para implementar un cambio basado en SDD/spec-kit.

## Procedimiento

1. Leer `CONSTITUTION.md`.
2. Leer `ai-engineering/GLOSSARY.md`.
3. Abrir la spec en `ai-engineering/specs/`.
4. Confirmar objetivos, no objetivos y criterios de aceptación.
5. Identificar herramientas, audiencias, guardrails, antipatterns posibles y funciones críticas.
6. Implementar el cambio mínimo sin introducir antipatterns.
7. Agregar evaluaciones en `tests/` o `ai-engineering/evals/`.
8. Evaluar impacto de performance.
9. Ejecutar `npm run ai:harness`.
10. Actualizar memoria en `ai-engineering/memory/` y estado en `ai-engineering/state/implementation-status.md`.
11. Completar checklist end-to-end.
