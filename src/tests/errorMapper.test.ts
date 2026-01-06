import { NursingValidator } from '../validators/nursingValidator';

describe('Error Mapper - Nurse-Friendly Messages', () => {
    const validator = new NursingValidator();

    describe('Value Range Errors', () => {
        it('should provide friendly error for MUST Score out of range (too high)', () => {
            const resource = {
                resourceType: 'Observation',
                status: 'final',
                code: { coding: [{ system: 'http://loinc.org', code: '75303-8' }] },
                subject: { reference: 'Patient/example' },
                effectiveDateTime: '2024-01-15T10:00:00Z',
                valueInteger: 10 // Invalid: max is 6
            };
            const result = validator.validate(resource);
            expect(result.isValid).toBe(false);
            expect(result.friendlyErrors).toBeDefined();
            expect(result.friendlyErrors?.some(msg => msg.includes('cannot exceed'))).toBe(true);
        });

        it('should provide friendly error for Abbey Pain Scale out of range', () => {
            const resource = {
                resourceType: 'Observation',
                status: 'final',
                code: { coding: [{ system: 'http://loinc.org', code: '38213-0' }] },
                subject: { reference: 'Patient/example' },
                effectiveDateTime: '2024-01-15T10:00:00Z',
                valueInteger: 25 // Invalid: max is 18
            };
            const result = validator.validate(resource);
            expect(result.isValid).toBe(false);
            expect(result.friendlyErrors).toBeDefined();
            expect(result.friendlyErrors?.some(msg => msg.includes('cannot exceed'))).toBe(true);
        });

        it('should provide friendly error for GCS below minimum', () => {
            const resource = {
                resourceType: 'Observation',
                status: 'final',
                code: { coding: [{ system: 'http://loinc.org', code: '9269-2' }] },
                subject: { reference: 'Patient/example' },
                effectiveDateTime: '2024-01-15T10:00:00Z',
                valueInteger: 2 // Invalid: min is 3
            };
            const result = validator.validate(resource);
            expect(result.isValid).toBe(false);
            expect(result.friendlyErrors).toBeDefined();
            expect(result.friendlyErrors?.some(msg => msg.includes('at least'))).toBe(true);
        });
    });

    describe('Missing Required Fields', () => {
        it('should provide friendly errors for missing subject', () => {
            const resource = {
                resourceType: 'Observation',
                status: 'final',
                code: { coding: [{ system: 'http://loinc.org', code: '88330-6' }] },
                effectiveDateTime: '2024-01-15T10:00:00Z',
                valueInteger: 5
                // Missing subject
            };
            const result = validator.validate(resource);
            expect(result.isValid).toBe(false);
            expect(result.friendlyErrors).toBeDefined();
            expect(result.friendlyErrors?.length).toBeGreaterThan(0);
        });

        it('should provide friendly errors for missing status', () => {
            const resource = {
                resourceType: 'Observation',
                code: { coding: [{ system: 'http://loinc.org', code: '88330-6' }] },
                subject: { reference: 'Patient/example' },
                effectiveDateTime: '2024-01-15T10:00:00Z',
                valueInteger: 5
                // Missing status
            };
            const result = validator.validate(resource);
            expect(result.isValid).toBe(false);
            expect(result.friendlyErrors).toBeDefined();
            expect(result.friendlyErrors?.length).toBeGreaterThan(0);
        });
    });

    describe('Type Errors', () => {
        it('should provide friendly error for invalid datetime format', () => {
            const resource = {
                resourceType: 'Observation',
                status: 'final',
                code: { coding: [{ system: 'http://loinc.org', code: '91535-5' }] },
                subject: { reference: 'Patient/example' },
                effectiveDateTime: 'not-a-valid-datetime',
                valueInteger: 4
            };
            const result = validator.validate(resource);
            expect(result.isValid).toBe(false);
            expect(result.friendlyErrors).toBeDefined();
            expect(result.friendlyErrors?.some(msg => msg.includes('ISO 8601') || msg.includes('date'))).toBe(true);
        });
    });
});
