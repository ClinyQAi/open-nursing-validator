# Plan 04: OpenAPI Integration

## Status
- [/] Approved

## Approach
1.  **Dependency Installation**:
    - Install `swagger-jsdoc` and `swagger-ui-express`.
2.  **Configuration**:
    - Create `src/config/swagger.ts` to define the OpenAPI baseline (Title, Version, Servers).
3.  **Documentation Annotation**:
    - Add JSDoc comments to `src/routes/validatorRoutes.ts` and `src/app.ts` to define endpoints.
4.  **UI Setup**:
    - Mount the Swagger UI at `/api-docs` in `src/app.ts`.

## Deployment
- These dependencies will be added to `package.json` and handled by the existing Docker build process.
