# Spec 05: Wound Assessment Profile

## Status
- [x] Specify
- [x] Plan
- [x] Tasks
- [x] Implement

## Developer Attribution
> [!IMPORTANT]
> This clinical profile was developed by **Kumbi Kariwo**, specializing in advanced wound care documentation standards for the Open Nursing Core.

## Overview
Implement a comprehensive validation schema for Wound Assessment (Pressure Ulcers/Sores) based on the ONC-IG. This profile ensures that complex wound data is recorded with clinical precision.

## Clinical Requirements
- **Wound Staging**: Must support EPUAP/NPUAP stages (1, 2, 3, 4, Unstageable, DTI).
- **Physical Dimensions**: 
    - Length (cm)
    - Width (cm)
    - Depth (cm)
- **Clinical Observations**:
    - Exudate Amount (None, Low, Medium, High).
    - Tissue Type (Granulation, Epithelialization, Slough, Eschar/Necrotic).
- **Wound Location**: SNOMED CT body site codes.

## Functional Requirements
- **Strict Validation**: Reject assessments with impossible dimensions (e.g., negative depth) or invalid stage codes.
- **Profile URL**: `https://clinyqai.github.io/open-nursing-core-ig/StructureDefinition/ONCWoundAssessment`

## Success Metrics
- A wound assessment with a depth of 0 but a stage 4 classification is correctly flagged as a clinical inconsistency (if logic permits).
- Correct mapping of SNOMED codes for wound characteristics.
