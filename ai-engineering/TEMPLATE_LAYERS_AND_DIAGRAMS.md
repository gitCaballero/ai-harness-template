# Template Layers And Diagrams

## Propósito

Este documento explica las capas del AI harness template, por qué existen y para qué fueron generadas. También define los diagramas recomendados para entender, auditar y adoptar el template en proyectos existentes.

La regla central viene de `CONSTITUTION.md`: primero evidencia, después diseño; primero agente principal, después subagentes solo cuando exista una justificación real.

## Capas del template

### 1. Capa constitucional

**Archivos principales**

- `CONSTITUTION.md`
- `ai-engineering/GLOSSARY.md`

**Por qué existe**

Esta capa evita que cada prompt, agente o pipeline tenga reglas distintas. Centraliza evidencia, límites de autonomía, antipatterns, performance, cobertura de pruebas, memoria y definición de done.

**Para qué fue generada**

- Gobernar todo el trabajo del harness.
- Fijar vocabulario común para humanos, agentes LLM y CI/CD.
- Separar hechos observados, inferencias, hipótesis, dependencias críticas y recomendaciones.
- Reducir falsos positivos de entrega.

### 2. Capa de memoria

**Archivos principales**

- `ai-engineering/memory/PROJECT_CONTEXT.md`
- `ai-engineering/memory/ARCHITECTURE_OBSERVED.md`
- `ai-engineering/memory/DOMAIN_MAP.md`
- `ai-engineering/memory/CURRENT_STATE.md`
- `ai-engineering/memory/ARCHITECTURE_DECISIONS.md`
- `ai-engineering/memory/WORKING_NOTES.md`
- `ai-engineering/memory/RISKS_AND_GAPS.md`

**Por qué existe**

Los agentes necesitan contexto persistente, pero ese contexto debe ser verificable y mantenerse separado del prompt temporal. La memoria reduce repetición, alinea decisiones y registra riesgos.

**Para qué fue generada**

- Guardar propósito, arquitectura observada, dominios, decisiones y riesgos.
- Registrar estado vivo del trabajo.
- Evitar que cada análisis empiece desde cero.
- Dejar trazabilidad de cambios relevantes.

### 3. Capa SDD/spec-kit

**Archivos principales**

- `ai-engineering/specs/`
- `ai-engineering/spec-kit/`
- `ai-engineering/templates/spec-template.md`
- `ai-engineering/templates/jira-sdd-spec-template.md`
- `ai-engineering/templates/checklist-template.md`

**Por qué existe**

Los cambios importantes necesitan pasar por una definición explícita de problema, evidencia, plan, tareas y validación antes de implementarse.

**Para qué fue generada**

- Convertir tickets o prompts mínimos en trabajo verificable.
- Separar requisitos, plan, tareas, evidencia y validación.
- Preferir GitHub Spec Kit cuando `specify` y `.specify` estén disponibles.
- Usar el SDD simple local cuando GitHub Spec Kit no esté disponible o el usuario no lo instale.
- Hacer visible el impacto de arquitectura, tests, performance y rollback.

### 4. Capa de workflows

**Archivos principales**

- `ai-engineering/workflows/SDLC_AI_WORKFLOW.md`
- `ai-engineering/workflows/workflow-routes.json`
- `src/workflow-router.js`

**Por qué existe**

No todos los trabajos requieren el mismo proceso. Un hotfix, una feature y un spike tienen riesgos y gates distintos.

**Para qué fue generada**

- Clasificar trabajos como `feature`, `bugfix`, `hotfix`, `refactor`, `spike` o `chore`.
- Seleccionar la ruta correcta.
- Decidir si el trabajo requiere task decomposition antes de implementar.
- Definir artefactos, tests, revisiones y aprobaciones.
- Mantener el modo default como agente principal único.

### 5. Capa de prompts y skills

**Archivos principales**

