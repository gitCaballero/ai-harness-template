# .NET Engineering Profile

Perfil especializado para operar bugfix, hotfix, feature, refactor, spike y chore en soluciones .NET usando el AI harness.

## Cuándo usar

Usar este perfil cuando el repositorio tenga señales .NET:

- archivos `.sln`, `.slnx`, `.csproj`, `.fsproj` o `.vbproj`;
- proyectos ASP.NET Core, Worker Service, class libraries, tests o Azure Functions;
- Entity Framework Core, Dapper, MediatR, Minimal APIs, controllers, background jobs o hosted services;
- pipelines Azure DevOps, GitHub Actions o Harness.io que ejecuten `dotnet`.

## Fuentes obligatorias

- `CONSTITUTION.md`
- `ai-engineering/GLOSSARY.md`
- `ai-engineering/workflows/workflow-routes.json`
- solución `.sln` o `.slnx`
- proyectos `.csproj`
- tests existentes
- configuración visible: `Directory.Build.props`, `Directory.Packages.props`, `global.json`, `NuGet.config`, `appsettings*.json`
- pipelines Azure DevOps, GitHub Actions o Harness.io

## Entrada mínima

```text
bugfix AZDO-456
El endpoint GET /cases/{id}/status devuelve Pending para casos cerrados.
```

Entrada recomendada:

```text
feature AZDO-123

Título: Consultar estado de caso por cliente.
Contexto: ASP.NET Core API con Clean Architecture.
Criterios de aceptación:
- El cliente solo consulta sus propios casos.
- No exponer PII cruda.
- Agregar test unitario de policy y test de endpoint autorizado.
Restricciones:
- No modificar schema de base de datos.
- Mantener reglas críticas en código determinístico.
```

## Flujo obligatorio

1. Cargar constitución, glosario y este perfil.
2. Identificar solución y proyectos: `.sln`, `.csproj`, proyectos productivos y proyectos de test.
3. Mapear arquitectura observada antes de editar.
4. Clasificar tipo de trabajo y complejidad.
5. Revisar dependencias, configuración y pipelines.
6. Reproducir fallo o definir comportamiento esperado.
7. Implementar el cambio mínimo.
8. Ejecutar build, tests y análisis configurado.
9. Ejecutar code review.
10. Actualizar memoria, estado y riesgos.
11. Entregar `READY_FOR_PR` o `BLOCKED`.

## Comandos recomendados

Ejecutar los comandos que existan y aplicar el equivalente local cuando el proyecto use scripts propios.

```bash
dotnet restore
dotnet build --configuration Release --no-restore
dotnet test --configuration Release --no-build
dotnet test --configuration Release --collect:"XPlat Code Coverage"
dotnet format --verify-no-changes
```

Cuando exista solución:

```bash
dotnet restore <solution>.sln
dotnet build <solution>.sln --configuration Release --no-restore
dotnet test <solution>.sln --configuration Release --no-build
```

Cuando existan migrations EF Core:

```bash
dotnet ef migrations list --project <data-project> --startup-project <startup-project>
```

## Azure DevOps

Azure DevOps debe tratarse como fuente de trabajo, trazabilidad y gates.

### Integración esperada

- Work Items para `feature`, `bugfix`, `hotfix`, `refactor`, `spike` y `chore`.
- Pull Requests con reviewers obligatorios.
- Build validation policy activa.
- Branch policies para ramas protegidas.
- Pipeline YAML versionado en el repositorio.
- Publicación de resultados de test y cobertura.
- Aprobaciones manuales para hotfix, producción, datos sensibles y migraciones.

### Variables y secretos

- Usar Variable Groups, Library, Azure Key Vault o service connections.
- No guardar secretos en prompts, specs, memoria, `appsettings.json`, tests o código.
- No imprimir tokens, connection strings ni PII en logs.

### Gates mínimos

- restore exitoso;
- build Release exitoso;
- tests exitosos;
- cobertura publicada cuando esté configurada;
- análisis estático o formatting cuando esté configurado;
- code review aprobado;
- work item vinculado;
- riesgos residuales documentados;
- aprobación humana para hotfix o producción.

## Code review

Todo cambio debe pasar por revisión antes de `READY_FOR_PR`.

### Revisión obligatoria

