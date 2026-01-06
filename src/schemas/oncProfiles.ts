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
    painAssessment: 'https://clinyqai.github.io/open-nursing-core-ig/StructureDefinition/ONCPainAssessment',
    mustScore: 'https://clinyqai.github.io/open-nursing-core-ig/StructureDefinition/ONCMUSTScore',
    abbeyPainScale: 'https://clinyqai.github.io/open-nursing-core-ig/StructureDefinition/ONCAbbeyPainScale',
    bristolStoolChart: 'https://clinyqai.github.io/open-nursing-core-ig/StructureDefinition/ONCBristolStoolChart',
    gcsScale: 'https://clinyqai.github.io/open-nursing-core-ig/StructureDefinition/ONCGlasgowComaScale',
    frailtyScale: 'https://clinyqai.github.io/open-nursing-core-ig/StructureDefinition/ONCRockwoodFrailtyScale',
    oralHealthAssessment: 'https://clinyqai.github.io/open-nursing-core-ig/StructureDefinition/ONCOralHealthAssessment'
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
// MUST Score Codes
// =============================================================================
export const MUST_SCORE_CODES = {
    totalScore: '75303-8'            // Malnutrition Universal Screening Tool [MUST]
} as const;

// =============================================================================
// Abbey Pain Scale Codes
// =============================================================================
export const ABBEY_PAIN_CODES = {
    totalScore: '38213-0'            // Abbey pain scale total score
} as const;

// =============================================================================
// Bristol Stool Chart Codes
// =============================================================================
export const BRISTOL_STOOL_CODES = {
    stoolType: '72106-8'             // Bristol stool form panel
} as const;

// =============================================================================
// GCS Scale Codes
// =============================================================================
export const GCS_CODES = {
    totalScore: '9269-2',            // Glasgow Coma Scale total score
    eyes: '9267-6',                  // GCS Eyes
    verbal: '9270-0',                // GCS Verbal
    motor: '9268-4'                  // GCS Motor
} as const;

// =============================================================================
// Clinical Frailty Scale Codes
// =============================================================================
export const FRAILTY_CODES = {
    clinicalFrailtyScale: '91535-5'   // Clinical Frailty Scale (Rockwood)
} as const;