- `prompts/MASTER_ANALYSIS.md`
- `prompts/ADOPT_EXISTING_PROJECT.md`
- `prompts/ORCHESTRATOR_WORKFLOW.md`
- `prompts/IMPLEMENTATION_GUARDRAILS.md`
- `prompts/REVIEW_CHECKLIST.md`
- `prompts/harness-operator.md`
- `prompts/software-agent.md`
- `skills/`

**Por qué existe**

Los prompts definen cómo debe actuar el agente en cada fase. Las skills empaquetan instrucciones reutilizables para tareas especializadas.

**Para qué fue generada**

- Analizar codebases existentes.
- Adaptar el harness a proyectos brownfield.
- Operar tickets hasta `READY_FOR_PR`.
- Guiar implementación, revisión y operación CI/CD.
- Evitar que la lógica crítica viva solo en lenguaje natural.

### 6. Capa de policy runtime

**Archivos principales**

- `src/tool-policy.js`
- `src/deterministic-policy.js`
- `src/pii.js`
- `src/workflow-router.js`
- `src/spec-kit-router.js`
- `src/harness-decision.js`

**Por qué existe**

Las reglas críticas deben poder validarse de forma determinística. El prompt puede orientar, pero no debe ser la única barrera para permisos, PII, rutas o decisiones críticas.

**Para qué fue generada**

- Definir tools permitidas por audiencia.
- Validar políticas determinísticas.
- Enmascarar PII.
- Resolver rutas de workflow desde configuración versionada.
- Resolver provider de specs entre `github_spec_kit` y `simple_sdd`.
- Componer una decisión única del harness antes de implementar.

### 7. Capa de evaluación y checks

**Archivos principales**

- `tests/`
- `scripts/run-harness.js`
- `package.json`
- `ai-engineering/evals/`

**Por qué existe**

El template necesita una forma rápida de comprobar que sus reglas mínimas siguen vivas después de cambios.

**Para qué fue generada**

- Ejecutar `npm run ai:harness`.
- Validar tool policy, PII, deterministic policy, glosario, constitución, memoria mínima y rutas.
- Servir como gate local y de CI.
- Dar una base para evaluaciones futuras.

### 8. Capa CI/CD y promoción

**Archivos principales**

- `.github/workflows/ai-harness.yml`
- `azure-pipelines.yml`
- `.harness/ai-harness-pipeline.yaml`
- `ai-engineering/observability/tracing.md`

**Por qué existe**

El harness debe integrarse al flujo real de entrega, no quedarse como documentación local. CI/CD permite repetir checks, publicar evidencia y pedir aprobaciones cuando corresponde.

**Para qué fue generada**

- Ejecutar checks en PR o pipeline.
- Integrar GitHub Actions, Azure DevOps y Harness.io.
- Agregar approval gates para escenarios críticos.
- Preparar trazabilidad y observabilidad.

### 9. Capa de perfiles por stack

**Archivos principales**

- `ai-engineering/profiles/dotnet.md`

**Por qué existe**

Un harness genérico no alcanza para todos los stacks. Cada plataforma tiene comandos, riesgos, convenciones y gates propios.

**Para qué fue generada**

- Detectar soluciones `.NET`.
- Definir comandos de restore, build, test, cobertura y format.
- Alinear Azure DevOps, code review, SOLID pragmático y Clean Architecture pragmática.
- Evitar adaptar el harness con supuestos falsos.

## Diagrama de arquitectura del template

```mermaid
flowchart TD
  User["Usuario o ticket"] --> Prompts["Prompts y skills"]
  Prompts --> Constitution["Constitución y glosario"]
  Prompts --> Memory["Memoria del proyecto"]
  Prompts --> Workflows["Workflow routes"]
  Workflows --> Decomposition["Task decomposition"]
  Decomposition --> Decision["Harness decision"]
  Decision --> SpecProvider{"Spec provider"}
  SpecProvider -->|detectado| GitHubSpecKit["GitHub Spec Kit"]
  SpecProvider -->|fallback| Specs["Simple SDD specs"]
  GitHubSpecKit --> Runtime
  Specs --> Runtime["Policy runtime"]
  Runtime --> Checks["Tests y AI harness"]
  Checks --> CICD["CI/CD y Harness.io"]
  CICD --> Delivery["READY_FOR_PR o BLOCKED"]
  Delivery --> Memory
```

