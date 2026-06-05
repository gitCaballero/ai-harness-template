# SDLC AI Harness Workflow

## Propósito

Este workflow define cómo operar un ciclo de vida de software asistido por IA usando Jira, SDD/spec-kit, agentes con herramientas, evaluaciones automáticas, revisión y gates de entrega.

La regla principal es constitucional: primero evidencia, después diseño; primero agente principal, después subagentes solo si se justifican por riesgo, contexto o permisos.

## Arquitectura Refinada

```text
User
  |
  v
Minimal Prompt
  |
  v
Orchestrator AI
  |
  +-- Context Loader
  |     +-- Jira Card via MCP
  |     +-- Repo Memory
  |     +-- Constitution
  |
  +-- Evidence Mapper
  |     +-- Repo map
  |     +-- Entry points
  |     +-- Related tests/docs
  |
  +-- Work Classifier
  |     +-- Feature / Bugfix / Hotfix / Refactor / Spike / Chore
  |
  +-- Complexity Analyzer
  |     +-- Small / Medium / Large
  |
  +-- Task Decomposition Planner
  |     +-- Required / Optional / Not needed
  |     +-- Context budget per task
  |
  +-- SDD Spec Generator
  |     +-- Card + Evidence -> Spec / Plan / Tasks
  |
  +-- Workflow Router
  |     +-- Selects route and required gates
  |
  +-- Harness Decision
  |     +-- Workflow route
  |     +-- Spec provider
  |     +-- Task decomposition
  |     +-- Execution mode
  |     +-- Gates and implementation permission
  |
  +-- Implementation Worker
  |
  +-- Implementation Auditor
  |     +-- Completeness and anti-false-done gate
  |
  +-- Test Designer and Runner
  |
  +-- Review Cycle
  |     +-- 1 to 3 iterations
  |
  +-- Delivery Validator
        +-- Ready for PR / Ready for Merge
```

## Entrada mínima

El usuario puede iniciar con:

```text
jira PROJ-123
feature PROJ-123
bugfix PROJ-456
hotfix PROJ-789
refactor PROJ-321
spike PROJ-654
```

El orquestador debe obtener la card desde Jira vía MCP cuando esté disponible. Si Jira no está disponible, debe pedir el contenido mínimo: título, descripción, criterios de aceptación, prioridad y restricciones.

## Clasificación híbrida

No se debe confiar únicamente en el tipo de ticket. La clasificación final debe combinar:

- tipo de issue en Jira;
- texto de título y descripción;
- criterios de aceptación;
- archivos o módulos afectados;
- riesgo técnico;
- evidencia del repositorio.

```yaml
work_types:
  feature:
    route: full_sdd
    spec_required: true
    tests_required: true
    review_iterations: 2

  bugfix:
    route: focused_fix
    spec_required: light
    tests_required: true
    review_iterations: 1

  hotfix:
    route: emergency_fix
    spec_required: incident_note
    tests_required: smoke_or_regression
    review_iterations: 1
    human_approval_required: true

  refactor:
    route: architecture_safe_change
    spec_required: true
    tests_required: regression
    review_iterations: 2

  spike:
    route: research_only
    spec_required: research_brief
    implementation_allowed: false
    review_iterations: 0

  chore:
    route: maintenance
    spec_required: light
    tests_required: when_behavior_changes
    review_iterations: 1
```

## Análisis de complejidad

```yaml
complexity:
  small:
    indicators:
      - one module or isolated function
      - low business risk
      - existing tests nearby
    default_agents: orchestrator_only

  medium:
    indicators:
      - multiple files or one integration boundary
      - moderate business or operational risk
      - tests need expansion
    default_agents: orchestrator_with_worker_modes

  large:
    indicators:
      - multiple domains or apps
      - persistence, auth, money, regulatory, production automation, or migrations
      - unclear business context
    default_agents: orchestrator_plus_specialized_review
    human_approval_required: true
```

## Descomposición de tareas

Antes de implementar, el orquestador debe decidir si conviene separar el trabajo en tareas o subtareas. Esta decisión busca aumentar acertividad, reducir la ventana de contexto activa y economizar tokens sin perder la evidencia global.

```yaml
task_decomposition:
  required:
    - feature
    - refactor
    - medium_or_large_work
    - multiple_files_or_modules
    - unclear_boundaries
    - high_risk_change

  optional:
    - small_bugfix
    - small_chore
    - documentation_only_change

  output:
    - task_goal
    - files_or_modules_in_scope
    - required_context
    - expected_evidence
    - validation_for_task
```

Descomposición no significa multiagente automático. El agente principal debe ejecutar subtareas pequeñas por defecto. Solo debe usar subagentes cuando existan fronteras reales de dominio, permisos, herramientas, riesgo o contexto.

## SDD/spec-kit artifacts

Para cada ticket se genera una carpeta de trabajo:

```text
ai-engineering/specs/<ticket-id>/
  spec.md
  plan.md
  tasks.md
  evidence.md
  validation.md
```

### `spec.md`

- problema;
- contexto de negocio;
- requisitos;
- criterios de aceptación;
- restricciones;
- dependencias;
- riesgos;
- definición de done.

### `plan.md`

