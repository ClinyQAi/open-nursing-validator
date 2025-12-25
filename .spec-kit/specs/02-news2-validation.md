# Spec 02: NEWS2 (National Early Warning Score) Validation

## Status
- [x] Specify
- [x] Plan
- [x] Tasks
- [x] Implement

## Overview
Add support for validating NEWS2 (National Early Warning Score) observations. NEWS2 is the standard for identifying acutely ill patients in the NHS.

## User Journeys
1. **Clinical Staff**: Submits a set of physiological readings (Respiratory Rate, SpO2, Air/Oxygen, Systolic BP, Pulse, Consciousness, Temperature) and expects the validator to confirm if the aggregate score and individual readings are FHIR-compliant.

## Functional Requirements
- Validate an `Observation` resource representing a NEWS2 score.
- **Constraints**:
    - `Respiratory Rate`: 0-50 breaths/min.
    - `Systolic BP`: 50-250 mmHg.
    - `Pulse`: 0-250 bpm.
    - `Temperature`: 30-45 °C.
    - `SpO2`: 50-100%.
    - `NEWS2 Total Score`: 0-20.
- **Codes**:
    - LOINC: `88330-6` (National Early Warning Score [NEWS])
    - SNOMED: `1104051000000101` (National Early Warning Score 2)

## Business Rules
- Must be valid FHIR R4.
- Must include the specific NHS NEWS2 observation codes.
- Must validate that the `valueInteger` (for the total score) is within 0-20.

## Reference
- [NHS NEWS2 Standards](https://www.rcplondon.ac.uk/projects/outputs/national-early-warning-score-news-2)
- [ONC-IG NEWS2 Profile Placeholder](https://clinyqai.github.io/open-nursing-core-ig/)
