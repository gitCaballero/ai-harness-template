# Node.js Engineering Profile

Perfil especializado para operar bugfix, hotfix, feature, refactor, spike y chore en proyectos Node.js, JavaScript y TypeScript usando el AI harness.

## Cuándo usar

Usar este perfil cuando el repositorio tenga señales Node.js:

- `package.json`, `package-lock.json`, `npm-shrinkwrap.json`, `yarn.lock`, `pnpm-lock.yaml` o `bun.lockb`;
- código JavaScript o TypeScript: `.js`, `.mjs`, `.cjs`, `.ts`, `.tsx`, `.jsx`;
- frameworks backend como Express, Fastify, NestJS, Koa, Hapi, Apollo Server o serverless functions;
- frameworks frontend/fullstack como React, Next.js, Remix, Vue, Nuxt, SvelteKit, Angular o Vite;
- tooling como ESLint, Prettier, Jest, Vitest, Mocha, Playwright, Cypress, ts-node, tsx, SWC, Babel, esbuild, Rollup, Webpack o Turborepo;
- pipelines GitHub Actions, Azure DevOps, Harness.io u otro CI que ejecuten `npm`, `pnpm`, `yarn`, `bun` o `node`.

## Fuentes obligatorias

- `CONSTITUTION.md`
- `ai-engineering/GLOSSARY.md`
- `ai-engineering/workflows/workflow-routes.json`
- `package.json`
- lockfile del package manager cuando exista
- `README.md` del proyecto
- tests existentes
- configuración visible: `tsconfig*.json`, `eslint.config.*`, `.eslintrc*`, `prettier.config.*`, `.prettierrc*`, `vite.config.*`, `next.config.*`, `jest.config.*`, `vitest.config.*`, `playwright.config.*`, `cypress.config.*`
- pipelines Azure DevOps, GitHub Actions, Harness.io u otros CI/CD versionados

## Entrada mínima

```text
bugfix PROJ-456
El formulario permite guardar una solicitud sin email válido.
```

Entrada recomendada:

```text
feature PROJ-123

Título: Consultar estado de caso por cliente.
Contexto: Node.js API con TypeScript y tests en Vitest.
Criterios de aceptación:
- El cliente solo consulta sus propios casos.
- No exponer PII cruda.
- Agregar test unitario de policy y test de endpoint autorizado.
Restricciones:
- No cambiar contrato público sin actualizar tests de contrato.
- Mantener reglas críticas en código determinístico.
```

## Flujo obligatorio

1. Cargar constitución, glosario y este perfil.
2. Identificar runtime y package manager: Node.js, npm, pnpm, yarn o bun.
3. Revisar `package.json`, scripts, lockfile, estructura de workspaces y versión mínima de Node.
4. Mapear arquitectura observada antes de editar: entry points, boundaries, capas, UI, API, jobs, adapters y tests.
5. Clasificar tipo de trabajo y complejidad.
6. Reproducir fallo o definir comportamiento esperado con evidencia.
7. Implementar el cambio mínimo respetando patrones locales.
8. Ejecutar checks relevantes: install/lockfile, lint, typecheck, tests, build y e2e cuando aplique.
9. Ejecutar code review.
10. Actualizar memoria, estado y riesgos.
11. Entregar `READY_FOR_PR` o `BLOCKED`.

## Package manager

Preferir el package manager detectado por lockfile:

| Señal | Package manager | Comandos base |
| --- | --- | --- |
| `package-lock.json` o `npm-shrinkwrap.json` | npm | `npm ci`, `npm test` |
| `pnpm-lock.yaml` | pnpm | `pnpm install --frozen-lockfile`, `pnpm test` |
| `yarn.lock` | yarn | `yarn install --frozen-lockfile`, `yarn test` |
| `bun.lockb` | bun | `bun install --frozen-lockfile`, `bun test` |

Si no hay lockfile, no cambiar de package manager sin aprobación humana. Usar los scripts declarados en `package.json` y documentar la incertidumbre.

## Comandos recomendados

Ejecutar los comandos que existan en `package.json` y aplicar el equivalente local cuando el proyecto use scripts propios.

### npm

```bash
npm ci
npm run lint --if-present
npm run typecheck --if-present
npm test
npm run build --if-present
npm run test:e2e --if-present
npm audit --audit-level=high
```

### pnpm

```bash
pnpm install --frozen-lockfile
pnpm run lint
pnpm run typecheck
pnpm test
pnpm run build
pnpm run test:e2e
pnpm audit --audit-level high
```

### yarn

```bash
yarn install --frozen-lockfile
yarn lint
yarn typecheck
yarn test
yarn build
yarn test:e2e
yarn npm audit --severity high
```

### bun

```bash
bun install --frozen-lockfile
bun run lint
bun run typecheck
bun test
bun run build
bun audit
```

## TypeScript

Cuando exista TypeScript:

- revisar `tsconfig*.json`;
- ejecutar `tsc --noEmit` o script `typecheck` cuando exista;
- no relajar `strict`, `noImplicitAny`, `strictNullChecks` ni paths para hacer pasar el build;
- evitar `any`, `unknown` sin narrowing, casts amplios y non-null assertions sin justificación;
- preservar tipos públicos exportados y contratos API;
- agregar tests cerca de reglas críticas y boundaries.

