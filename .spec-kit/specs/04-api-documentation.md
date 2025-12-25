# Spec 04: Automated API Documentation (OpenAPI)

## Status
- [/] Specify
- [ ] Plan
- [ ] Tasks
- [ ] Implement

## Overview
Implement standardized OpenAPI 3.0 documentation for the NHS Unified Nursing Validator. This allows third-party developers and automated systems to explore and integrate with the validator easily.

## Functional Requirements
- **Swagger UI**: Interactive web interface at `/api-docs` to test endpoints.
- **Spec Definition**: YAML or JSON definition of all endpoints:
    - `GET /`: Landing page (HTML dashboard).
    - `POST /validate-nursing-data`: The core validation engine.
    - `GET /health`: System health status.
- **Schema Reference**: Detailed definitions of the supported FHIR request/response payloads (incorporating Zod schema logic).

## Technical Requirements
- Use `swagger-jsdoc` to generate the spec from code comments.
- Use `swagger-ui-express` to serve the UI.
- Ensure the documentation reflects the clinical importance of the ONC-IG profiles.

## Success Metrics
- A developer can run a successful "Try it out" validation request directly from the Swagger UI.
- All response codes (200, 400, 500) are documented with example payloads.
