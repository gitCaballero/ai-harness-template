# Review Checklist Prompt

## Objetivo

Revisar cambios priorizando bugs, riesgos, regresiones, antipatterns, performance, tests y memoria.

## Checklist

- [ ] El objetivo del cambio está claro.
- [ ] La solución respeta la arquitectura observada.
- [ ] No introduce antipatterns nuevos.
- [ ] No propaga antipatterns de código legado hacia nuevas implementaciones.
- [ ] Si usa legado con deuda, lo usa solo como referencia de negocio o comportamiento.
- [ ] No degrada performance injustificadamente.
- [ ] Incluye pruebas suficientes según criticidad.
- [ ] Verifica caminos de error importantes.
- [ ] Protege datos sensibles.
- [ ] Code review cubre seguridad, arquitectura, tests, performance y riesgos residuales.
- [ ] Si el stack es Node.js, respeta `ai-engineering/profiles/nodejs.md`.
- [ ] Si el stack es .NET, respeta `ai-engineering/profiles/dotnet.md`.
- [ ] SOLID y Clean Architecture prevalecen de forma simple cuando aplican.
- [ ] Actualiza memoria operativa o decisiones cuando aplica.
- [ ] Documenta riesgos residuales.
- [ ] Cumple criterios de aceptación.

## Formato de salida

1. Hallazgos por severidad.
2. Evidencia por archivo o artefacto.
3. Riesgos y brechas.
4. Veredicto: listo, listo con riesgo o no listo.
