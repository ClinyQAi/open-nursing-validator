/**
 * NHS EDI Complexity Sciences Schema
 *
 * Validates NHS Equality, Diversity & Inclusion workforce data through the lens
 * of Castellani & Gerrits' Map of the Complexity Sciences (Durham Repository,
 * output/1638759). Five lineages from that map structure the complexity
 * indicators below:
 *
 *   1. Dynamical Systems Theory & Mathematical Complexity
 *   2. Systems Thinking / Systems Science
 *   3. Core Concepts of Complexity
 *   4. Cybernetics
 *   5. Artificial Intelligence / Methods
 *
 * Reference scholars:
 *   Castellani & Gerrits (2021), Capra (1996), Cilliers (1998),
 *   Byrne (1998), Luhmann, Christakis, Foucault, Ragin, Morin,
 *   Weaver (1948), Holland, Kauffman, Ashby, Wiener, Beer, Watts,
 *   Barabási, Mitchell
 *
 * Regulatory grounding:
 *   NHS EDI Improvement Plan (NHS England, 2023)
 *   Workforce Race Equality Standard (WRES)
 *   Workforce Disability Equality Standard (WDES)
 *   Equality Act 2010 (nine protected characteristics)
 */

import { z } from 'zod';

// =============================================================================
// Shared primitives
// =============================================================================
const dateStringSchema = z.string().regex(
    /^\d{4}-\d{2}-\d{2}$/,
    'Date must be in YYYY-MM-DD format'
);

const percentageSchema = z
    .number()
    .min(0, 'Percentage cannot be negative')
    .max(100, 'Percentage cannot exceed 100');

const scoreSchema = (min: number, max: number) =>
    z.number().min(min).max(max);

// =============================================================================
// Organisation
// =============================================================================
export const nhsOrganisationSchema = z.object({
    odsCode: z.string().min(3).max(8),
    name: z.string().min(1),
    type: z.enum([
        'NHS_TRUST',
        'INTEGRATED_CARE_BOARD',
        'INTEGRATED_CARE_SYSTEM',
        'PRIMARY_CARE_NETWORK',
        'GP_PRACTICE',
        'NHS_ENGLAND_REGION',
    ]),
    region: z.string().min(1),
    reportingPeriod: z.object({
        from: dateStringSchema,
        to: dateStringSchema,
    }),
});

// =============================================================================
// Protected characteristics (Equality Act 2010, s.4)
// =============================================================================
export const workforceCharacteristicsSchema = z.object({
    totalHeadcount: z.number().int().positive(),

    race: z.object({
        bamePercentage: percentageSchema,
        whitePercentage: percentageSchema,
        unknownPercentage: percentageSchema,
    }),

    disability: z.object({
        declaredDisabilityPercentage: percentageSchema,
        noDisabilityPercentage: percentageSchema,
        preferNotToSayPercentage: percentageSchema,
    }),

    sex: z.object({
        femalePercentage: percentageSchema,
        malePercentage: percentageSchema,
        otherPercentage: percentageSchema,
    }),

    sexualOrientation: z.object({
        lgbPercentage: percentageSchema,
        heterosexualPercentage: percentageSchema,
        unknownPercentage: percentageSchema,
    }),

    religion: z.object({
        christianPercentage: percentageSchema,
        muslimPercentage: percentageSchema,
        hinduPercentage: percentageSchema,
        sikhPercentage: percentageSchema,
        buddhistPercentage: percentageSchema,
        jewishPercentage: percentageSchema,
        noReligionPercentage: percentageSchema,
        otherPercentage: percentageSchema,
        unknownPercentage: percentageSchema,
    }),

    ageGroups: z.object({
        under25Percentage: percentageSchema,
        age25to34Percentage: percentageSchema,
        age35to44Percentage: percentageSchema,
        age45to54Percentage: percentageSchema,
        age55to64Percentage: percentageSchema,
        over65Percentage: percentageSchema,
    }),

    internationallyRecruitedStaffPercentage: percentageSchema,
});

// =============================================================================
// WRES — Workforce Race Equality Standard
// =============================================================================
export const wresMetricsSchema = z.object({
    indicator1_shortlisting: z.object({
        bameRate: percentageSchema,
        whiteRate: percentageSchema,
    }),
    indicator2_appointedFromShortlist: z.object({
        bameRate: percentageSchema,
        whiteRate: percentageSchema,
    }),
    indicator3_bameInBand8aAndAbove: percentageSchema,
    indicator4_bameInVSM: percentageSchema,
    indicator5_bameOnBoards: percentageSchema,
    indicator6_disciplinaryProceedings: z.object({
        bameRate: percentageSchema,
        whiteRate: percentageSchema,
    }),
    indicator7_harassmentBullying: z.object({
        bameRate: percentageSchema,
        whiteRate: percentageSchema,
    }),
    indicator8_equalOpportunityBelief: z.object({
        bameRate: percentageSchema,
        whiteRate: percentageSchema,
    }),
    indicator9_experienceOfDiscrimination: z.object({
        bameRate: percentageSchema,
        whiteRate: percentageSchema,
    }),
});

