/**
 * Open Nursing Core (ONC) Implementation Guide - Zod Validation Schemas
 * 
 * These schemas validate FHIR resources against the ONC-IG profiles:
 * https://clinyqai.github.io/open-nursing-core-ig/
 * 
 * Author: Lincoln Gombedza - Nursing Citizen Development
 */

import { z } from 'zod';

// =============================================================================
// ONC-IG Profile URLs
// =============================================================================
export const ONC_PROFILE_URLS = {
    bradenScaleAssessment: 'https://clinyqai.github.io/open-nursing-core-ig/StructureDefinition/ONCBradenScaleAssessment',
    skinToneObservation: 'https://clinyqai.github.io/open-nursing-core-ig/StructureDefinition/ONCSkinToneObservation',
    nursingProblem: 'https://clinyqai.github.io/open-nursing-core-ig/StructureDefinition/ONCNursingProblem',
    patientGoal: 'https://clinyqai.github.io/open-nursing-core-ig/StructureDefinition/ONCPatientGoal',
    nursingIntervention: 'https://clinyqai.github.io/open-nursing-core-ig/StructureDefinition/ONCNursingIntervention',
    goalEvaluation: 'https://clinyqai.github.io/open-nursing-core-ig/StructureDefinition/ONCGoalEvaluation',
    nursingAssessment: 'https://clinyqai.github.io/open-nursing-core-ig/StructureDefinition/ONCNursingAssessment',
    nhsPatient: 'https://clinyqai.github.io/open-nursing-core-ig/StructureDefinition/ONCNHSPatient',
    news2Score: 'https://clinyqai.github.io/open-nursing-core-ig/StructureDefinition/ONCNEWS2Score',
    woundAssessment: 'https://clinyqai.github.io/open-nursing-core-ig/StructureDefinition/ONCWoundAssessment',
    painAssessment: 'https://clinyqai.github.io/open-nursing-core-ig/StructureDefinition/ONCPainAssessment'
} as const;

// =============================================================================
// LOINC Codes for Braden Scale
// =============================================================================
export const BRADEN_SCALE_CODES = {
    totalScore: '38222-1',           // Braden scale total score
    sensoryPerception: '38229-6',    // Sensory perception
    moisture: '38230-4',             // Moisture exposure
    activity: '38231-2',             // Physical activity
    mobility: '38232-0',             // Mobility
    nutrition: '38233-8',            // Nutrition
    frictionShear: '38234-6'         // Friction and shear
} as const;

// =============================================================================
// NEWS2 Codes
// =============================================================================
export const NEWS2_CODES = {
    totalScore: '88330-6',           // National Early Warning Score [NEWS]
    snomedId: '1104051000000101'     // National Early Warning Score 2 (SNOMED-CT)
} as const;

// =============================================================================
// Pain Assessment Codes (Numeric Rating Scale 0-10)
// =============================================================================
export const PAIN_ASSESSMENT_CODES = {
    nrsScore: '72514-3',             // Pain severity - 0-10 verbal numeric rating
    painSeverity: '38208-5'          // Pain severity - Reported (alternative)
} as const;

// =============================================================================
// Shared Schema Components
// =============================================================================
const codingSchema = z.object({
    system: z.string().url().optional(),
    code: z.string(),
    display: z.string().optional()
});

const codeableConceptSchema = z.object({
    coding: z.array(codingSchema).min(1),
    text: z.string().optional()
});

const referenceSchema = z.object({
    reference: z.string(),
    display: z.string().optional()
});

const quantitySchema = z.object({
    value: z.number(),
    unit: z.string().optional(),
    system: z.string().optional(),
    code: z.string().optional()
});

// =============================================================================
// Braden Scale Assessment Schema
// =============================================================================
export const bradenScaleObservationSchema = z.object({
    resourceType: z.literal('Observation'),
    id: z.string().optional(),
    meta: z.object({
        profile: z.array(z.string()).optional()
    }).optional(),
    status: z.enum(['registered', 'preliminary', 'final', 'amended', 'corrected', 'cancelled', 'entered-in-error', 'unknown']),
    category: z.array(codeableConceptSchema).optional(),
    code: z.object({
        coding: z.array(z.object({
            system: z.literal('http://loinc.org'),
            code: z.literal('38222-1'), // Braden Scale Total Score only
            display: z.string().optional()
        })).min(1),
        text: z.string().optional()
    }),
    subject: referenceSchema,
    effectiveDateTime: z.string().optional(),
    valueInteger: z.number().int().min(6).max(23).optional(), // Braden scores range 6-23
    component: z.array(z.object({
        code: codeableConceptSchema,
        valueInteger: z.number().int().min(1).max(4).optional() // Subscale scores 1-4
    })).optional()
});

