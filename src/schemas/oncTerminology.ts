/**
 * Open Nursing Core (ONC) - Centralized Terminology (ValueSets)
 * 
 * This file serves as the single source of truth for all clinical codes (LOINC/SNOMED)
 * and their standard display names used across the validator and dashboard.
 */

export const ONC_TERMINOLOGY = {
    // LOINC Codes
    LOINC: {
        NEWS2_TOTAL: { code: '88330-6', display: 'NEWS2 Total Score', system: 'http://loinc.org' },
        BRADEN_TOTAL: { code: '38222-1', display: 'Braden Scale Total Score', system: 'http://loinc.org' },
        MUST_TOTAL: { code: '75303-8', display: 'MUST Total Score', system: 'http://loinc.org' },
        ABBEY_TOTAL: { code: '38213-0', display: 'Abbey Pain Scale Total Score', system: 'http://loinc.org' },
        BRISTOL_STOOL: { code: '72106-8', display: 'Bristol Stool Form Panel', system: 'http://loinc.org' },
        GCS_TOTAL: { code: '9269-2', display: 'Glasgow Coma Scale Total Score', system: 'http://loinc.org' },
        GCS_EYES: { code: '9267-6', display: 'GCS Eyes', system: 'http://loinc.org' },
        GCS_VERBAL: { code: '9270-0', display: 'GCS Verbal', system: 'http://loinc.org' },
        GCS_MOTOR: { code: '9268-4', display: 'GCS Motor', system: 'http://loinc.org' },
        FRAILTY_SCALE: { code: '91535-5', display: 'Clinical Frailty Scale', system: 'http://loinc.org' },
        PAIN_NRS: { code: '72514-3', display: 'Pain severity - 0-10 verbal numeric rating', system: 'http://loinc.org' },
        PAIN_REPORTED: { code: '38208-5', display: 'Pain severity - Reported', system: 'http://loinc.org' },
        FITZPATRICK: { code: '66472-2', display: 'Fitzpatrick skin type', system: 'http://loinc.org' }
    },

    // SNOMED-CT Codes
    SNOMED: {
        PRESSURE_ULCER: { code: '399912005', display: 'Pressure Ulcer', system: 'http://snomed.info/sct' },
        FINDING_GOAL: { code: '385633008', display: 'Finding related to progress toward goals', system: 'http://snomed.info/sct' },

        // Pressure Ulcer Stages
        STAGES: {
            STAGE_1: { code: '421257003', display: 'Stage 1' },
            STAGE_2: { code: '421985001', display: 'Stage 2' },
            STAGE_3: { code: '420555000', display: 'Stage 3' },
            STAGE_4: { code: '421720008', display: 'Stage 4' },
            UNSTAGEABLE: { code: '421000124102', display: 'Unstageable' },
            DTI: { code: '103328001', display: 'Deep Tissue Injury' }
        },

        // Wound Components
        WOUND_LENGTH: { code: '410668003', display: 'Length' },
        WOUND_WIDTH: { code: '410669006', display: 'Width' }
    },

    // Custom/Local Codes
    CUSTOM: {
        ROAG_TOTAL: { code: 'ONC-ROAG-Score', display: 'Oral Health Assessment (ROAG)' },
        ROAG_LIPS: { code: 'ROAG-lips', display: 'Lips' },
        ROAG_HEALTHY: { code: 'status-healthy', display: 'Healthy' }
    }
} as const;
