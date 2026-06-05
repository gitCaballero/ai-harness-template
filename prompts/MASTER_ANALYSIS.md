# Master Analysis Prompt

## Objetivo

Analizar una codebase existente con evidencia observable y recomendar la mínima estructura de soporte IA necesaria.

## Alcance

Usar `CONSTITUTION.md`, `ai-engineering/GLOSSARY.md`, memoria en `ai-engineering/memory/`, documentación y artefactos reales del repositorio.

## Secuencia obligatoria

1. Mapa del repositorio.
2. Detección de stack o stacks con señales observables.
3. Perfiles aplicables en `ai-engineering/profiles/`.
4. Puntos de entrada.
5. Arquitectura observable.
6. Dominios y módulos.
7. Flujos y capacidades.
8. Riesgo, complejidad, antipatterns y cobertura crítica.
9. Oportunidades reales para IA.
10. Diseño agentic mínimo.

## Clasificación obligatoria

Separar todo hallazgo importante con la taxonomía del glosario:

- hecho observado;
- inferencia razonable;
- hipótesis;
- dependencia crítica de contexto;
- recomendación.

## Formato de salida

- resumen ejecutivo;
- stacks detectados, señales y perfiles cargados;
- arquitectura observada;
- capacidades y flujos detectados;
- oportunidades reales para IA;
- opciones agentic;
- recomendación final única;
- agentes o subagentes, si se justifican;
- estructura de prompts y memoria;
- riesgos y límites;
- plan de arranque.

## Límites

No inventar dominios, integraciones, reglas ni módulos. No proponer multiagente si un agente principal con memoria externa basta.
