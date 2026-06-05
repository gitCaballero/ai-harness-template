# Risks And Gaps

## Riesgos base

- Usar el template sin completar memoria observable de la codebase.
- Confundir hipótesis de negocio con hechos del repositorio.
- Sobrediseñar con múltiples agentes sin evidencia.
- Entregar cambios sin tests, revisión de performance o actualización de memoria.
- Agregar términos nuevos fuera de `ai-engineering/GLOSSARY.md`, generando vocabulario inconsistente para agentes LLM.
- Usar el perfil .NET sin adaptar comandos a la solución real, por ejemplo múltiples `.sln`, SDK fijado en `global.json` o pipelines corporativos existentes.
- Copiar estructura técnica de código legado con antipatterns en lugar de usarlo solo como referencia de negocio o comportamiento.
- Declarar una integración como lista sin validar credenciales, permisos, límites de datos sensibles y comportamiento ante fallos.
- Ejecutar solo checks de harness y omitir tests nativos o pruebas propias del stack cuando el entorno sí permite correrlas.
- Usar audiencias genéricas del template en producción sin mapear responsabilidades, approvals y permisos del dominio real.

## Dependencias críticas de contexto

- Reglas de negocio reales.
- Criticidad operativa.
- Restricciones regulatorias.
- SLAs.
- Flujos usados realmente por usuarios.
- Sistemas externos disponibles: Jira/Azure Boards, Confluence, Slack/Teams, Harness.io y repositorios de métricas.