// =============================================================================
// WDES — Workforce Disability Equality Standard
// =============================================================================
export const wdesMetricsSchema = z.object({
    metric1_appointmentRates: z.object({
        disabledRate: percentageSchema,
        nonDisabledRate: percentageSchema,
    }),
    metric2_disabledInBand8aAndAbove: percentageSchema,
    metric3_disabledOnBoards: percentageSchema,
    metric4_disciplinaryProceedings: z.object({
        disabledRate: percentageSchema,
        nonDisabledRate: percentageSchema,
    }),
    metric5_harassmentExperience: z.object({
        disabledRate: percentageSchema,
        nonDisabledRate: percentageSchema,
    }),
    metric6_equalOpportunityBelief: z.object({
        disabledRate: percentageSchema,
        nonDisabledRate: percentageSchema,
    }),
    metric7_experienceOfDiscrimination: z.object({
        disabledRate: percentageSchema,
        nonDisabledRate: percentageSchema,
    }),
});

// =============================================================================
// NHS EDI Six High Impact Actions (NHS England EDI Improvement Plan, 2023)
// =============================================================================
export const highImpactActionsSchema = z.object({
    action1_leadershipAccountability: z.object({
        ceoHasEdiObjective: z.boolean(),
        boardHasEdiObjective: z.boolean(),
        ediObjectiveSmartScore: scoreSchema(0, 10),
        lastAppraisalDate: dateStringSchema.optional(),
    }),

    action2_inclusiveRecruitment: z.object({
        diversityFocusTalentPlanInPlace: z.boolean(),
        communityRecruitmentPathwaysActive: z.boolean(),
        apprenticeshipsLinkedToEdi: z.boolean(),
        bameShortlistingImprovementTarget: percentageSchema.optional(),
    }),

    action3_payGapElimination: z.object({
        genderPayGapPercentage: z.number(),
        racePayGapPercentage: z.number(),
        disabilityPayGapPercentage: z.number(),
        flexibleWorkingPolicyInPlace: z.boolean(),
        mendTheGapReviewCompleted: z.boolean(),
    }),

    action4_workforceHealthInequalities: z.object({
        wellbeingConversationsCompletionRate: percentageSchema,
        occupationalHealthAccessEquitable: z.boolean(),
        communityPartnershipsForEmploymentActive: z.boolean(),
    }),

    action5_internationalStaffOnboarding: z.object({
        preArrivalSupportInPlace: z.boolean(),
        structuredInductionProgrammeInPlace: z.boolean(),
        internationalStaffSatisfactionScore: scoreSchema(0, 10).optional(),
        equalDevelopmentOpportunityConfirmed: z.boolean(),
    }),

    action6_bullyingHarassmentPrevention: z.object({
        bullyingDataReviewedByProtectedCharacteristic: z.boolean(),
        bullyingReductionTargetSet: z.boolean(),
        domesticAbuseSupportSystemInPlace: z.boolean(),
        fairDisciplinaryOversightConfirmed: z.boolean(),
        bullyingRateByGroup: z
            .object({
                bameRate: percentageSchema.optional(),
                disabledRate: percentageSchema.optional(),
                lgbRate: percentageSchema.optional(),
            })
            .optional(),
    }),
});

// =============================================================================
// Complexity Sciences Indicators — Lineage 1: Dynamical Systems Theory
// Theorists: Lorenz, Mandelbrot, Poincaré, Thom (catastrophe theory)
// Application: tipping-point detection, cultural phase transitions
// =============================================================================
export const dynamicalSystemsSchema = z.object({
    culturalAttractorState: z.enum([
        'EXCLUSIONARY',
        'TRANSITIONAL',
        'INCLUSIVE',
        'SELF_REINFORCING_INCLUSION',
    ]),
    phaseTipTriggerIdentified: z.boolean(),
    nonlinearChangeEventsLast12Months: z.number().int().min(0),
    culturalBifurcationRisk: z.enum(['LOW', 'MEDIUM', 'HIGH']),
});

// =============================================================================
// Complexity Sciences Indicators — Lineage 2: Systems Thinking / Systems Science
// Theorists: Capra, Luhmann, Senge, Ackoff
// Application: policy feedback loops, systemic barrier mapping
// =============================================================================
export const systemsThinkingSchema = z.object({
    reinforcingLoopsIdentified: z.number().int().min(0),
    balancingLoopsIdentified: z.number().int().min(0),
    systemicBarriersDocumented: z.array(z.string()),
    policyFeedbackCycleDays: z.number().positive(),
    systemsBoundaryDefinitionClear: z.boolean(),
    luhmannSubsystemsAccountedFor: z.array(
        z.enum(['LEGAL', 'ECONOMIC', 'POLITICAL', 'EDUCATIONAL', 'HEALTH'])
    ),
});

