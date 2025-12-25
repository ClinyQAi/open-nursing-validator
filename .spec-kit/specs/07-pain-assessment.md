# Spec 07: Pain Assessment Profile (Numeric Rating Scale)

## Status
- [x] Specify
- [ ] Plan
- [ ] Tasks
- [ ] Implement

## Clinical Context
Pain assessment is one of the most frequently performed nursing assessments. The Numeric Rating Scale (NRS) is the gold standard for pain assessment in adults, asking patients to rate their pain from 0 (no pain) to 10 (worst pain imaginable).

## Clinical Requirements

### Assessment Tool
- **Name**: Numeric Rating Scale (NRS)
- **Range**: 0-10
- **Frequency**: Multiple times per shift for acute patients
- **Documentation**: Required for all patients, especially pre/post intervention

### LOINC Coding
- **Primary Code**: `72514-3` - Pain severity - 0-10 verbal numeric rating [Score] - Reported
- **Alternative**: `38208-5` - Pain severity - Reported

### Validation Rules
1. **Score Range**: Must be integer 0-10 (inclusive)
2. **Status**: Must be 'final', 'amended', or 'corrected'
3. **Subject**: Patient reference required
4. **Effective DateTime**: When the assessment was performed
5. **Optional Context**:
   - Body site (where the pain is located)
   - Pain quality descriptors (sharp, dull, burning, etc.)

### Clinical Safety
- **No negative scores**: Pain cannot be < 0
- **No scores > 10**: NRS is capped at 10
- **Decimal values**: Should be rejected (NRS uses whole numbers only)

## FHIR Structure
```json
{
  "resourceType": "Observation",
  "status": "final",
  "code": {
    "coding": [{
      "system": "http://loinc.org",
      "code": "72514-3",
      "display": "Pain severity - 0-10 verbal numeric rating"
    }]
  },
  "subject": {
    "reference": "Patient/example"
  },
  "effectiveDateTime": "2025-12-25T23:00:00Z",
  "valueInteger": 5,
  "bodySite": {
    "coding": [{
      "system": "http://snomed.info/sct",
      "code": "16982005",
      "display": "Shoulder region structure"
    }]
  }
}
```

## Success Metrics
- Valid scores (0-10) pass validation
- Invalid scores (negative, >10, decimals) are rejected
- Clear error messages guide users to correct input