// =============================================================================
// Oral Health Assessment Codes (ROAG)
// =============================================================================
export const ORAL_HEALTH_CODES = {
    roagScore: 'ONC-ROAG-Score'      // Custom code for ROAG assessment
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
// Base Resource Schemas
// =============================================================================

/**
 * Base FHIR Observation schema for nursing assessments
 */
const baseObservationSchema = z.object({
    resourceType: z.literal('Observation'),
    id: z.string().optional(),
    meta: z.object({
        profile: z.array(z.string()).optional()
    }).optional(),
    status: z.enum(['registered', 'preliminary', 'final', 'amended', 'corrected', 'cancelled', 'entered-in-error', 'unknown']),
    category: z.array(codeableConceptSchema).optional(),
    subject: referenceSchema,
    effectiveDateTime: z.string().optional(),
});

/**
 * Base FHIR Condition schema for nursing problems
 */
const baseConditionSchema = z.object({
    resourceType: z.literal('Condition'),
    id: z.string().optional(),
    meta: z.object({
        profile: z.array(z.string()).optional()
    }).optional(),
    clinicalStatus: codeableConceptSchema.optional(),
    verificationStatus: codeableConceptSchema.optional(),
    category: z.array(codeableConceptSchema).optional(),
    severity: codeableConceptSchema.optional(),
    subject: referenceSchema,
    onsetDateTime: z.string().optional(),
    recordedDate: z.string().optional(),
    asserter: referenceSchema.optional(),
    note: z.array(z.object({ text: z.string() })).optional()
});

/**
 * Base FHIR Goal schema for nursing goals
 */
const baseGoalSchema = z.object({
    resourceType: z.literal('Goal'),
    id: z.string().optional(),
    meta: z.object({
        profile: z.array(z.string()).optional()
    }).optional(),
    lifecycleStatus: z.enum(['proposed', 'planned', 'accepted', 'active', 'on-hold', 'completed', 'cancelled', 'entered-in-error', 'rejected']),
    achievementStatus: codeableConceptSchema.optional(),
    category: z.array(codeableConceptSchema).optional(),
    priority: codeableConceptSchema.optional(),
    subject: referenceSchema,
    startDate: z.string().optional(),
    note: z.array(z.object({ text: z.string() })).optional()
});

/**
 * Base FHIR Procedure schema for nursing interventions
 */
const baseProcedureSchema = z.object({
    resourceType: z.literal('Procedure'),
    id: z.string().optional(),
    meta: z.object({
        profile: z.array(z.string()).optional()
    }).optional(),
    status: z.enum(['preparation', 'in-progress', 'not-done', 'on-hold', 'stopped', 'completed', 'entered-in-error', 'unknown']),
    category: codeableConceptSchema.optional(),
    subject: referenceSchema,
    performedDateTime: z.string().optional(),
    performedPeriod: z.object({
        start: z.string().optional(),
        end: z.string().optional()
    }).optional(),
    performer: z.array(z.object({ actor: referenceSchema })).optional(),
    reasonReference: z.array(referenceSchema).optional(),
    note: z.array(z.object({ text: z.string() })).optional()
});

// =============================================================================
// Braden Scale Assessment Schema
// =============================================================================
export const bradenScaleObservationSchema = baseObservationSchema.extend({
    code: z.object({
        coding: z.array(z.object({
            system: z.literal('http://loinc.org'),
            code: z.literal(BRADEN_SCALE_CODES.totalScore),
            display: z.string().optional()
        })).min(1),
        text: z.string().optional()
    }),
    valueInteger: z.number().int().min(6).max(23).optional(),
    component: z.array(z.object({
        code: codeableConceptSchema,
        valueInteger: z.number().int().min(1).max(4).optional()
    })).optional()
});

// =============================================================================
// Skin Tone Observation Schema (Fitzpatrick/Monk Scale)
// =============================================================================
export const skinToneObservationSchema = baseObservationSchema.extend({
    code: z.object({
        coding: z.array(z.object({
            system: z.literal('http://loinc.org'),
            code: z.literal('66472-2'), // Fitzpatrick skin type LOINC
            display: z.string().optional()
        })).min(1),
        text: z.string().optional()
    }),
    valueCodeableConcept: z.object({
        coding: z.array(z.object({
            system: z.string(),
            code: z.string(),
            display: z.string().optional()
        })).min(1),
        text: z.string().optional()
    }).optional()
});

// =============================================================================
// Nursing Problem Schema (Condition)
// =============================================================================
export const nursingProblemSchema = baseConditionSchema.extend({
    code: codeableConceptSchema // SNOMED CT nursing diagnosis
});

// =============================================================================
// Patient Goal Schema
// =============================================================================
export const patientGoalSchema = baseGoalSchema.extend({
    description: codeableConceptSchema,
    target: z.array(z.object({
        measure: codeableConceptSchema.optional(),
        detailString: z.string().optional(),
        detailQuantity: quantitySchema.optional(),
        dueDate: z.string().optional()
    })).optional(),
    expressedBy: referenceSchema.optional(),
    addresses: z.array(referenceSchema).optional()
});

// =============================================================================
// Nursing Intervention Schema (Procedure)
// =============================================================================
export const nursingInterventionSchema = baseProcedureSchema.extend({
    code: codeableConceptSchema // SNOMED CT intervention code
});

// =============================================================================
// Goal Evaluation Schema (Observation)
// =============================================================================
export const goalEvaluationSchema = baseObservationSchema.extend({
    code: z.object({
        coding: z.array(z.object({
            system: z.literal('http://snomed.info/sct'),
            code: z.literal('385633008'), // Finding related to progress toward goals
            display: z.string().optional()
        })).min(1),
        text: z.string().optional()
    }),
    focus: z.array(referenceSchema).optional(), // Reference to Goal
    valueCodeableConcept: codeableConceptSchema.optional()
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
export const news2ScoreSchema = baseObservationSchema.extend({
    code: z.object({
        coding: z.array(z.object({
            system: z.literal('http://loinc.org'),
            code: z.literal(NEWS2_CODES.totalScore),
            display: z.string().optional()
        })).min(1),
        text: z.string().optional()
    }),
    valueInteger: z.number().int().min(0).max(20)
});

// =============================================================================
// Wound Assessment Schema (Observation with Components)
// =============================================================================
export const woundAssessmentSchema = baseObservationSchema.extend({
    status: z.enum(['final', 'amended', 'corrected']),
    code: z.object({
        coding: z.array(z.object({
            system: z.literal('http://snomed.info/sct'),
            code: z.string(),
            display: z.string().optional()
        }))
    }),
    effectiveDateTime: z.string(),
    valueCodeableConcept: z.object({
        coding: z.array(z.object({
            system: z.literal('http://snomed.info/sct'),
            code: z.enum(['421257003', '421985001', '420555000', '421720008', '421000124102', '103328001']),
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
// MUST Score Schema (Observation)
// =============================================================================
export const mustScoreSchema = baseObservationSchema.extend({
    status: z.enum(['final', 'amended', 'corrected']),
    code: z.object({
        coding: z.array(z.object({
            system: z.literal('http://loinc.org'),
            code: z.literal(MUST_SCORE_CODES.totalScore),
            display: z.string().optional()
        })).min(1),
        text: z.string().optional()
    }),
    effectiveDateTime: z.string().datetime(),
    valueInteger: z.number().int().min(0).max(6)
});

// =============================================================================
// Abbey Pain Scale Schema (Observation)
// =============================================================================
export const abbeyPainScaleSchema = baseObservationSchema.extend({
    status: z.enum(['final', 'amended', 'corrected']),
    code: z.object({
        coding: z.array(z.object({
            system: z.literal('http://loinc.org'),
            code: z.literal(ABBEY_PAIN_CODES.totalScore),
            display: z.string().optional()
        })).min(1),
        text: z.string().optional()
    }),
    effectiveDateTime: z.string().datetime(),
    valueInteger: z.number().int().min(0).max(18)
});

// =============================================================================
// Bristol Stool Chart Schema (Observation)
// =============================================================================
export const bristolStoolChartSchema = baseObservationSchema.extend({
    status: z.enum(['final', 'amended', 'corrected']),
    code: z.object({
        coding: z.array(z.object({
            system: z.literal('http://loinc.org'),
            code: z.literal(BRISTOL_STOOL_CODES.stoolType),
            display: z.string().optional()
        })).min(1),
        text: z.string().optional()
    }),
    effectiveDateTime: z.string().datetime(),
    valueInteger: z.number().int().min(1).max(7)
});

// =============================================================================
// GCS Scale Schema (Observation with Components)
// =============================================================================
export const gcsScaleSchema = baseObservationSchema.extend({
    status: z.enum(['final', 'amended', 'corrected']),
    code: z.object({
        coding: z.array(z.object({
            system: z.literal('http://loinc.org'),
            code: z.literal(GCS_CODES.totalScore),
            display: z.string().optional()
        })).min(1),
        text: z.string().optional()
    }),
    effectiveDateTime: z.string().datetime(),
    valueInteger: z.number().int().min(3).max(15),
    component: z.array(z.object({
        code: codeableConceptSchema,
        valueInteger: z.number().int().min(1)
    })).optional()
});

// =============================================================================
// Clinical Frailty Scale Schema (Observation)
// =============================================================================
export const frailtyScaleSchema = baseObservationSchema.extend({
    status: z.enum(['final', 'amended', 'corrected']),
    code: z.object({
        coding: z.array(z.object({
            system: z.literal('http://loinc.org'),
            code: z.literal(FRAILTY_CODES.clinicalFrailtyScale),
            display: z.string().optional()
        })).min(1),
        text: z.string().optional()
    }),
    effectiveDateTime: z.string().datetime(),
    valueInteger: z.number().int().min(1).max(9)
});

// =============================================================================
// Oral Health Assessment Schema (Observation)
// =============================================================================
export const oralHealthSchema = baseObservationSchema.extend({
    status: z.enum(['final', 'amended', 'corrected']),
    code: z.object({
        coding: z.array(z.object({
            system: z.string().optional(),
            code: z.literal(ORAL_HEALTH_CODES.roagScore),
            display: z.string().optional()
        })).min(1),
        text: z.string().optional()
    }),
    effectiveDateTime: z.string().datetime(),
    valueCodeableConcept: codeableConceptSchema.optional(),
    component: z.array(z.object({
        code: codeableConceptSchema,
        valueCodeableConcept: codeableConceptSchema
    })).optional()
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
    painAssessmentSchema,
    mustScoreSchema,
    abbeyPainScaleSchema,
    bristolStoolChartSchema,
    gcsScaleSchema,
    frailtyScaleSchema,
    oralHealthSchema
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
export type MUSTScore = z.infer<typeof mustScoreSchema>;
export type AbbeyPainScale = z.infer<typeof abbeyPainScaleSchema>;
export type BristolStoolChart = z.infer<typeof bristolStoolChartSchema>;
export type GCSScale = z.infer<typeof gcsScaleSchema>;
export type FrailtyScale = z.infer<typeof frailtyScaleSchema>;
export type OralHealthAssessment = z.infer<typeof oralHealthSchema>;