- arquitectura observada relevante;
- archivos esperados;
- estrategia de implementación;
- estrategia de tests;
- impacto de performance;
- rollback o mitigación.

### `tasks.md`

- tareas pequeñas y verificables;
- owner lógico;
- estado;
- evidencia esperada.
- contexto mínimo necesario por tarea;
- validación esperada por tarea.

### `evidence.md`

- hechos observados;
- inferencias razonables;
- hipótesis;
- dependencias críticas de contexto;
- artefactos que sostienen cada conclusión.

### `validation.md`

- comandos ejecutados;
- resultados;
- riesgos residuales;
- checklist end-to-end.

## Rutas de workflow

Antes de implementar, el orquestador debe producir una decisión unificada del harness. Esa decisión combina:

- tipo de trabajo normalizado;
- complejidad;
- ruta de workflow;
- provider de spec: `github_spec_kit` o `simple_sdd`;
- decisión de task decomposition;
- modo de ejecución;
- uso o no de subagentes;
- aprobación humana requerida;
- permiso de implementación;
- tests esperados.

### Feature: `full_sdd`

```text
Load Context
  -> Evidence Map
  -> Generate Spec
  -> Generate Plan
  -> Break Tasks
  -> Execute Task by Task
  -> Implement
  -> Implementation Audit
  -> Tests
  -> Review Cycle
  -> Delivery Validation
```

### Bugfix: `focused_fix`

```text
Load Context
  -> Reproduce or Explain Failure
  -> Evidence Map
  -> Light Spec
  -> Implement
  -> Implementation Audit
  -> Regression Tests
  -> Review
  -> Delivery Validation
```

### Hotfix: `emergency_fix`

```text
Load Context
  -> Incident Note
  -> Minimal Risk Analysis
  -> Implement Smallest Safe Fix
  -> Implementation Audit
  -> Smoke or Regression Tests
  -> Human Approval
  -> Delivery Validation
```

### Refactor: `architecture_safe_change`

```text
Load Context
  -> Evidence Map
  -> Refactor Spec
  -> Behavior Preservation Plan
  -> Break Tasks
  -> Implement in Small Steps
  -> Implementation Audit
  -> Regression Tests
  -> Architecture Review
  -> Delivery Validation
```

### Spike: `research_only`

```text
Load Context
  -> Evidence Map
  -> Research Questions
  -> Findings
  -> Options
  -> Recommendation
  -> Risks and Unknowns
```

Spikes no deben entregar cambios productivos salvo que el usuario lo pida explícitamente después de revisar resultados.

## Implementation Auditor

El auditor existe para evitar falsos positivos de finalización.

Debe emitir:

```text
STATUS: COMPLETE | INCOMPLETE

Completed:
- ...

Pending:
- ...

Risks:
- ...

Evidence:
- ...
```

Checklist obligatorio:

- criterios de aceptación completados;
- tareas marcadas como hechas con evidencia;
- código compila;
- tests relevantes existen;
- no hay TODOs nuevos sin justificar;
- no hay stubs o mocks productivos;
- no hay implementaciones parciales escondidas;
- documentación y memoria actualizadas;
- antipatterns nuevos descartados;
- impacto de performance evaluado.

Si el auditor devuelve `INCOMPLETE`, el trabajo vuelve a implementación.

## Test Designer and Runner

En un template simple, este rol puede ser un modo del agente principal. Debe separarse como agente independiente solo cuando el riesgo o complejidad lo justifique.

Debe cubrir:

- unit tests;
- regression tests;
- integration or contract tests cuando haya integraciones;
- error paths;
- edge cases;
- smoke tests para hotfix.

El implementador puede proponer tests, pero el test designer debe revisar sesgos: happy path superficial, aserciones débiles o cobertura aparente.

## Review Cycle

Máximo 3 iteraciones.

```text
Review
  -> Fix
  -> Review
  -> Fix
  -> Review
```

La revisión debe cubrir:

- bugs y regresiones;
- arquitectura observada;
- seguridad;
- performance;
- mantenibilidad;
- testing;
- memoria;
- definición de done.

Para trabajos pequeños, una sola revisión del agente principal puede bastar. Para trabajos grandes o críticos, se justifican revisiones especializadas.

## Delivery Validator

Gate final:

```yaml
required:
  - constitution_followed
  - jira_card_loaded_or_context_provided
  - work_classified
  - complexity_assessed
  - spec_artifacts_created
  - implementation_audit_passed
  - tests_passed
  - review_passed
  - memory_updated
  - risks_documented
  - ready_for_pr
```

Salida:

```text
STATUS: READY_FOR_PR | BLOCKED

Summary:
- ...

Evidence:
- ...

Residual risks:
- ...
```

## Regla de simplicidad

La arquitectura conceptual muestra varios roles, pero el template no debe arrancar con muchos agentes permanentes. La implementación recomendada es:

- **Orchestrator AI único** como default.
- Roles internos activados por fase: classifier, spec generator, auditor, tester, reviewer.
- Subagentes solo para trabajos grandes, críticos o con fronteras reales de contexto, permisos o riesgo.

Esto mantiene bajo el costo de contexto y evita coordinación innecesaria.