- Correctitud funcional.
- Regresiones.
- Seguridad y autorización.
- Manejo de errores.
- Tests y cobertura de pruebas.
- Performance.
- Compatibilidad con arquitectura observada.
- SOLID cuando aplique.
- Clean Architecture cuando aplique.
- Riesgos de migración o despliegue.
- Observabilidad: logs, traces, métricas y correlation id cuando exista patrón.

### Salida de revisión

```text
CODE_REVIEW: APPROVED | CHANGES_REQUESTED | BLOCKED

Findings:
- Severity:
- File:
- Evidence:
- Recommendation:

Tests:
Architecture:
Security:
Performance:
Residual risks:
```

## SOLID pragmático

Aplicar SOLID de forma simple, solo cuando mejore mantenibilidad real.

- **S**: una clase debe tener una razón principal de cambio.
- **O**: extender comportamiento sin modificar contratos estables cuando sea razonable.
- **L**: implementaciones deben respetar expectativas del contrato base.
- **I**: interfaces pequeñas y orientadas a consumidores reales.
- **D**: reglas de alto nivel no deben depender directamente de infraestructura.

No crear abstracciones vacías solo para aparentar SOLID.

## Clean Architecture pragmática

Aplicar cuando el proyecto ya usa capas o cuando el cambio toca reglas de negocio, persistencia, integraciones o presentación.

Dirección recomendada de dependencias:

```text
Domain/Application -> abstractions
Infrastructure -> implements abstractions
API/Worker -> composition root
Tests -> validate behavior and boundaries
```

### Reglas

- Domain no depende de Infrastructure, Web, EF Core, HTTP clients ni frameworks externos.
- Application puede definir casos de uso, DTOs internos, validaciones y puertos.
- Infrastructure implementa persistencia, APIs externas, colas, filesystem, reloj, email y proveedores.
- API/Worker compone dependencias, autentica, autoriza, valida entrada y llama casos de uso.
- Tests deben cubrir reglas críticas cerca del dominio/application y contratos en fronteras.

## Prohibiciones explícitas

Queda prohibido:

- saltar `dotnet build` o `dotnet test` cuando el cambio toca código .NET;
- entregar cambios sin test cuando cambia comportamiento;
- marcar `READY_FOR_PR` con tests fallidos;
- modificar reglas de negocio sin evidencia, spec o criterio de aceptación;
- propagar antipatterns de código legado hacia nuevas implementaciones;
- usar código legado con antipatterns como referencia técnica; solo puede usarse como referencia de negocio, evidencia de comportamiento o compatibilidad;
- introducir dependencias directas desde Domain hacia Infrastructure, Web, EF Core o proveedores externos;
- mezclar lógica de negocio crítica dentro de controllers, Minimal API handlers, Razor views o jobs;
- ocultar errores con `catch (Exception)` sin manejo, logging y decisión explícita;
- usar `.Result`, `.Wait()` o blocking sync sobre async sin justificación técnica;
- crear service locator o resolver dependencias manualmente fuera del composition root;
- agregar interfaces, factories o layers sin consumidor real;
- guardar secretos o PII cruda en memoria, logs, prompts, specs, tests o configs versionadas;
- deshabilitar nullable, analyzers, warnings o tests para hacer pasar el build;
- cambiar migrations o schema sin plan, rollback y aprobación cuando aplique;
- introducir queries N+1, carga excesiva o serialización innecesaria;
- hacer hotfix productivo sin aprobación humana;
- aprobar PR sin code review.

## Uso permitido de código legado

Cuando el código legado contenga antipatterns, usarlo únicamente para entender:

- regla de negocio existente;
- comportamiento observable;
- compatibilidad requerida;
- contratos externos;
- casos históricos que deben preservarse.

No copiar su diseño técnico. La nueva implementación debe aislar la deuda, reducir propagación y respetar el perfil .NET, SOLID pragmático y Clean Architecture pragmática cuando aplique.

## Definition of done para .NET

Un cambio .NET está done solo cuando:

- cumple `CONSTITUTION.md`;
- usa este perfil cuando aplica;
- tiene evidencia observable;
- respeta SOLID y Clean Architecture de forma simple cuando aplica;
- ejecuta build y tests relevantes;
- incluye cobertura de pruebas proporcional a criticidad;
- actualiza memoria y estado;
- pasa code review;
- documenta riesgos residuales;
- cumple gates Azure DevOps, Harness.io o CI configurados.
