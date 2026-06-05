# Architecture Decisions

## ADR-0001: Constitución como política central

## Estado

Aprobada para el template.

## Decisión

La constitución vive en `CONSTITUTION.md` y gobierna análisis, implementación, revisión, memoria, performance, cobertura, antipatterns y definición de done.

## Racional

Centralizar la política evita que prompts o skills diverjan y permite verificar obligaciones mínimas con el harness.

## Consecuencias

- Los prompts deben referenciar la constitución.
- El vocabulario común vive en `ai-engineering/GLOSSARY.md`.
- La memoria debe actualizarse después de cambios relevantes.
- El checklist end-to-end es parte de la entrega.

## ADR-0002: Glosario como contrato semántico

## Estado

Aprobada para el template.

## Decisión

`ai-engineering/GLOSSARY.md` define términos clave, taxonomía de hallazgos y nomenclatura operativa para agentes LLM, humanos y pipelines.

## Racional

Centralizar el vocabulario reduce texto repetido en prompts y facilita que cualquier modelo identifique evidencia, hipótesis, guardrails, memoria, deterministic policy, cobertura de pruebas, performance y done.

## Consecuencias

- Prompts y skills deben referenciar el glosario en lugar de duplicar definiciones largas.
- El harness verifica que el glosario exista.
- Nuevos términos operativos deben agregarse primero al glosario.

## ADR-0003: Perfil .NET con Azure DevOps y code review

## Estado

Aprobada para el template.

## Decisión

`ai-engineering/profiles/dotnet.md` define gates y prohibiciones para soluciones .NET, incluyendo Azure DevOps, code review, SOLID pragmático y Clean Architecture pragmática.

## Racional

El harness base no garantiza consistencia por stack. Un perfil .NET agrega comandos, señales, pipelines y criterios específicos para reducir falsos positivos en bugfix, hotfix, feature y refactor.

## Consecuencias

- Cuando exista `.sln`, `.slnx` o `.csproj`, el agente debe cargar el perfil .NET.
- Los cambios .NET deben ejecutar build, tests y revisión de arquitectura según criticidad.
- Azure DevOps debe usarse para trazabilidad, PR policies, approvals y pipelines cuando el proyecto lo adopte.

## ADR-0004: Antipatterns legados no son patrones técnicos

## Estado

Aprobada para el template.

## Decisión

El código legado con antipatterns puede usarse como referencia de negocio, comportamiento observable o compatibilidad, pero no puede usarse como patrón técnico para nuevas implementaciones.

## Racional

Copiar deuda heredada propaga acoplamiento, fragilidad y falsos positivos de entrega. El harness debe permitir entender reglas existentes sin normalizar la deuda técnica.

## Consecuencias

- Toda nueva implementación debe aislar o reducir antipatterns heredados.
- Los prompts de implementación y review deben bloquear propagación de antipatterns.
- El harness verifica que esta prohibición exista en la constitución y el perfil .NET.

## ADR-0005: Perfil Node.js con package manager, typecheck y seguridad de dependencias

## Estado

Aprobada para el template.

## Decisión

`ai-engineering/profiles/nodejs.md` define gates y prohibiciones para proyectos Node.js, JavaScript y TypeScript, incluyendo detección de package manager, lockfile, lint, typecheck, tests, build, seguridad de dependencias, performance y code review.

## Racional

El harness base no puede asumir que todos los proyectos Node.js usan el mismo runtime, package manager, framework o estrategia de tests. Un perfil Node.js reduce falsos positivos al obligar al agente a respetar scripts locales, lockfiles, TypeScript, frontend/backend boundaries, monorepos y seguridad de dependencias.

## Consecuencias

- Cuando exista `package.json`, el agente debe cargar el perfil Node.js.
- Los cambios Node.js deben ejecutar lint, typecheck, tests y build relevantes cuando existan.
- Cambios en dependencias o lockfiles requieren revisión explícita.
- El código legado con antipatterns no debe copiarse como patrón técnico en nuevas implementaciones Node.js.

## ADR-0006: Detección de stack profiles durante adopción y decisión

## Estado

Aprobada para el template.

## Decisión

El agente principal debe detectar stack o stacks a partir de señales observables del repositorio y cargar los perfiles aplicables en `ai-engineering/profiles/` antes de proponer rutas, gates, comandos o implementación.

## Racional

Una adopción brownfield puede contener múltiples stacks, por ejemplo frontend Node.js y backend .NET. Si el agente no detecta esas fronteras, puede ejecutar comandos incorrectos, omitir gates relevantes o aplicar buenas prácticas del stack equivocado.

## Consecuencias

- `src/stack-profile-router.js` centraliza señales, perfiles y gates mínimos por stack.
- `createHarnessDecision` incluye `stackProfiles` en la decisión unificada.
- `/ai-harness adopt` y `/ai-harness analyze` deben reportar stacks detectados, señales, perfiles cargados y ownership por carpeta o servicio cuando sea observable.
- Si un stack no tiene perfil disponible, el agente debe registrar la brecha y usar guardrails generales hasta crear el perfil.
