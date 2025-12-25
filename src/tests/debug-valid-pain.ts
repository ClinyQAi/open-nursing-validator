import { NursingValidator } from '../validators/nursingValidator';

const validator = new NursingValidator();

const validPain = {
    resourceType: 'Observation',
    status: 'final',
    code: { coding: [{ system: 'http://loinc.org', code: '72514-3' }] },
    subject: { reference: 'Patient/123' },
    effectiveDateTime: '2025-12-25T23:00:00Z',
    valueInteger: 7
};

console.log('Testing VALID Pain Assessment (score 7):');
const result = validator.validate(validPain);
console.log('Is Valid:', result.isValid);
if (!result.isValid) {
    console.log('Errors:', JSON.stringify(result.errors, null, 2));
}
