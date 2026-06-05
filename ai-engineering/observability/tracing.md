# Tracing Baseline

## Eventos

- `agent.spec.loaded`
- `agent.tool.requested`
- `agent.tool.allowed`
- `agent.tool.blocked`
- `agent.evaluation.started`
- `agent.evaluation.completed`
- `deployment.approval.required`

## Campos

- `traceId`
- `actor`
- `audience`
- `toolName`
- `specId`
- `environment`
- `durationMs`
- `status`

## Nunca incluir

- secretos
- tokens
- PII cruda
- payloads completos sin redacción