## Diagrama de capas

```mermaid
flowchart TB
  L1["Capa constitucional\nCONSTITUTION + GLOSSARY"]
  L2["Capa memoria\ncontexto, arquitectura, riesgos, estado"]
  L3["Capa SDD/spec-kit\nGitHub Spec Kit o simple SDD fallback"]
  L4["Capa workflows\nrutas, complejidad y task decomposition"]
  L5["Capa prompts y skills\nanálisis, adopción, operación, review"]
  L6["Capa policy runtime\ntool policy, PII, deterministic policy"]
  L7["Capa evaluación\nnpm run ai:harness, tests, evals"]
  L8["Capa CI/CD\nGitHub Actions, Azure DevOps, Harness.io"]

  L1 --> L2 --> L3 --> L4 --> L5 --> L6 --> L7 --> L8
```

## Diagrama de flujo SDLC

```mermaid
flowchart LR
  A["Entrada mínima"] --> B["Cargar contexto"]
  B --> C["Mapear evidencia"]
  C --> D["Clasificar trabajo"]
  D --> E["Decidir task decomposition"]
  E --> F{"GitHub Spec Kit disponible"}
  F -->|Sí| G["Usar /speckit.*"]
  F -->|No| H["Sugerir instalación"]
  H -->|No instalado| I["Usar simple SDD fallback"]
  G --> J["Implementar por subtarea o investigar"]
  I --> J
  J --> K["Auditoría de implementación"]
  K --> L["Tests y checks"]
  L --> M["Review cycle"]
  M --> N["Actualizar memoria"]
  N --> O{"Delivery"}
  O -->|Aprobado| P["READY_FOR_PR"]
  O -->|Falta evidencia| Q["BLOCKED"]
```

## Diagrama de secuencia

```mermaid
sequenceDiagram
  participant U as Usuario
  participant O as Orchestrator AI
  participant C as Context Loader
  participant E as Evidence Mapper
  participant D as Task Planner
  participant S as Spec Generator
  participant W as Worker
  participant A as Auditor
  participant T as Test Runner
  participant R as Reviewer
  participant M as Memory

  U->>O: feature, bugfix, hotfix, refactor, spike o chore
  O->>C: cargar constitución, glosario, memoria y ticket
  C-->>O: contexto disponible
  O->>E: mapear repo y evidencia
  E-->>O: hechos, inferencias, hipótesis y dependencias
  O->>D: decidir task decomposition
  D-->>O: required, strategy y contexto por subtarea
  O->>S: crear artefactos SDD
  S-->>O: spec, plan, tasks, evidence y validation
  O->>W: ejecutar ruta seleccionada
  W-->>O: cambios o hallazgos
  O->>A: auditar completitud
  A-->>O: COMPLETE o INCOMPLETE
  O->>T: ejecutar tests y harness
  T-->>O: resultados
  O->>R: revisar entrega
  R-->>O: aprobado o cambios requeridos
  O->>M: actualizar memoria y riesgos
  O-->>U: READY_FOR_PR o BLOCKED
```

## Diagrama de rutas por tipo de trabajo

```mermaid
flowchart TD
  Input["Tipo de trabajo"] --> Feature["feature"]
  Input --> Bugfix["bugfix"]
  Input --> Hotfix["hotfix"]
  Input --> Refactor["refactor"]
  Input --> Spike["spike"]
  Input --> Chore["chore"]

  Feature --> Full["full_sdd\nspec completa, tests, 2 reviews"]
  Bugfix --> Focused["focused_fix\nspec ligera, regression, 1 review"]
  Hotfix --> Emergency["emergency_fix\nincident note, smoke, aprobación humana"]
  Refactor --> Arch["architecture_safe_change\npreservar comportamiento, regression"]
  Spike --> Research["research_only\nsin implementación productiva"]
  Chore --> Maint["maintenance\nchecks si cambia comportamiento"]
```

