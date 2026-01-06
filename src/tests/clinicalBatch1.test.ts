import { NursingValidator } from '../validators/nursingValidator';

describe('Clinical Assessment Batch 1 Validation', () => {
    let validator: NursingValidator;

    beforeEach(() => {
        validator = new NursingValidator();
    });

    // MUST Score Tests
    describe('MUST Score', () => {
        it('should validate a valid MUST Score (0-6)', () => {
            const validMUST = {
                resourceType: 'Observation',
                status: 'final',
                code: { coding: [{ system: 'http://loinc.org', code: '75303-8' }] },
                subject: { reference: 'Patient/123' },
                effectiveDateTime: new Date().toISOString(),
                valueInteger: 2
            };
            const result = validator.validate(validMUST);
            expect(result.isValid).toBe(true);
        });

        it('should fail MUST Score > 6', () => {
            const invalidMUST = {
                resourceType: 'Observation',
                status: 'final',
                code: { coding: [{ system: 'http://loinc.org', code: '75303-8' }] },
                subject: { reference: 'Patient/123' },
                effectiveDateTime: new Date().toISOString(),
                valueInteger: 10
            };
            const result = validator.validate(invalidMUST);
            expect(result.isValid).toBe(false);
        });
    });

    // Abbey Pain Scale Tests
    describe('Abbey Pain Scale', () => {
        it('should validate a valid Abbey Pain Scale (0-18)', () => {
            const validAbbey = {
                resourceType: 'Observation',
                status: 'final',
                code: { coding: [{ system: 'http://loinc.org', code: '38213-0' }] },
                subject: { reference: 'Patient/123' },
                effectiveDateTime: new Date().toISOString(),
                valueInteger: 8
            };
            const result = validator.validate(validAbbey);
            expect(result.isValid).toBe(true);
        });

        it('should fail Abbey Pain Scale > 18', () => {
            const invalidAbbey = {
                resourceType: 'Observation',
                status: 'final',
                code: { coding: [{ system: 'http://loinc.org', code: '38213-0' }] },
                subject: { reference: 'Patient/123' },
                effectiveDateTime: new Date().toISOString(),
                valueInteger: 25
            };
            const result = validator.validate(invalidAbbey);
            expect(result.isValid).toBe(false);
        });
    });

    // Bristol Stool Chart Tests
    describe('Bristol Stool Chart', () => {
        it('should validate a valid Bristol Stool Type (1-7)', () => {
            const validBristol = {
                resourceType: 'Observation',
                status: 'final',
                code: { coding: [{ system: 'http://loinc.org', code: '72106-8' }] },
                subject: { reference: 'Patient/123' },
                effectiveDateTime: new Date().toISOString(),
                valueInteger: 4
            };
            const result = validator.validate(validBristol);
            expect(result.isValid).toBe(true);
        });

        it('should fail Bristol Stool Type 8', () => {
            const invalidBristol = {
                resourceType: 'Observation',
                status: 'final',
                code: { coding: [{ system: 'http://loinc.org', code: '72106-8' }] },
                subject: { reference: 'Patient/123' },
                effectiveDateTime: new Date().toISOString(),
                valueInteger: 8
            };
            const result = validator.validate(invalidBristol);
            expect(result.isValid).toBe(false);
        });

        it('should fail Bristol Stool Type 0', () => {
            const invalidBristol = {
                resourceType: 'Observation',
                status: 'final',
                code: { coding: [{ system: 'http://loinc.org', code: '72106-8' }] },
                subject: { reference: 'Patient/123' },
                effectiveDateTime: new Date().toISOString(),
                valueInteger: 0
            };
            const result = validator.validate(invalidBristol);
            expect(result.isValid).toBe(false);
        });
    });
});
