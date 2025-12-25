# Spec 06: Clinical Expansion Roadmap

## Status
- [x] Specify
- [ ] Plan
- [ ] Tasks
- [ ] Implement

## Overview
Expand the NHS Unified Nursing Validator to cover additional critical clinical assessment tools used in nursing practice.

## Priority Clinical Profiles

### High Priority (Next 3 Profiles)
1. **Pain Assessment (Numeric Rating Scale 0-10)**
   - LOINC: `72514-3` (Pain severity - 0-10 verbal numeric rating)
   - Validation: Score 0-10, required location/context
   - Clinical Lead: TBD

2. **Glasgow Coma Scale (GCS)**
   - LOINC: `9269-2` (Glasgow coma score total)
   - Components: Eye (1-4), Verbal (1-5), Motor (1-6)
   - Total Score: 3-15
   - Clinical Lead: TBD

3. **Waterlow Score (Pressure Ulcer Risk)**
   - SNOMED: `443846001` (Waterlow score)
   - Score Range: 0-64+
   - Risk Categories: Low (<10), At Risk (10-14), High (15-19), Very High (20+)
   - Clinical Lead: TBD

### Medium Priority
4. **MUST Score (Malnutrition Universal Screening Tool)**
5. **Falls Risk Assessment (Morse Fall Scale)**
6. **Sepsis Screening (qSOFA)**
7. **Fluid Balance Chart**

### Future Consideration
8. **Mental Capacity Assessment**
9. **Safeguarding Concerns**
10. **End of Life Care Preferences**

## Community Contribution Model

### Inviting Clinical Experts
- **Kumbi Kariwo**: Already contributed Wound Assessment
- **Open Call**: Create GitHub issue template for "Clinical Profile Request"
- **Attribution**: Each profile credits the clinical developer in the spec

### Contribution Workflow
1. Clinical expert creates spec in `.spec-kit/specs/`
2. Defines LOINC/SNOMED codes and validation rules
3. Developer implements schema in `oncProfiles.ts`
4. Unit tests added
5. Dashboard template created
6. Deploy and verify

## Success Metrics
- **Coverage**: Number of NHS-standard assessments supported
- **Community**: Number of external contributors
- **Usage**: API calls per profile type
