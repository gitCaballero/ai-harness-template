# AI Harness Glossary

Este glosario fija palabras clave para que agentes LLM, revisores humanos y pipelines usen el mismo lenguaje.

## Términos clave

- **AI harness**: sistema de control que combina prompts, memoria, herramientas, tests, guardrails, observabilidad y gates CI/CD para operar software con IA.
- **Constitución**: política raíz en `CONSTITUTION.md`; define evidencia, límites de autonomía, calidad y definición de done.
- **Evidencia observable**: artefacto verificable del repositorio: código, tests, configs, docs, pipelines, specs o memoria versionada.
- **Hecho observado**: conclusión soportada directamente por evidencia.
- **Inferencia razonable**: conclusión sugerida por patrones repetidos, pero no declarada explícitamente.
- **Hipótesis**: interpretación plausible pendiente de validación.
- **Dependencia crítica de contexto**: dato externo requerido para decidir con seguridad, como regla de negocio, SLA, regulación, prioridad o flujo real de usuario.
- **SDD/spec-kit**: flujo de trabajo donde cada cambio relevante parte de spec, plan, tareas, evidencia y validación.
- **GitHub Spec Kit**: toolkit oficial `github/spec-kit` que provee la CLI `specify` y comandos `/speckit.*` para specification-driven development.
- **Simple SDD fallback**: implementación local del template basada en archivos Markdown cuando GitHub Spec Kit no está instalado, no está inicializado o el usuario decide no usarlo.
- **Memoria estable**: contexto persistente aprobado: propósito, arquitectura observada, dominios confirmados, decisiones y convenciones.
- **Memoria operativa**: estado vivo del trabajo: avances, riesgos, tareas abiertas y supuestos.
- **Guardrail**: restricción verificable para herramientas, datos, permisos, autonomía, seguridad o despliegue.
- **Tool policy**: catálogo de herramientas permitidas por audiencia y propósito.
- **Deterministic policy**: regla crítica expresada en código o configuración versionada, no en texto libre de un prompt.
- **Antipattern**: solución que aumenta riesgo, acoplamiento, deuda, fragilidad, costo de contexto o degradación operativa.
- **Performance**: impacto en CPU, memoria, latencia, I/O, red, base de datos, serialización, concurrencia y recursos compartidos.
- **Cobertura de pruebas**: validación proporcional a criticidad; prioriza comportamiento, errores, regresiones e integraciones sobre porcentaje aislado.
- **Checklist end-to-end**: gate final que verifica objetivo, evidencia, arquitectura, tests, performance, memoria, riesgos y criterios de aceptación.
- **Task decomposition**: decisión previa a implementación que divide trabajo complejo en subtareas verificables con contexto acotado, evidencia esperada y validación propia.
- **Agente principal**: agente único por defecto; coordina análisis, implementación, revisión y soporte usando memoria externa.
- **Subagente**: agente especializado justificado solo por fronteras reales de dominio, contexto, riesgo, permisos o herramientas.
- **Human approval**: aprobación humana obligatoria para producción, seguridad, datos sensibles, dinero, regulación, migraciones o incertidumbre crítica.
- **Ready for PR**: estado final donde implementación, tests, revisión, memoria y riesgos residuales están documentados.
- **Stack profile**: guía específica por tecnología que agrega comandos, gates, prohibiciones y criterios de revisión.
- **Code review**: revisión obligatoria de bugs, regresiones, seguridad, tests, performance, arquitectura y riesgos antes de aprobar entrega.
- **Azure DevOps**: plataforma para Work Items, Pull Requests, branch policies, pipelines, approvals y trazabilidad CI/CD.
- **SOLID pragmático**: aplicación simple de principios SOLID para reducir acoplamiento y mejorar mantenibilidad sin abstracciones vacías.
- **Clean Architecture pragmática**: separación de Domain/Application/Infrastructure/API cuando existe o aporta claridad real, manteniendo dependencias hacia adentro.

## Taxonomía de salida

Usar siempre estas etiquetas para hallazgos importantes:

- `HECHO_OBSERVADO`
- `INFERENCIA_RAZONABLE`
- `HIPOTESIS`
- `DEPENDENCIA_CRITICA_DE_CONTEXTO`
- `RECOMENDACION`

## Regla de nomenclatura

Preferir términos concretos y repetibles: `evidencia`, `guardrail`, `tool policy`, `memoria`, `spec`, `GitHub Spec Kit`, `simple SDD fallback`, `task decomposition`, `workflow route`, `stack profile`, `deterministic policy`, `code review`, `approval`, `evaluation`, `risk`, `done`.
