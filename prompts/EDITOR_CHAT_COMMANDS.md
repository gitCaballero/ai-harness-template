# Editor Chat Commands

## Objetivo

Definir entradas estándar para usar el AI harness desde chats de editores como Windsurf, VS Code, Cursor, Codex o herramientas similares, sin perder el flujo definido por la constitución, los workflows, GitHub Spec Kit y el fallback SDD simple.

## Regla general

Toda entrada `/ai-harness ...` debe cargar:

1. `CONSTITUTION.md`
2. `ai-engineering/GLOSSARY.md`
3. memoria relevante en `ai-engineering/memory/`
4. `ai-engineering/workflows/workflow-routes.json`
5. `ai-engineering/spec-kit/github-spec-kit-routes.json`
6. decisión unificada del harness

Antes de implementar, el agente debe producir o inferir:

- work type;
- complexity;
- workflow route;
- spec provider: `github_spec_kit` o `simple_sdd`;
- task decomposition;
- minimum documentation;
- harness gates;
- implementation permission.

## Comandos base

### `/ai-harness help`

Mostrar comandos disponibles y explicar el flujo mínimo.

### `/ai-harness analyze`

Analizar la codebase actual con evidencia observable usando `prompts/MASTER_ANALYSIS.md`.

Salida esperada:

- resumen ejecutivo;
- arquitectura observada;
- capacidades y flujos detectados;
- oportunidades reales para IA;
- recomendación final única;
- riesgos y límites;
- plan de arranque.

### `/ai-harness adopt`

Adaptar el harness al repositorio actual usando `prompts/ADOPT_EXISTING_PROJECT.md`.

Debe detectar:

- stack o stacks;
- runtime;
- package manager;
- stack profiles aplicables;
- tests;
- CI/CD;
- GitHub Spec Kit;
- memoria faltante;
- integración mínima reversible.

### `/ai-harness decide <work-type> <ticket-id>`

Crear la decisión unificada del harness antes de implementar.

Ejemplos:

```text
/ai-harness decide feature PROJ-123
/ai-harness decide bugfix AZDO-456
```

Salida esperada:

```text
Work type:
Complexity:
Route:
Spec provider:
Stack profiles:
Task decomposition:
Minimum documentation:
Harness gates:
Implementation allowed:
Human approval required:
```

### `/ai-harness feature <ticket-id>`

Operar una nueva capacidad funcional usando ruta `full_sdd`.

Debe:

- mapear evidencia antes de diseñar;
- generar decisión unificada;
- usar GitHub Spec Kit si está disponible;
- usar fallback SDD simple si no está disponible o el usuario no instala;
- crear documentación mínima;
- descomponer tareas;
- implementar con tests;
- actualizar memoria.

### `/ai-harness bugfix <ticket-id>`

Operar una corrección enfocada usando ruta `focused_fix`.

Debe:

- reproducir o explicar el fallo;
- mapear evidencia;
- crear spec ligera;
- descomponer solo si es mediana o grande;
- agregar regression test o documentar brecha;
- validar entrega.

### `/ai-harness hotfix <ticket-id>`

Operar una corrección urgente usando ruta `emergency_fix`.

Debe:

- crear incident note;
- aplicar el cambio más pequeño y seguro;
- ejecutar smoke o regression tests;
- pedir aprobación humana;
- documentar riesgos residuales.

### `/ai-harness refactor <ticket-id>`

Operar una mejora interna usando ruta `architecture_safe_change`.

Debe:

- demostrar comportamiento actual;
- crear plan de preservación;
- descomponer tareas;
- ejecutar regression tests;
- revisar arquitectura.

### `/ai-harness spike <ticket-id>`

Investigar sin implementación productiva usando ruta `research_only`.

Debe:

- formular preguntas de investigación;
- mapear evidencia;
- comparar opciones;
- recomendar una sola opción;
- evitar cambios productivos salvo pedido explícito posterior.

### `/ai-harness chore <ticket-id>`

Operar mantenimiento usando ruta `maintenance`.

Debe:

- confirmar si cambia comportamiento;
- documentar cambios;
- ejecutar checks relevantes;
- actualizar memoria si cambia el modo de operación.

### `/ai-harness spec-kit`

Detectar GitHub Spec Kit.

Debe:

- verificar CLI `specify`;
- verificar marcadores `.specify`;
- si está listo, usar `github_spec_kit`;
- si falta CLI, sugerir instalación oficial;
- si falta init, sugerir `specify init --here --integration codex --script ps`;
- si el usuario no instala o no inicializa, usar `simple_sdd`.

### `/ai-harness review`

Revisar el cambio actual contra constitución, specs, tests, performance, memoria y riesgos.

Debe priorizar:

- bugs;
- regresiones;
- seguridad;
- falta de tests;
- antipatterns;
- performance;
- documentación mínima incompleta.

### `/ai-harness release`

Preparar evidencia de entrega y CI/CD usando `prompts/harness-operator.md`.

Debe validar:

- build;
- tests;
- `npm run ai:harness`;
- memoria;
- riesgos;
- approvals;
- estado final.

## Alias aceptados

| Entrada | Normaliza a |
| --- | --- |
| `/ai-harness story` | `feature` |
| `/ai-harness defect` | `bugfix` |
| `/ai-harness bug` | `bugfix` |
| `/ai-harness research` | `spike` |
| `/ai-harness task` | `chore` |

## Reglas de seguridad

- No inventar información de tickets, repo, arquitectura o negocio.
- No instalar GitHub Spec Kit sin aprobación humana.
- No crear subagentes por defecto.
- No implementar sin decisión unificada del harness.
- No marcar `READY_FOR_PR` sin documentación mínima, tests/checks, memoria y riesgos residuales.
- Escalar a humano si hay producción, seguridad, datos sensibles, dinero, regulación, migraciones o incertidumbre crítica.

## Formato final recomendado

```text
STATUS: READY_FOR_PR | BLOCKED

Command:
Work type:
Complexity:
Route:
Spec provider:
Stack profiles:
Task decomposition:
Minimum documentation:
Harness gates:
Summary:
Evidence:
Tests:
Memory updates:
Residual risks:
Next action:
```
