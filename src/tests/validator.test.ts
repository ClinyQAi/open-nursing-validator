import { NursingValidator } from '../validators/nursingValidator';

describe('NursingValidator', () => {
    let validator: NursingValidator;

    beforeEach(() => {
        validator = new NursingValidator();
    });

    // Patient Tests
    it('should validate a valid Patient payload', () => {
        const validPatient = {
            resourceType: 'Patient',
            id: '123',
            name: [{ family: 'Doe', given: ['John'] }],
            gender: 'male',
            birthDate: '1980-01-01'
        };
        const result = validator.validate(validPatient);
        expect(result.isValid).toBe(true);
    });

    // Observation Tests
    it('should validate a valid Observation payload', () => {
        const validObservation = {
            resourceType: 'Observation',
            status: 'final',
            code: { coding: [{ system: 'http://loinc.org', code: '8867-4' }] },
            valueQuantity: { value: 60, unit: 'beats/min' }
        };
        const result = validator.validate(validObservation);
        expect(result.isValid).toBe(true);
    });

    // Condition Tests
    it('should validate a valid Condition payload', () => {
        const validCondition = {
            resourceType: 'Condition',
            clinicalStatus: { coding: [{ code: 'active' }] },
            subject: { reference: 'Patient/123' }
        };
        const result = validator.validate(validCondition);
        expect(result.isValid).toBe(true);
    });

    it('should fail Condition without subject', () => {
        const invalidCondition = {
            resourceType: 'Condition',
            clinicalStatus: { coding: [{ code: 'active' }] }
            // Missing subject
        };
        const result = validator.validate(invalidCondition);
        expect(result.isValid).toBe(false);
    });

    // Goal Tests
    it('should validate a valid Goal payload', () => {
        const validGoal = {
            resourceType: 'Goal',
            lifecycleStatus: 'active',
            description: { text: 'Walk 500 steps' },
            subject: { reference: 'Patient/123' }
        };
        const result = validator.validate(validGoal);
        expect(result.isValid).toBe(true);
    });

    // CarePlan Tests
    it('should validate a valid CarePlan payload', () => {
        const validCarePlan = {
            resourceType: 'CarePlan',
            status: 'active',
            intent: 'plan',
            subject: { reference: 'Patient/123' },
            description: 'Weekly physio'
        };
        const result = validator.validate(validCarePlan);
        expect(result.isValid).toBe(true);
    });

    it('should fail CarePlan with invalid status', () => {
        const invalidCarePlan = {
            resourceType: 'CarePlan',
            status: 'thinking-about-it', // Invalid
            intent: 'plan',
            subject: { reference: 'Patient/123' }
        };
        const result = validator.validate(invalidCarePlan);
        expect(result.isValid).toBe(false);
    });

    // Procedure Tests
    it('should validate a valid Procedure payload', () => {
        const validProcedure = {
            resourceType: 'Procedure',
            status: 'completed',
            subject: { reference: 'Patient/123' },
            code: { coding: [{ code: '12345', display: 'Wound Dressing' }] }
        };
        const result = validator.validate(validProcedure);
        expect(result.isValid).toBe(true);
    });

    // NEWS2 Tests
    it('should validate a valid NEWS2 Score (Observation)', () => {
        const validNews2 = {
            resourceType: 'Observation',
            status: 'final',
            code: {
                coding: [{
                    system: 'http://loinc.org',
                    code: '88330-6'
                }]
            },
            subject: { reference: 'Patient/123' },
            valueInteger: 12 // Score in range 0-20
        };
        const result = validator.validate(validNews2);
        expect(result.isValid).toBe(true);
    });

    it('should fail NEWS2 with value out of range', () => {
        const invalidNews2 = {
            resourceType: 'Observation',
            status: 'final',
            code: {
                coding: [{
                    system: 'http://loinc.org',
                    code: '88330-6'
                }]
            },
            subject: { reference: 'Patient/123' },
            valueInteger: 25 // Invalid: > 20
        };
        const result = validator.validate(invalidNews2);
        expect(result.isValid).toBe(false);
    });

    // General Validation Failure
    it('should fail for unknown resourceType', () => {
        const unknownResource = {
            resourceType: 'UnknownResource',
            id: '123'
        };
        const result = validator.validate(unknownResource);
        expect(result.isValid).toBe(false);
    });
});