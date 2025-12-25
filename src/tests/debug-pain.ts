import { NursingValidator } from '../validators/nursingValidator';

const validator = new NursingValidator();

const invalidPain = {
    resourceType: 'Observation',
    status: 'final',
    code: { coding: [{ system: 'http://loinc.org', code: '72514-3' }] },
    subject: { reference: 'Patient/123' },
    effectiveDateTime: '2025-12-25T23:00:00Z',
    valueInteger: 15
};

console.log('Testing Pain Assessment with score 15 (should fail):');
const result = validator.validate(invalidPain);
console.log('Is Valid:', result.isValid);
console.log('Result:', JSON.stringify(result, null, 2));

// Try validating directly with the pain schema
import { painAssessmentSchema } from '../schemas/oncProfiles';

console.log('\n=== Testing INVALID Pain (score 15) ===');
const directResult = painAssessmentSchema.safeParse(invalidPain);
console.log('Success:', directResult.success);
if (!directResult.success) {
    console.log('Errors:', JSON.stringify(directResult.error.format(), null, 2));
}

const validPain = {
    resourceType: 'Observation',
    status: 'final',
    code: { coding: [{ system: 'http://loinc.org', code: '72514-3' }] },
    subject: { reference: 'Patient/123' },
    effectiveDateTime: '2025-12-25T23:00:00Z',
    valueInteger: 7
};

console.log('\n=== Testing VALID Pain (score 7) ===');
const validResult = painAssessmentSchema.safeParse(validPain);
console.log('Success:', validResult.success);
if (!validResult.success) {
    console.log('Errors:', JSON.stringify(validResult.error.format(), null, 2));
}
