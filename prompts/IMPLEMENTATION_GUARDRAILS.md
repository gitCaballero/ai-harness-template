# Implementation Guardrails Prompt

## Objetivo

Implementar cambios con bajo riesgo, evidencia, tests y memoria actualizada.

## Fuentes permitidas

- `CONSTITUTION.md`
- `ai-engineering/GLOSSARY.md`
- perfiles en `ai-engineering/profiles/` cuando el stack aplique
- specs en `ai-engineering/specs/`
- memoria en `ai-engineering/memory/`
- código y tests reales del repositorio

## Reglas

- Entender arquitectura observada antes de editar.
- No introducir antipatterns nuevos.
- No propagar antipatterns heredados hacia nuevas implementaciones.
- Usar código legado con antipatterns solo como referencia de negocio, evidencia de comportamiento o compatibilidad; nunca como patrón técnico a copiar.
- Evaluar performance con los factores del glosario: CPU, memoria, latencia, I/O, base de datos, red, serialización y concurrencia.
- Agregar cobertura de pruebas acorde a criticidad.
- Verificar flujos críticos y caminos de error afectados.
- Para Node.js, aplicar `ai-engineering/profiles/nodejs.md`, package manager detectado, lockfile, lint, typecheck, tests, build, seguridad de dependencias y code review cuando aplique.
- Para .NET, aplicar `ai-engineering/profiles/dotnet.md`, Azure DevOps, code review, SOLID y Clean Architecture simple cuando aplique.
- Actualizar memoria relevante.
- Completar checklist end-to-end.

## Escalamiento humano

Pedir validación humana cuando falten reglas de negocio, existan riesgos regulatorios, haya despliegue productivo, se toquen datos sensibles o el impacto no sea observable desde la codebase.
