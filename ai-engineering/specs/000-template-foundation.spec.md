# Spec: Template Foundation

## Estado

Ready.

## Objetivo

Proveer una base reusable para proyectos IA con agentes, tools, Harness.io, CI, memoria y evaluaciones.

## Criterios de aceptación

- [x] El harness corre sin dependencias externas.
- [x] Existe separación por audiencias.
- [x] Existen guardrails de autonomía y seguridad.
- [x] Existen plantillas para nuevos casos.
- [x] Existen pipelines base.

## Decisiones

- Node `node --test` para el harness mínimo.
- Código determinístico para policy checks.
- Specs y prompts en Markdown versionado.
