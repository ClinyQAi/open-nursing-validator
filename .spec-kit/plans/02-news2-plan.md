# Plan 02: NEWS2 Implementation Plan

## Status
- [/] Approved (Self-validated against Principles)

## Approach
1.  **Schema Update**:
    - Add `news2ScoreSchema` to `src/schemas/oncProfiles.ts`.
    - Define constants for NEWS2 codes and ranges.
2.  **Union Update**:
    - Include `news2ScoreSchema` in the `validationPayloadSchema` in `src/schemas/fhirSchemas.ts`.
3.  **Testing**:
    - Create unit tests in `src/tests` specifically for NEWS2 data.
    - Test valid ranges and invalid values (e.g., score > 20).
4.  **Verification**:
    - Deploy to Azure using `az containerapp up` to verify the live endpoint handles NEWS2.

## Technical Details
- **Zod logic**: Use `z.number().min(0).max(20)` for the total score.
- **Codes**:
    - System: `http://loinc.org`
    - Code: `88330-6`
