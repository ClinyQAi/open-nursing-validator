import { z } from 'zod';
import { oncValidationPayloadSchema } from './oncProfiles';

// Re-export ONC-IG specific schemas
export * from './oncProfiles';

// Basic FHIR types
const codeableConceptSchema = z.object({
    coding: z.array(z.object({
        system: z.string().optional(),
        code: z.string().optional(),
        display: z.string().optional()
    })).optional(),
    text: z.string().optional()
});

const referenceSchema = z.object({
    reference: z.string().optional(),
    display: z.string().optional()
});

// FHIR Patient Schema (Simplified)
export const patientSchema = z.object({
    resourceType: z.literal('Patient'),
    id: z.string().optional(),
    identifier: z.array(z.object({
        system: z.string().optional(),
        value: z.string().optional()
    })).optional(),
    name: z.array(z.object({
        family: z.string().optional(),
        given: z.array(z.string()).optional(),
        text: z.string().optional()
    })).optional(),
    gender: z.enum(['male', 'female', 'other', 'unknown']).optional(),
    birthDate: z.string().regex(/^\d{4}(-\d{2}(-\d{2})?)?$/).optional() // YYYY, YYYY-MM, or YYYY-MM-DD
});

// FHIR Observation Schema (Simplified)
export const observationSchema = z.object({
    resourceType: z.literal('Observation'),
    status: z.enum(['registered', 'preliminary', 'final', 'amended', 'corrected', 'cancelled', 'entered-in-error', 'unknown']),
    category: z.array(codeableConceptSchema).optional(),
    code: codeableConceptSchema.refine(c => {
        const loincCode = c.coding?.find(f => f.system === 'http://loinc.org')?.code;
        const snomedCode = c.coding?.find(f => f.system === 'http://snomed.info/sct')?.code;
        return loincCode !== '88330-6' &&
            snomedCode !== '399912005' &&
            loincCode !== '72514-3' &&
            loincCode !== '38208-5'; // Exclude NEWS2, Wound, and Pain Assessment
    }, { message: "Strict clinical profiles (NEWS2, Wound, Pain) must be validated against their specific record schemas" }),
    subject: referenceSchema.optional(),
    effectiveDateTime: z.string().datetime().optional(),
    valueQuantity: z.object({
        value: z.number(),
        unit: z.string().optional(),
        system: z.string().optional(),
        code: z.string().optional()
    }).optional(),
    valueCodeableConcept: codeableConceptSchema.optional(),
    valueString: z.string().optional(),
    valueBoolean: z.boolean().optional()
});

// Union schema for valid validation payloads
// FHIR Condition Schema (Problem/Diagnosis)
export const conditionSchema = z.object({
    resourceType: z.literal('Condition'),
    clinicalStatus: codeableConceptSchema.optional(),
    verificationStatus: codeableConceptSchema.optional(),
    category: z.array(codeableConceptSchema).optional(),
    severity: codeableConceptSchema.optional(),
    code: codeableConceptSchema.optional(),
    subject: referenceSchema,
    onsetDateTime: z.string().optional(),
    asserter: referenceSchema.optional()
});

// FHIR Goal Schema
export const goalSchema = z.object({
    resourceType: z.literal('Goal'),
    lifecycleStatus: z.enum(['proposed', 'planned', 'accepted', 'active', 'on-hold', 'completed', 'cancelled', 'entered-in-error', 'rejected']),
    achievementStatus: codeableConceptSchema.optional(),
    category: z.array(codeableConceptSchema).optional(),
    description: codeableConceptSchema,
    subject: referenceSchema,
    startDate: z.string().optional(),
    target: z.array(z.object({
        measure: codeableConceptSchema.optional(),
        detailQuantity: z.object({
            value: z.number(),
            unit: z.string().optional()
        }).optional(),
        dueDate: z.string().optional()
    })).optional()
});

// FHIR CarePlan Schema
export const carePlanSchema = z.object({
    resourceType: z.literal('CarePlan'),
    status: z.enum(['draft', 'active', 'on-hold', 'revoked', 'completed', 'entered-in-error', 'unknown']),
    intent: z.enum(['proposal', 'plan', 'order', 'option']),
    category: z.array(codeableConceptSchema).optional(),
    title: z.string().optional(),
    description: z.string().optional(),
    subject: referenceSchema,
    period: z.object({
        start: z.string().optional(),
        end: z.string().optional()
    }).optional(),
    activity: z.array(z.object({
        detail: z.object({
            code: codeableConceptSchema.optional(),
            status: z.enum(['not-started', 'scheduled', 'in-progress', 'on-hold', 'completed', 'cancelled', 'stopped', 'unknown', 'entered-in-error']),
            description: z.string().optional()
        }).optional()
    })).optional()
});

// FHIR Procedure Schema (Interventions)
export const procedureSchema = z.object({
    resourceType: z.literal('Procedure'),
    status: z.enum(['preparation', 'in-progress', 'not-done', 'on-hold', 'stopped', 'completed', 'entered-in-error', 'unknown']),
    code: codeableConceptSchema.optional(),
    subject: referenceSchema,
    performedDateTime: z.string().optional(),
    performer: z.array(z.object({
        actor: referenceSchema.optional()
    })).optional()
});

// Union schema for valid validation payloads
export const validationPayloadSchema = z.union([
    oncValidationPayloadSchema,
    patientSchema,
    observationSchema,
    conditionSchema,
    goalSchema,
    carePlanSchema,
    procedureSchema
]);