// =============================================================================
// Complexity Sciences Indicators — Lineage 3: Core Concepts of Complexity
// Theorists: Holland, Gell-Mann, Kauffman, Axelrod, Cilliers
// Application: emergence of inclusive norms, self-organisation of staff networks
// =============================================================================
export const coreComplexitySchema = z.object({
    emergenceMarkersPresent: z.array(
        z.enum([
            'SPONTANEOUS_ALLYSHIP_NETWORKS',
            'GRASSROOTS_EDI_CHAMPIONS',
            'PATIENT_FEEDBACK_DRIVING_CHANGE',
            'INFORMAL_MENTORING_WEBS',
            'CULTURAL_INNOVATION_CLUSTERS',
        ])
    ),
    selfOrganisationCapacityScore: scoreSchema(0, 10),
    adaptiveCapacityScore: scoreSchema(0, 10),
    complexAdaptiveSystemReadinessScore: scoreSchema(0, 10),
    edgeCaseVulnerabilityGroupsIdentified: z.number().int().min(0),
});

// =============================================================================
// Complexity Sciences Indicators — Lineage 4: Cybernetics
// Theorists: Wiener, Ashby, Beer, von Foerster
// Application: requisite variety in leadership, regulatory feedback on EDI metrics
// =============================================================================
export const cyberneticsSchema = z.object({
    requisiteVarietyInLeadership: z.boolean(),
    ashbyVarietyScore: scoreSchema(0, 10),
    feedbackLatencyDays: z.number().positive(),
    metricReviewCycleWeeks: z.number().positive(),
    secondOrderCyberneticsApplied: z.boolean(),
    staffVoiceLoopsActive: z.number().int().min(0),
});

// =============================================================================
// Complexity Sciences Indicators — Lineage 5: AI / Methods
// Theorists: Christakis, Watts, Barabási, Holland, Mitchell
// Application: network analysis of inclusion dynamics, predictive disparity modelling
// =============================================================================
export const aiMethodsSchema = z.object({
    networkAnalysis: z.object({
        clusteringCoefficientEdiNetwork: z.number().min(0).max(1).optional(),
        betweennessOfEdiChampions: z.number().min(0).optional(),
        isolatedNodeGroupsIdentified: z.number().int().min(0),
    }),
    agentBasedModellingApplied: z.boolean(),
    predictiveDisparityModelInPlace: z.boolean(),
    dataDrivenTargetSetting: z.boolean(),
    intersectionalDataCapabilityScore: scoreSchema(0, 10),
});

// =============================================================================
// Intersectionality (Crenshaw; Byrne's Complex Realism)
// Recognises compounding effects of multiple protected characteristics
// =============================================================================
export const intersectionalitySchema = z.object({
    multiCharacteristicAnalysisPerformed: z.boolean(),
    intersectionalGroupsIdentified: z.array(z.string()),
    compoundedDisadvantageScore: scoreSchema(0, 10),
    crenshawFrameworkApplied: z.boolean(),
});

// =============================================================================
// NHS Staff Survey — EDI dimensions
// =============================================================================
export const staffSurveyEdiSchema = z.object({
    overallEngagementScore: scoreSchema(0, 10),
    inclusionAndFairnessScore: scoreSchema(0, 10),
    speakUpCultureScore: scoreSchema(0, 10),
    leadershipInclusionScore: scoreSchema(0, 10),
    responseRate: percentageSchema,
    surveyYear: z.number().int().min(2000).max(2100),
});

// =============================================================================
// Root payload schema
// =============================================================================
export const nhsEdiComplexityPayloadSchema = z.object({
    resourceType: z.literal('NHSEdiComplexityReport'),
    schemaVersion: z.literal('1.0.0'),
    organisation: nhsOrganisationSchema,
    workforce: workforceCharacteristicsSchema,
    wres: wresMetricsSchema,
    wdes: wdesMetricsSchema,
    highImpactActions: highImpactActionsSchema,
    complexitySciencesIndicators: z.object({
        dynamicalSystems: dynamicalSystemsSchema,
        systemsThinking: systemsThinkingSchema,
        coreConcepts: coreComplexitySchema,
        cybernetics: cyberneticsSchema,
        aiMethods: aiMethodsSchema,
    }),
    intersectionality: intersectionalitySchema,
    staffSurvey: staffSurveyEdiSchema,
    metadata: z.object({
        submittedAt: z.string().datetime(),
        submittedBy: z.string().min(1),
        validated: z.boolean().default(false),
    }),
});

export type NhsEdiComplexityPayload = z.infer<typeof nhsEdiComplexityPayloadSchema>;
