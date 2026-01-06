import { NursingValidator } from '../validators/nursingValidator';

describe('Clinical Assessment Batch 2 Validation', () => {
    let validator: NursingValidator;

    beforeEach(() => {
        validator = new NursingValidator();
    });

    // GCS Scale Tests
    describe('Glasgow Coma Scale (GCS)', () => {
        it('should validate a valid GCS Score (3-15)', () => {
            const validGCS = {
                resourceType: 'Observation',
                status: 'final',
                code: { coding: [{ system: 'http://loinc.org', code: '9269-2' }] },
                subject: { reference: 'Patient/123' },
                effectiveDateTime: new Date().toISOString(),
                valueInteger: 15
            };
            const result = validator.validate(validGCS);
            expect(result.isValid).toBe(true);
        });

        it('should fail GCS Score < 3', () => {
            const invalidGCS = {
                resourceType: 'Observation',
                status: 'final',
                code: { coding: [{ system: 'http://loinc.org', code: '9269-2' }] },
                subject: { reference: 'Patient/123' },
                effectiveDateTime: new Date().toISOString(),
                valueInteger: 2
            };
            const result = validator.validate(invalidGCS);
            expect(result.isValid).toBe(false);
        });

        it('should fail GCS Score > 15', () => {
            const invalidGCS = {
                resourceType: 'Observation',
                status: 'final',
                code: { coding: [{ system: 'http://loinc.org', code: '9269-2' }] },
                subject: { reference: 'Patient/123' },
                effectiveDateTime: new Date().toISOString(),
                valueInteger: 16
            };
            const result = validator.validate(invalidGCS);
            expect(result.isValid).toBe(false);
        });
    });

    // Clinical Frailty Scale Tests
    describe('Clinical Frailty Scale (Rockwood)', () => {
        it('should validate a valid Frailty Score (1-9)', () => {
            const validFrailty = {
                resourceType: 'Observation',
                status: 'final',
                code: { coding: [{ system: 'http://loinc.org', code: '91535-5' }] },
                subject: { reference: 'Patient/123' },
                effectiveDateTime: new Date().toISOString(),
                valueInteger: 4
            };
            const result = validator.validate(validFrailty);
            expect(result.isValid).toBe(true);
        });

        it('should fail Frailty Score 10', () => {
            const invalidFrailty = {
                resourceType: 'Observation',
                status: 'final',
                code: { coding: [{ system: 'http://loinc.org', code: '91535-5' }] },
                subject: { reference: 'Patient/123' },
                effectiveDateTime: new Date().toISOString(),
                valueInteger: 10
            };
            const result = validator.validate(invalidFrailty);
            expect(result.isValid).toBe(false);
        });
    });

    // Oral Health (ROAG) Tests
    describe('Oral Health Assessment (ROAG)', () => {
        it('should validate a valid Oral Health Assessment', () => {
            const validROAG = {
                resourceType: 'Observation',
                status: 'final',
                code: { coding: [{ code: 'ONC-ROAG-Score' }] },
                subject: { reference: 'Patient/123' },
                effectiveDateTime: new Date().toISOString(),
                component: [
                    {
                        code: { coding: [{ code: 'ROAG-lips' }] },
                        valueCodeableConcept: { coding: [{ code: 'status-healthy' }] }
                    }
                ]
            };
            const result = validator.validate(validROAG);
            expect(result.isValid).toBe(true);
        });
    });
});
