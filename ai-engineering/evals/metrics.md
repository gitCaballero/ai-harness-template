# Evaluation Metrics

## Mínimas

- `tool_policy_pass_rate`: herramientas permitidas/bloqueadas correctamente.
- `guardrail_pass_rate`: controles críticos activos.
- `pii_masking_pass_rate`: datos sensibles protegidos.
- `deterministic_policy_pass_rate`: decisiones críticas no dependen de prompts.

## Umbral inicial

Todos los tests del harness deben pasar antes de merge o despliegue.