// =============================================================================
// Skin Tone Observation Schema (Fitzpatrick/Monk Scale)
// =============================================================================
export const skinToneObservationSchema = z.object({
    resourceType: z.literal('Observation'),
    id: z.string().optional(),
    meta: z.object({
        profile: z.array(z.string()).optional()
    }).optional(),
    status: z.enum(['registered', 'preliminary', 'final', 'amended', 'corrected', 'cancelled', 'entered-in-error', 'unknown']),
    category: z.array(codeableConceptSchema).optional(),
    code: z.object({
        coding: z.array(z.object({
            system: z.literal('http://loinc.org'),
            code: z.literal('66472-2'), // Fitzpatrick skin type LOINC
            display: z.string().optional()
        })).min(1),
        text: z.string().optional()
    }),
    subject: referenceSchema,
    effectiveDateTime: z.string().optional(),
    valueCodeableConcept: z.object({
        coding: z.array(z.object({
            system: z.string(),
            code: z.string(), // Fitzpatrick type I-VI or Monk scale
            display: z.string().optional()
        })).min(1),
        text: z.string().optional()
    }).optional()
});

// =============================================================================
// Nursing Problem Schema (Condition)
// =============================================================================
export const nursingProblemSchema = z.object({
    resourceType: z.literal('Condition'),
    id: z.string().optional(),
    meta: z.object({
        profile: z.array(z.string()).optional()
    }).optional(),
    clinicalStatus: codeableConceptSchema.optional(),
    verificationStatus: codeableConceptSchema.optional(),
    category: z.array(z.object({
        coding: z.array(z.object({
            system: z.string(),
            code: z.string(),
            display: z.string().optional()
        })).min(1),
        text: z.string().optional()
    })).optional(),
    severity: codeableConceptSchema.optional(),
    code: codeableConceptSchema, // SNOMED CT nursing diagnosis
    subject: referenceSchema,
    onsetDateTime: z.string().optional(),
    recordedDate: z.string().optional(),
    asserter: referenceSchema.optional(),
    note: z.array(z.object({
        text: z.string()
    })).optional()
});

// =============================================================================
// Patient Goal Schema
// =============================================================================
export const patientGoalSchema = z.object({
    resourceType: z.literal('Goal'),
    id: z.string().optional(),
    meta: z.object({
        profile: z.array(z.string()).optional()
    }).optional(),
    lifecycleStatus: z.enum(['proposed', 'planned', 'accepted', 'active', 'on-hold', 'completed', 'cancelled', 'entered-in-error', 'rejected']),
    achievementStatus: codeableConceptSchema.optional(),
    category: z.array(codeableConceptSchema).optional(),
    priority: codeableConceptSchema.optional(),
    description: codeableConceptSchema,
    subject: referenceSchema,
    startDate: z.string().optional(),
    target: z.array(z.object({
        measure: codeableConceptSchema.optional(),
        detailString: z.string().optional(),
        detailQuantity: quantitySchema.optional(),
        dueDate: z.string().optional()
    })).optional(),
    expressedBy: referenceSchema.optional(),
    addresses: z.array(referenceSchema).optional(), // Links to Conditions
    note: z.array(z.object({
        text: z.string()
    })).optional()
});

// =============================================================================
// Nursing Intervention Schema (Procedure)
// =============================================================================
export const nursingInterventionSchema = z.object({
    resourceType: z.literal('Procedure'),
    id: z.string().optional(),
    meta: z.object({
        profile: z.array(z.string()).optional()
    }).optional(),
    status: z.enum(['preparation', 'in-progress', 'not-done', 'on-hold', 'stopped', 'completed', 'entered-in-error', 'unknown']),
    category: codeableConceptSchema.optional(),
    code: codeableConceptSchema, // SNOMED CT intervention code
    subject: referenceSchema,
    performedDateTime: z.string().optional(),
    performedPeriod: z.object({
        start: z.string().optional(),
        end: z.string().optional()
    }).optional(),
    performer: z.array(z.object({
        actor: referenceSchema
    })).optional(),
    reasonReference: z.array(referenceSchema).optional(), // Links to Conditions
    note: z.array(z.object({
        text: z.string()
    })).optional()
});

// =============================================================================
// Goal Evaluation Schema (Observation)
// =============================================================================
export const goalEvaluationSchema = z.object({
    resourceType: z.literal('Observation'),
    id: z.string().optional(),
    meta: z.object({
        profile: z.array(z.string()).optional()
    }).optional(),
    status: z.enum(['registered', 'preliminary', 'final', 'amended', 'corrected', 'cancelled', 'entered-in-error', 'unknown']),
    category: z.array(codeableConceptSchema).optional(),
    code: z.object({
        coding: z.array(z.object({
            system: z.literal('http://snomed.info/sct'),
            code: z.literal('385633008'), // Finding related to progress toward goals
            display: z.string().optional()
        })).min(1),
        text: z.string().optional()
    }),
    subject: referenceSchema,
    focus: z.array(referenceSchema).optional(), // Reference to Goal
    effectiveDateTime: z.string().optional(),
    valueCodeableConcept: codeableConceptSchema.optional(), // Goal achieved, improving, etc.
    note: z.array(z.object({
        text: z.string()
    })).optional()
});

