# Implementation Plan 07: Pain Assessment Profile

## Overview
Implement the Pain Assessment (Numeric Rating Scale 0-10) profile following the established pattern used for NEWS2 and Wound Assessment.

## Proposed Changes

### Schema Definition (`src/schemas/oncProfiles.ts`)

#### Add Pain Assessment URL Constant
```typescript
export const ONC_PROFILE_URLS = {
    // ... existing profiles
    painAssessment: 'http://fhir.nhs.uk/StructureDefinition/ONC-PainAssessment'
};
```

#### Implement `painAssessmentSchema`
```typescript
export const painAssessmentSchema = z.object({
    resourceType: z.literal('Observation'),
    status: z.enum(['final', 'amended', 'corrected']),
    code: codeableConceptSchema.refine(c => {
        const loincCode = c.coding?.find(f => f.system === 'http://loinc.org')?.code;
        return loincCode === '72514-3' || loincCode === '38208-5';
    }, { message: "Pain assessment must use LOINC code 72514-3 or 38208-5" }),
    subject: referenceSchema,
    effectiveDateTime: z.string().datetime(),
    valueInteger: z.number().int().min(0).max(10),
    bodySite: codeableConceptSchema.optional()
});
```

#### Integrate into Union Schema
```typescript
export const oncValidationPayloadSchema = z.union([
    // ... existing schemas
    painAssessmentSchema,
]);
```

#### Export Type
```typescript
export type PainAssessment = z.infer<typeof painAssessmentSchema>;
```

---

### Generic Schema Exclusion (`src/schemas/fhirSchemas.ts`)

Update the generic `observationSchema` to exclude Pain Assessment LOINC codes:

```typescript
code: codeableConceptSchema.refine(c => {
    const loincCode = c.coding?.find(f => f.system === 'http://loinc.org')?.code;
    const snomedCode = c.coding?.find(f => f.system === 'http://snomed.info/sct')?.code;
    return loincCode !== '88330-6' && 
           snomedCode !== '399912005' && 
           loincCode !== '72514-3' && 
           loincCode !== '38208-5'; // Exclude Pain Assessment
}, { message: "Strict clinical profiles must be validated against their specific schemas" }),
```

---

### Unit Tests (`src/tests/validator.test.ts`)

Add comprehensive tests for Pain Assessment:

```typescript
// Pain Assessment Tests
it('should validate a valid Pain Assessment (NRS 0-10)', () => {
    const validPain = {
        resourceType: 'Observation',
        status: 'final',
        code: { coding: [{ system: 'http://loinc.org', code: '72514-3' }] },
        subject: { reference: 'Patient/123' },
        effectiveDateTime: '2025-12-25T23:00:00Z',
        valueInteger: 7
    };
    const result = validator.validate(validPain);
    expect(result.isValid).toBe(true);
});

it('should fail Pain Assessment with score > 10', () => {
    const invalidPain = {
        resourceType: 'Observation',
        status: 'final',
        code: { coding: [{ system: 'http://loinc.org', code: '72514-3' }] },
        subject: { reference: 'Patient/123' },
        effectiveDateTime: '2025-12-25T23:00:00Z',
        valueInteger: 15
    };
    const result = validator.validate(invalidPain);
    expect(result.isValid).toBe(false);
});

it('should fail Pain Assessment with negative score', () => {
    const invalidPain = {
        resourceType: 'Observation',
        status: 'final',
        code: { coding: [{ system: 'http://loinc.org', code: '72514-3' }] },
        subject: { reference: 'Patient/123' },
        effectiveDateTime: '2025-12-25T23:00:00Z',
        valueInteger: -2
    };
    const result = validator.validate(invalidPain);
    expect(result.isValid).toBe(false);
});
```

---

### Dashboard Template (`client/src/App.tsx`)

Add Pain Assessment template to the `TEMPLATES` object:

```typescript
PainAssessment: {
    resourceType: "Observation",
    status: "final",
    code: {
        coding: [{ 
            system: "http://loinc.org", 
            code: "72514-3", 
            display: "Pain severity - 0-10 verbal numeric rating" 
        }]
    },
    subject: { reference: "Patient/example" },
    effectiveDateTime: new Date().toISOString(),
    valueInteger: 5,
    bodySite: {
        coding: [{ 
            system: "http://snomed.info/sct", 
            code: "16982005", 
            display: "Shoulder region structure" 
        }]
    }
}
```

---

## Verification Plan

### Automated Tests
**Command**: `npm test`
- Verify all 3 new Pain Assessment tests pass
- Ensure existing tests still pass (no regressions)

### Manual Verification (Dashboard)
1. Navigate to the live dashboard: `https://open-nursing-validator.bravedesert-5038bd59.westus2.azurecontainerapps.io/`
2. Click the "PainAssessment" template button
3. Click "Validate Payload" - should show "Resource Valid"
4. Change `valueInteger` to `15` and validate - should fail with clear error
5. Change `valueInteger` to `-3` and validate - should fail with clear error

### API Verification (Swagger)
1. Navigate to `/api-docs/`
2. Test the `/validate-nursing-data` endpoint with Pain Assessment payload
3. Verify 200 response for valid data, 400 for invalid
