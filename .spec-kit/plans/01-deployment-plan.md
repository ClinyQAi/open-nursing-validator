# Plan 01: Multi-stage Docker & CI/CD Fix

## Status
- [x] Approved

## Approach
1. **CI/CD Fix**: Delete `webpack.yml` and `deno.yml`. Create `ci.yml` using standard Node.js actions.
2. **TypeScript Fix**: Rename `config.PORT` to `config.port` in `server.ts`.
3. **Azure Deployment**:
    - Multi-stage Dockerfile (build stage + production stage).
    - `package.json` build/start:prod scripts.
    - `az containerapp up` for initial push.
4. **API Polish**: Refactor `server.ts` to use `app.ts` correctly, enabling root and health endpoints.

## Infrastructure
- **Registry**: Azure Container Registry (managed).
- **Environment**: Container Apps Environment (Consumption).
- **Network**: External ingress on port 3000.