## Diagrama de adopción en proyecto existente

```mermaid
flowchart TD
  Repo["Proyecto existente"] --> Analyze["Master analysis"]
  Analyze --> Stack["Detectar stack, tests y CI/CD"]
  Stack --> Boundaries["Mapear arquitectura y convenciones"]
  Boundaries --> Memory["Completar memoria observable"]
  Memory --> AdoptionSpec["Crear spec de adopción"]
  AdoptionSpec --> Minimal["Aplicar integración mínima"]
  Minimal --> Checks["Ejecutar checks reales y AI harness"]
  Checks --> Result{"Resultado"}
  Result -->|Checks verdes| PR["READY_FOR_PR"]
  Result -->|Contexto o gates faltantes| Blocked["BLOCKED"]
```

## Diagrama de CI/CD

```mermaid
flowchart LR
  Commit["Commit o PR"] --> CI["GitHub Actions / Azure DevOps / Harness.io"]
  CI --> Install["Instalar dependencias"]
  Install --> ProjectChecks["Build y tests del proyecto"]
  ProjectChecks --> Harness["npm run ai:harness"]
  Harness --> Approval{"Approval requerido"}
  Approval -->|No| Ready["Ready for PR/Merge"]
  Approval -->|Sí| Human["Aprobación humana"]
  Human --> Ready
```

## Diagrama de tool policy

```mermaid
flowchart TD
  Audience["Audiencia"] --> Customer["customer"]
  Audience --> Specialist["specialist"]
  Audience --> Engineer["engineer"]

  Customer --> CTools["create_request\ncheck_status\nexplain_case"]
  Specialist --> STools["check_status\nlist_cases\nvalidate_policy\nexecute_workflow\nexplain_case"]
  Engineer --> ETools["create_spec\nrun_checks\nupdate_docs\nprepare_release\nexplain_case"]

  CTools --> Policy["src/tool-policy.js"]
  STools --> Policy
  ETools --> Policy
  Policy --> Decision["allowed / not allowed"]
```

## Diagrama de memoria

```mermaid
flowchart TD
  Stable["Memoria estable"] --> Project["PROJECT_CONTEXT"]
  Stable --> Architecture["ARCHITECTURE_OBSERVED"]
  Stable --> Domain["DOMAIN_MAP"]
  Stable --> Decisions["ARCHITECTURE_DECISIONS"]

  Operational["Memoria operativa"] --> Current["CURRENT_STATE"]
  Operational --> Notes["WORKING_NOTES"]
  Operational --> Risks["RISKS_AND_GAPS"]

  Work["Trabajo actual"] --> Stable
  Work --> Operational
  Operational --> Delivery["Validación final"]
  Delivery --> Stable
```

## Diagrama de estados de entrega

```mermaid
stateDiagram-v2
  [*] --> IN_PROGRESS
  IN_PROGRESS --> BLOCKED: falta contexto, evidencia o aprobación
  IN_PROGRESS --> REVIEW: implementación y checks iniciales
  REVIEW --> IN_PROGRESS: cambios requeridos
  REVIEW --> READY_FOR_PR: auditoría, tests, review y memoria completos
  BLOCKED --> IN_PROGRESS: contexto resuelto
  READY_FOR_PR --> [*]
```

## Uso recomendado

Usar este documento para:

- onboarding de nuevos proyectos;
- explicar el template a revisores técnicos;
- justificar por qué existe cada carpeta;
- elegir diagramas para documentación ejecutiva o técnica;
- adaptar el harness a codebases existentes sin inventar arquitectura.
