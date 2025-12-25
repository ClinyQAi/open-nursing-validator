# Spec 01: Initial Core Enhancement & Azure Deployment

## Status
- [x] Specify
- [x] Plan
- [x] Tasks
- [x] Implement

## Overview
Enhance the NHS Unified Nursing Validator to support ONC-IG profiles, fix the repository health (CI/CD, TS errors), and deploy to Azure Cloud.

## User Journeys
1. **Clinical Developer**: Wants to validate a Braden Scale assessment against the ONC-IG standard via a REST API.
2. **Open Source Contributor**: Wants to see a "green" repo with clear instructions and automated checks before contributing.
3. **Integrator**: Wants a stable, live endpoint on Azure to test integration with their nursing informatics system.

## Functional Requirements
- Support validation for: Braden Scale, Skin Tone, Nursing Problem, Patient Goal, Nursing Intervention, Goal Evaluation, NHS Patient.
- Provide a clear API welcome message at the root `/`.
- Provide a `/health` endpoint.
- Correct FHIR validation error responses.

## Technical Details
- **Stack**: Node.js 18+, TypeScript, Express, Zod, Jest.
- **Deployment**: Azure Container Apps with Docker.
- **CI/CD**: GitHub Actions for PRs and the `main` branch.

## Reference
- [Open Nursing Core IG](https://clinyqai.github.io/open-nursing-core-ig/)
