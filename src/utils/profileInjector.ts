/**
 * Profile Injector Utility
 * 
 * Automatically detects the resource type and code, then injects the appropriate
 * ONC profile URL into meta.profile if not already present.
 */

import { ONC_PROFILE_URLS } from '../schemas/oncProfiles';
import { ONC_TERMINOLOGY } from '../schemas/oncTerminology';

const LOINC = ONC_TERMINOLOGY.LOINC;
const SNOMED = ONC_TERMINOLOGY.SNOMED;
const CUSTOM = ONC_TERMINOLOGY.CUSTOM;

/**
 * Maps Observation codes to their corresponding ONC profile URLs
 */
const OBSERVATION_CODE_TO_PROFILE: Record<string, string> = {
    // LOINC-based Observations
    [LOINC.NEWS2_TOTAL.code]: ONC_PROFILE_URLS.news2Score,
    [LOINC.BRADEN_TOTAL.code]: ONC_PROFILE_URLS.bradenScaleAssessment,
    [LOINC.MUST_TOTAL.code]: ONC_PROFILE_URLS.mustScore,
    [LOINC.ABBEY_TOTAL.code]: ONC_PROFILE_URLS.abbeyPainScale,
    [LOINC.BRISTOL_STOOL.code]: ONC_PROFILE_URLS.bristolStoolChart,
    [LOINC.GCS_TOTAL.code]: ONC_PROFILE_URLS.gcsScale,
    [LOINC.FRAILTY_SCALE.code]: ONC_PROFILE_URLS.frailtyScale,
    [LOINC.PAIN_NRS.code]: ONC_PROFILE_URLS.painAssessment,
    [LOINC.PAIN_REPORTED.code]: ONC_PROFILE_URLS.painAssessment,
    [LOINC.FITZPATRICK.code]: ONC_PROFILE_URLS.skinToneObservation,

    // SNOMED-based Observations
    [SNOMED.FINDING_GOAL.code]: ONC_PROFILE_URLS.goalEvaluation,
    [SNOMED.PRESSURE_ULCER.code]: ONC_PROFILE_URLS.woundAssessment,

    // Custom Codes
    [CUSTOM.ROAG_TOTAL.code]: ONC_PROFILE_URLS.oralHealthAssessment
};

/**
 * Gets the first code from a FHIR resource's code.coding array
 */
function getFirstCode(resource: any): string | null {
    if (resource?.code?.coding?.[0]?.code) {
        return resource.code.coding[0].code;
    }
    return null;
}

/**
 * Injects the appropriate ONC profile URL into the resource's meta.profile
 * if it is not already present.
 * 
 * @param resource - The FHIR resource to process
 * @returns The resource with injected meta.profile (or unchanged if already present)
 */
export function injectProfile(resource: any): any {
    // If meta.profile already exists with entries, don't modify
    if (resource?.meta?.profile?.length > 0) {
        return resource;
    }

    let profileUrl: string | undefined;

    switch (resource?.resourceType) {
        case 'Observation': {
            const code = getFirstCode(resource);
            if (code && OBSERVATION_CODE_TO_PROFILE[code]) {
                profileUrl = OBSERVATION_CODE_TO_PROFILE[code];
            }
            break;
        }
        case 'Condition':
            profileUrl = ONC_PROFILE_URLS.nursingProblem;
            break;
        case 'Goal':
            profileUrl = ONC_PROFILE_URLS.patientGoal;
            break;
        case 'Procedure':
            profileUrl = ONC_PROFILE_URLS.nursingIntervention;
            break;
        case 'Patient':
            profileUrl = ONC_PROFILE_URLS.nhsPatient;
            break;
    }

    if (profileUrl) {
        return {
            ...resource,
            meta: {
                ...resource.meta,
                profile: [profileUrl]
            }
        };
    }

    return resource;
}
