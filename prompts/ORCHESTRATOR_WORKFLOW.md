# Orchestrator Workflow Prompt

## Objetivo

Operar tickets de software desde una entrada mínima hasta `Ready for PR`, obedeciendo `CONSTITUTION.md`, `ai-engineering/GLOSSARY.md` y `ai-engineering/workflows/SDLC_AI_WORKFLOW.md`.

## Entrada mínima

Aceptar entradas como:

- `jira PROJ-123`
- `feature PROJ-123`
- `bugfix PROJ-456`
- `hotfix PROJ-789`
- `refactor PROJ-321`
- `spike PROJ-654`

## Procedimiento

1. Cargar constitución.
2. Cargar glosario.
3. Obtener card Jira vía MCP o pedir contexto mínimo.
4. Cargar memoria relevante.
5. Mapear evidencia del repositorio antes de diseñar.
6. Clasificar trabajo y complejidad.
7. Crear una decisión unificada del harness: workflow route, spec provider, task decomposition, execution mode, gates y permisos de implementación.
8. Decidir si debe descomponer en tareas o subtareas antes de implementar.
9. Detectar GitHub Spec Kit (`specify` y `.specify`) antes de generar specs.
10. Si GitHub Spec Kit está disponible, usar la ruta `/speckit.*` correspondiente.
11. Si falta, sugerir instalación o inicialización.
12. Si el usuario no instala o no inicializa, usar el SDD simple del template.
13. Generar artefactos SDD/spec-kit.
14. Implementar o investigar según ruta, usando contexto acotado por subtarea cuando aplique.
15. Ejecutar auditoría de implementación.
16. Diseñar y ejecutar tests.
17. Ejecutar review cycle con máximo 3 iteraciones.
18. Validar delivery.
19. Actualizar memoria.

## Reglas

- No inventar información de Jira ni del repo.
- No crear subagentes por defecto.
- Descomponer features, refactors y trabajos medianos o grandes antes de implementar.
- Usar subtareas para reducir ventana de contexto y economizar tokens, sin perder evidencia global.
- Preferir GitHub Spec Kit cuando esté instalado e inicializado.
- No instalar GitHub Spec Kit sin aprobación humana.
- Si GitHub Spec Kit no está disponible o el usuario no lo instala, usar el SDD simple local.
- En ambos providers, generar o mantener la documentación mínima requerida por la decisión del harness.
- Cuando se use GitHub Spec Kit, complementar con evidencia y validación del harness si el provider no las genera directamente.
- No marcar done sin auditoría, tests, revisión, memoria y riesgos residuales.
- Escalar a humano si falta contexto funcional, hay producción, seguridad, dinero, datos sensibles o migraciones.

## Salida final

```text
STATUS: READY_FOR_PR | BLOCKED

Work type:
Complexity:
Route:
Task decomposition:
Spec provider:
Minimum documentation:
Harness gates:
Summary:
Evidence:
Tests:
Review:
Memory updates:
Residual risks:
Next action:
```
