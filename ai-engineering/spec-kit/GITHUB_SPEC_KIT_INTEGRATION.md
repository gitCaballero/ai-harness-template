# GitHub Spec Kit Integration

## Objetivo

Permitir que el AI harness use GitHub Spec Kit cuando esté disponible en el proyecto y caiga automáticamente al SDD/spec-kit simple del template cuando no esté instalado o inicializado.

## Política de decisión

El harness debe decidir en este orden:

1. Detectar si la CLI `specify` está disponible.
2. Detectar si el proyecto ya fue inicializado con Spec Kit, usando marcadores como `.specify` o `.specify/templates`.
3. Si CLI y proyecto están listos, usar la ruta `github_spec_kit`.
4. Si falta la CLI, sugerir instalación oficial desde `github/spec-kit`.
5. Si existe la CLI pero falta inicialización del proyecto, sugerir `specify init --here`.
6. Si el usuario no instala o no inicializa, usar `simple_sdd` con los artefactos del template.

## Comandos oficiales de referencia

Para instalación persistente:

```powershell
uv tool install specify-cli --from git+https://github.com/github/spec-kit.git
```

Para inicializar un proyecto existente con Codex y PowerShell:

```powershell
specify init --here --integration codex --script ps
```

Para inicialización one-shot sin instalación persistente:

```powershell
uvx --from git+https://github.com/github/spec-kit.git specify init --here --integration codex --script ps
```

Para validar instalación:

```powershell
specify check
specify --version
specify version --features --json
```

## Rutas por tipo de trabajo

| Entrada | Provider preferido | Fallback |
| --- | --- | --- |
| `feature` | `/speckit.specify`, `/speckit.clarify`, `/speckit.plan`, `/speckit.tasks`, `/speckit.analyze`, `/speckit.implement` | `spec.md`, `plan.md`, `tasks.md`, `evidence.md`, `validation.md` |
| `bugfix` | `/speckit.specify`, `/speckit.plan`, `/speckit.tasks`, `/speckit.analyze`, `/speckit.implement` | `spec.md`, `evidence.md`, `validation.md` |
| `hotfix` | `/speckit.specify`, `/speckit.plan`, `/speckit.tasks`, `/speckit.implement` | `spec.md`, `evidence.md`, `validation.md` |
| `refactor` | `/speckit.specify`, `/speckit.plan`, `/speckit.tasks`, `/speckit.analyze`, `/speckit.implement` | `spec.md`, `plan.md`, `tasks.md`, `evidence.md`, `validation.md` |
| `spike` | `/speckit.specify`, `/speckit.clarify`, `/speckit.checklist` | `spec.md`, `evidence.md`, `validation.md` |
| `chore` | `/speckit.specify`, `/speckit.plan`, `/speckit.tasks` | `spec.md`, `evidence.md`, `validation.md` |

## Reglas

- No instalar herramientas automáticamente sin aprobación humana.
- No usar paquetes no oficiales con nombre similar.
- No bloquear el trabajo si el usuario decide no instalar Spec Kit.
- Mantener el fallback `simple_sdd` como ruta válida y verificable.
- Registrar en la salida final qué provider fue usado: `github_spec_kit` o `simple_sdd`.
- Mantener la documentación mínima del harness en ambos providers.
- Cuando `github_spec_kit` genere specs, el harness todavía debe registrar evidencia observable, validación, riesgos residuales y memoria actualizada.

## Documentación mínima

La decisión unificada del harness expone `minimumRequiredArtifacts`. Estos artefactos son obligatorios aunque el provider sea GitHub Spec Kit.

| Artefacto | Propósito |
| --- | --- |
| `spec.md` | Problema, objetivos, criterios, restricciones y definición de done. |
| `plan.md` | Arquitectura observada, estrategia, tests, performance y rollback. |
| `tasks.md` | Subtareas con contexto acotado, evidencia y validación por tarea. |
| `evidence.md` | Hechos observados, inferencias, hipótesis y dependencias críticas. |
| `validation.md` | Comandos, resultados, checks, riesgos residuales y estado final. |