// =============================================================================
// ONC NHS Patient Schema (with ethnic category extension)
// =============================================================================
export const oncNHSPatientSchema = z.object({
    resourceType: z.literal('Patient'),
    id: z.string().optional(),
    meta: z.object({
        profile: z.array(z.string()).optional()
    }).optional(),
    extension: z.array(z.object({
        url: z.string(),
        valueCodeableConcept: codeableConceptSchema.optional()
    })).optional(),
    identifier: z.array(z.object({
        system: z.string().optional(),
        value: z.string()
    })).optional(),
    name: z.array(z.object({
        use: z.string().optional(),
        family: z.string().optional(),
        given: z.array(z.string()).optional(),
        text: z.string().optional()
    })).optional(),
    gender: z.enum(['male', 'female', 'other', 'unknown']).optional(),
    birthDate: z.string().regex(/^\d{4}(-\d{2}(-\d{2})?)?$/).optional()
});

// =============================================================================
// NEWS2 Score Schema (Observation)
// =============================================================================
export const news2ScoreSchema = z.object({
    resourceType: z.literal('Observation'),
    id: z.string().optional(),
    meta: z.object({
        profile: z.array(z.string()).optional()
    }).optional(),
    status: z.enum(['registered', 'preliminary', 'final', 'amended', 'corrected', 'cancelled', 'entered-in-error', 'unknown']),
    category: z.array(codeableConceptSchema).optional(),
    code: z.object({
        coding: z.array(z.object({
            system: z.literal('http://loinc.org'),
            code: z.literal('88330-6'), // NEWS2 Total Score LOINC
            display: z.string().optional()
        })).min(1),
        text: z.string().optional()
    }),
    subject: referenceSchema,
    effectiveDateTime: z.string().optional(),
    valueInteger: z.number().int().min(0).max(20) // NEWS2 scores range 0-20
});

// =============================================================================
// Wound Assessment Schema (Observation with Components)
// =============================================================================
export const woundAssessmentSchema = z.object({
    resourceType: z.literal('Observation'),
    id: z.string().optional(),
    meta: z.object({
        profile: z.array(z.string()).optional()
    }).optional(),
    status: z.enum(['final', 'amended', 'corrected']),
    code: z.object({
        coding: z.array(z.object({
            system: z.literal('http://snomed.info/sct'),
            code: z.string(), // E.g., '399912005' for Pressure Ulcer
            display: z.string().optional()
        }))
    }),
    subject: referenceSchema,
    effectiveDateTime: z.string(),
    valueCodeableConcept: z.object({
        coding: z.array(z.object({
            system: z.literal('http://snomed.info/sct'),
            code: z.enum(['421257003', '421985001', '420555000', '421720008', '421000124102', '103328001']), // Stages 1-4, Unstageable, DTI
            display: z.string().optional()
        }))
    }).optional(),
    component: z.array(z.object({
        code: z.object({
            coding: z.array(z.object({
                system: z.literal('http://snomed.info/sct'),
                code: z.string()
            }))
        }),
        valueQuantity: z.object({
            value: z.number().min(0),
            unit: z.literal('cm'),
            system: z.literal('http://unitsofmeasure.org'),
            code: z.literal('cm')
        })
    })).optional()
});

// =============================================================================
// Pain Assessment Schema (Numeric Rating Scale 0-10)
// =============================================================================
export const painAssessmentSchema = z.object({
    resourceType: z.literal('Observation'),
    id: z.string().optional(),
    meta: z.object({
        profile: z.array(z.string()).optional()
    }).optional(),
    status: z.enum(['final', 'amended', 'corrected']),
    code: z.object({
        coding: z.array(z.object({
            system: z.literal('http://loinc.org'),
            code: z.enum(['72514-3', '38208-5']), // NRS or Pain Severity
            display: z.string().optional()
        })).min(1),
        text: z.string().optional()
    }),
    subject: referenceSchema,
    effectiveDateTime: z.string().datetime(),
    valueInteger: z.number().int().min(0).max(10), // NRS range 0-10
    bodySite: codeableConceptSchema.optional() // Optional pain location
});

// =============================================================================
// Combined ONC Validation Schema
// =============================================================================
export const oncValidationPayloadSchema = z.union([
    bradenScaleObservationSchema,
    skinToneObservationSchema,
    nursingProblemSchema,
    patientGoalSchema,
    nursingInterventionSchema,
    goalEvaluationSchema,
    oncNHSPatientSchema,
    news2ScoreSchema,
    woundAssessmentSchema,
    painAssessmentSchema
]);

// Type exports
export type BradenScaleObservation = z.infer<typeof bradenScaleObservationSchema>;
export type SkinToneObservation = z.infer<typeof skinToneObservationSchema>;
export type NursingProblem = z.infer<typeof nursingProblemSchema>;
export type PatientGoal = z.infer<typeof patientGoalSchema>;
export type NursingIntervention = z.infer<typeof nursingInterventionSchema>;
export type GoalEvaluation = z.infer<typeof goalEvaluationSchema>;
export type ONCNHSPatient = z.infer<typeof oncNHSPatientSchema>;
export type NEWS2Score = z.infer<typeof news2ScoreSchema>;
export type WoundAssessment = z.infer<typeof woundAssessmentSchema>;
export type PainAssessment = z.infer<typeof painAssessmentSchema>;