## Frontend y fullstack

Cuando el cambio toque UI, UX o rutas frontend:

- respetar el framework y design system existente;
- validar estados de loading, empty, error, success y permisos;
- probar navegación, forms, accesibilidad básica y responsive cuando aplique;
- ejecutar build y tests del framework;
- usar Playwright, Cypress o testing-library si el proyecto ya los tiene;
- verificar que datos sensibles no aparezcan en HTML, logs del cliente, query params o storage inseguro.

## Backend, APIs y jobs

Cuando el cambio toque backend:

- validar entrada y autorización antes de ejecutar reglas de negocio;
- mantener reglas críticas fuera de handlers superficiales cuando exista capa de domain/application/service;
- cubrir success path, error path y autorización;
- no filtrar PII, secretos ni stack traces a clientes;
- respetar timeouts, retries, idempotencia y límites de concurrencia cuando existan;
- revisar contratos OpenAPI, GraphQL, eventos o colas cuando cambie una frontera externa.

## Monorepos y workspaces

Cuando existan workspaces npm, pnpm, yarn, Nx, Turborepo o Lage:

- identificar paquete afectado antes de instalar o ejecutar checks;
- usar filtros del package manager cuando sean seguros;
- no mover dependencias entre root y package sin entender ownership;
- ejecutar checks del paquete afectado y checks raíz si el cambio afecta configuración compartida;
- documentar paquetes no validados por tiempo, permisos o dependencias faltantes.

## Seguridad y dependencias

- No introducir dependencia nueva sin necesidad clara, licencia aceptable y mantenimiento razonable.
- Preferir APIs estándar del runtime o dependencias ya presentes.
- No ejecutar scripts remotos ni comandos de instalación no revisados.
- Revisar vulnerabilidades de severidad alta o crítica cuando cambien dependencias.
- No guardar secretos en `.env`, fixtures, snapshots, prompts, specs, memoria o logs.
- Sanitizar entradas en HTML, SQL, NoSQL, shells, paths, URLs y templates.

## Performance

Evaluar impacto en:

- tamaño de bundle y code splitting en frontend;
- server-side rendering, hydration y caching en fullstack;
- latencia, I/O, memoria y CPU en backend;
- N+1 queries, serialización excesiva y payloads grandes;
- timers, streams, colas, backpressure y concurrencia.

No introducir polling agresivo, renders innecesarios, loops bloqueantes o carga de módulos pesados en paths críticos sin justificación.

## Code review

Todo cambio debe pasar por revisión antes de `READY_FOR_PR`.

### Revisión obligatoria

- Correctitud funcional.
- Regresiones.
- Seguridad, autorización y protección de datos.
- Manejo de errores.
- Tests y cobertura proporcional.
- Performance.
- Compatibilidad con arquitectura observada.
- Contratos API, eventos o UI afectados.
- Dependencias y lockfile.
- Observabilidad: logs, métricas, traces y correlation id cuando exista patrón.

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
Dependencies:
Residual risks:
```

## Prohibiciones explícitas

Queda prohibido:

- saltar lint, typecheck, tests o build cuando el cambio toca código Node.js y existen scripts para ello;
- marcar `READY_FOR_PR` con tests fallidos;
- modificar reglas de negocio sin evidencia, spec o criterio de aceptación;
- propagar antipatterns de código legado hacia nuevas implementaciones;
- usar código legado con antipatterns como referencia técnica; solo puede usarse como referencia de negocio, evidencia de comportamiento o compatibilidad;
- cambiar package manager o regenerar lockfile sin causa explícita;
- agregar dependencias para problemas resolubles con APIs existentes o utilidades locales;
- relajar TypeScript, ESLint o tests para hacer pasar el build;
- usar `any`, casts amplios, `// @ts-ignore` o `eslint-disable` sin justificación documentada;
- bloquear el event loop con CPU pesada, I/O síncrono en paths críticos o loops no acotados;
- exponer secretos, tokens, PII o stack traces en logs, responses, browser storage, snapshots o fixtures;
- construir SQL, NoSQL queries, comandos shell o HTML con strings no sanitizados;
- introducir cambios de contrato API, evento, schema o UI pública sin tests y documentación;
- hacer hotfix productivo sin aprobación humana.

## Uso permitido de código legado

Cuando el código legado contenga antipatterns, usarlo únicamente para entender:

- regla de negocio existente;
- comportamiento observable;
- compatibilidad requerida;
- contratos externos;
- casos históricos que deben preservarse.

No copiar su diseño técnico. La nueva implementación debe aislar la deuda, reducir propagación y respetar este perfil Node.js.

## Definition of done para Node.js

Un cambio Node.js está done solo cuando:

- cumple `CONSTITUTION.md`;
- usa este perfil cuando aplica;
- tiene evidencia observable;
- respeta arquitectura observada y scripts existentes;
- ejecuta lint, typecheck, tests y build relevantes cuando existan;
- incluye cobertura de pruebas proporcional a criticidad;
- valida seguridad, dependencias y datos sensibles;
- actualiza memoria y estado;
- pasa code review;
- documenta riesgos residuales;
- cumple gates de GitHub Actions, Azure DevOps, Harness.io o CI configurados.
