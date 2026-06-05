# Adopt Existing Project Prompt

## Objetivo

Adaptar este AI harness a una codebase existente sin romper arquitectura, convenciones, pipelines, tests ni flujos de entrega actuales.

## Alcance

Usar `CONSTITUTION.md`, `ai-engineering/GLOSSARY.md`, `prompts/MASTER_ANALYSIS.md`, memoria en `ai-engineering/memory/`, documentación real, pipelines existentes y artefactos observables del repositorio destino.

El resultado debe dejar una adopción mínima, verificable y reversible del harness, no una reescritura del proyecto.

## Entrada esperada

Aceptar entradas como:

- `adopt existing project`
- `adapt harness to this repo`
- `brownfield adoption`
- `adopt PROJ-123`
- `adopt AZDO-456`

Cuando exista ticket, issue o work item, usarlo como contexto. Si falta contexto funcional crítico, pedir solo lo mínimo necesario.

## Secuencia obligatoria

1. Cargar `CONSTITUTION.md`.
2. Cargar `ai-engineering/GLOSSARY.md`.
3. Cargar `prompts/MASTER_ANALYSIS.md`.
4. Mapear estructura real del repositorio destino.
5. Detectar stack o stacks, runtime, package managers, tests, pipelines, linters y comandos existentes.
6. Mapear señales observables a perfiles en `ai-engineering/profiles/`, por ejemplo `nodejs.md` cuando exista `package.json` o `dotnet.md` cuando existan `.sln`/`.csproj`.
7. Cargar todos los stack profiles aplicables antes de proponer rutas, gates o comandos.
8. Si hay múltiples stacks, declarar ownership por carpeta, paquete, solución o servicio cuando sea observable.
9. Identificar puntos de entrada, módulos principales, límites arquitectónicos y convenciones locales.
10. Registrar evidencia observable en memoria o spec.
11. Definir la mínima integración del harness.
12. Decidir si la adopción debe dividirse en subtareas por stack, pipeline, memoria, prompts, tests o policy.
13. Detectar si GitHub Spec Kit está instalado e inicializado.
14. Si está disponible, adaptar la adopción a las rutas `/speckit.*`.
15. Si falta, sugerir instalación o inicialización.
16. Si el usuario no instala o no inicializa, usar el SDD simple del template.
17. Adaptar comandos, rutas, tool policy, guardrails y stack profile solo cuando exista evidencia.
18. Crear o actualizar spec de adopción en `ai-engineering/specs/`.
19. Ejecutar checks reales del proyecto y `npm run ai:harness` cuando aplique.
20. Actualizar memoria operativa, riesgos y estado.
21. Entregar `READY_FOR_PR` o `BLOCKED`.

## Clasificación obligatoria

Separar hallazgos importantes usando la taxonomía del glosario:

- `HECHO_OBSERVADO`
- `INFERENCIA_RAZONABLE`
- `HIPOTESIS`
- `DEPENDENCIA_CRITICA_DE_CONTEXTO`
- `RECOMENDACION`

## Reglas de adopción

- No reemplazar pipelines existentes sin justificación observable.
- No cambiar estructura de carpetas productivas salvo necesidad demostrada.
- No mover reglas de negocio durante la adopción inicial.
- Descomponer adopciones medianas o grandes para reducir contexto activo y validar por partes.
- No instalar GitHub Spec Kit sin aprobación humana.
- Usar el SDD simple del template si GitHub Spec Kit no está disponible o el usuario decide no instalarlo.
- No crear subagentes por defecto.
- No inventar dominios, audiencias, tools, permisos, SLAs, regulaciones ni reglas de negocio.
- No copiar antipatterns técnicos como patrón nuevo; usarlos solo como referencia de comportamiento existente.
- No marcar done sin evidencia, checks, memoria actualizada y riesgos residuales.
- Escalar a humano si hay producción, seguridad, datos sensibles, dinero, regulación, migraciones o incertidumbre crítica.

## Mínima integración recomendada

Aplicar primero:

- `CONSTITUTION.md`
- `ai-engineering/GLOSSARY.md`
- `ai-engineering/memory/`
- `ai-engineering/specs/`
- `prompts/`
- `src/` de policies solo si el proyecto acepta Node para el harness
- `tests/` del harness o equivalente en el stack real
- CI gate para ejecutar el harness

Adaptar después:

- `.harness/ai-harness-pipeline.yaml`
- `.github/workflows/`
- `azure-pipelines.yml`
- stack profiles
- tool policies reales
- observability dashboards
- integraciones Jira, Azure DevOps, Confluence, Slack o equivalentes

## Formato de salida

```text
STATUS: READY_FOR_PR | BLOCKED

Adoption target:
Detected stack:
Loaded stack profiles:
Stack ownership:
Existing delivery flow:
Harness pieces applied:
Harness pieces deferred:
Task decomposition:
Spec provider:
Files changed:
Evidence:
Commands run:
Checks:
Memory updates:
Residual risks:
Human approvals needed:
Next action:
```

## Límites

La adopción debe favorecer cambios pequeños, auditables y reversibles. Si el proyecto no tiene tests, CI o documentación suficiente, registrar la brecha y proponer el gate mínimo antes de expandir el harness.
