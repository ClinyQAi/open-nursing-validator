# Plan 05: Wound Assessment Implementation

## Status
- [/] Approved

## Approach
1.  **Schema Definition**:
    - Add `woundAssessmentSchema` to `src/schemas/oncProfiles.ts`.
    - Define SNOMED codes for Wound Staging (system: `http://snomed.info/sct`).
    - Implement a nested validation for `component` arrays (standard FHIR pattern for multiple observations in one resource).
2.  **Logic Integration**:
    - Export the new schema and add it to `oncValidationPayloadSchema`.
3.  **UI Updates**:
    - Add a "Wound Assessment" button to the Template Picker in the React frontend.
4.  **Verification**:
    - Create unit tests for multiple wound stages and dimension variations.

## Technical Details
- **FHIR Resource**: `Observation`
- **Component Pattern**: Use FHIR components for Length, Width, and Depth to keep them linked to a single observation event.
