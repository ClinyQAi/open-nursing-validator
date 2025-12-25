import { observationSchema } from '../schemas/fhirSchemas';

const painData = {
    resourceType: 'Observation',
    status: 'final',
    code: { coding: [{ system: 'http://loinc.org', code: '72514-3' }] },
    subject: { reference: 'Patient/123' },
    effectiveDateTime: '2025-12-25T23:00:00Z',
    valueInteger: 15
};

console.log('Testing if generic observation schema matches Pain code:');
const result = observationSchema.safeParse(painData);
console.log('Success:', result.success);
if (!result.success) {
    console.log('Errors:', JSON.stringify(result.error.format(), null, 2));
}
