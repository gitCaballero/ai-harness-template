# AI Engineering

Sistema operativo del AI harness: specs, memoria, evaluaciones, guardrails, workflows, observabilidad y estado.

La constitución raíz (`CONSTITUTION.md`) manda sobre esta carpeta. `GLOSSARY.md` define términos clave para prompts, memoria, tests y documentación.

## Carpetas

- `specs/` - SDD/spec-kit para nuevos casos de uso.
- `evals/` - datasets, métricas y criterios de evaluación.
- `guardrails/` - reglas de seguridad, herramientas y autonomía.
- `memory/` - memoria persistente del agente.
- `observability/` - trazabilidad y métricas.
- `profiles/` - perfiles por stack, como Node.js y .NET.
- `spec-kit/` - reglas de integración con GitHub Spec Kit y fallback SDD simple.
- `state/` - estado de implementación y checklists.
- `templates/` - plantillas reutilizables.
- `GLOSSARY.md` - vocabulario común para humanos, agentes LLM y pipelines.
- `TEMPLATE_LAYERS_AND_DIAGRAMS.md` - explicación por capas del template y diagramas recomendados.

## Templates mínimos

- `templates/spec-template.md` - spec mínima.
- `templates/plan-template.md` - plan de implementación.
- `templates/tasks-template.md` - subtareas con contexto acotado.
- `templates/evidence-template.md` - evidencia clasificada.
- `templates/validation-template.md` - validación, riesgos y estado final.

## Ciclo mínimo

Spec -> Prompt/Skill -> Implementación -> Harness -> CI/CD -> Memoria/estado actualizado.

## Memoria mínima obligatoria

- `memory/PROJECT_CONTEXT.md`
- `memory/ARCHITECTURE_OBSERVED.md`
- `memory/DOMAIN_MAP.md`
- `memory/CURRENT_STATE.md`
- `memory/ARCHITECTURE_DECISIONS.md`
- `memory/WORKING_NOTES.md`
- `memory/RISKS_AND_GAPS.md`
