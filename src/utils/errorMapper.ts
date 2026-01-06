/**
 * Error Mapper Utility
 * 
 * Transforms technical Zod validation errors into nurse-friendly, clinical messages
 * that are easier for healthcare professionals to understand and act upon.
 */

import { ZodError, ZodIssue } from 'zod';

interface FriendlyErrorMapping {
    pattern: RegExp;
    getMessage: (issue: ZodIssue, match?: RegExpMatchArray) => string;
}

/**
 * Clinical value range mappings for common nursing assessments
 */
const CLINICAL_RANGES: Record<string, { min: number; max: number; name: string }> = {
    '88330-6': { min: 0, max: 20, name: 'NEWS2 Score' },
    '38222-1': { min: 6, max: 23, name: 'Braden Scale Total Score' },
    '75303-8': { min: 0, max: 6, name: 'MUST Score' },
    '38213-0': { min: 0, max: 18, name: 'Abbey Pain Scale' },
    '72106-8': { min: 1, max: 7, name: 'Bristol Stool Chart Type' },
    '9269-2': { min: 3, max: 15, name: 'Glasgow Coma Scale Total' },
    '91535-5': { min: 1, max: 9, name: 'Clinical Frailty Scale' },
    '72514-3': { min: 0, max: 10, name: 'Pain Severity (0-10)' },
    '38208-5': { min: 0, max: 10, name: 'Pain Severity' }
};

/**
 * Error message templates for common validation failures
 */
const ERROR_MAPPINGS: FriendlyErrorMapping[] = [
    // Value range errors for observations
    {
        pattern: /valueInteger/,
        getMessage: (issue, match) => {
            if (issue.code === 'too_small') {
                return `Value must be at least ${(issue as any).minimum}`;
            }
            if (issue.code === 'too_big') {
                return `Value cannot exceed ${(issue as any).maximum}`;
            }
            return 'Value must be a valid whole number';
        }
    },

    // Required field errors
    {
        pattern: /subject/,
        getMessage: () => 'Patient reference (subject) is required'
    },
    {
        pattern: /status/,
        getMessage: () => 'Observation status is required (e.g., "final", "amended")'
    },
    {
        pattern: /code/,
        getMessage: () => 'Clinical code is required'
    },
    {
        pattern: /resourceType/,
        getMessage: () => 'Resource type must be specified'
    },

    // Type errors
    {
        pattern: /effectiveDateTime/,
        getMessage: () => 'Effective date/time must be in ISO 8601 format (e.g., "2024-01-15T10:30:00Z")'
    },

    // Profile errors
    {
        pattern: /meta\.profile/,
        getMessage: () => 'Resource profile URL is invalid or missing'
    }
];

/**
 * Attempts to detect the clinical assessment type from the error context
 */
function detectAssessmentType(error: ZodError): string | null {
    const errorStr = JSON.stringify(error);
    for (const [code, info] of Object.entries(CLINICAL_RANGES)) {
        if (errorStr.includes(code)) {
            return info.name;
        }
    }
    return null;
}

/**
 * Maps a single Zod issue to a friendly error message
 */
function mapIssueToFriendlyMessage(issue: ZodIssue): string {
    const path = issue.path.join('.');

    // Try to match against known patterns
    for (const mapping of ERROR_MAPPINGS) {
        const match = path.match(mapping.pattern);
        if (match) {
            return mapping.getMessage(issue, match);
        }
    }

    // Fallback to a generic but still friendly message
    if (issue.code === 'invalid_type') {
        return `${path || 'Field'} has an invalid type: expected ${(issue as any).expected}, received ${(issue as any).received}`;
    }

    if (issue.code === 'invalid_enum_value') {
        const options = (issue as any).options?.join(', ') || 'valid options';
        return `${path || 'Field'} must be one of: ${options}`;
    }

    return issue.message || 'Validation error occurred';
}

/**
 * Transforms a Zod error into an array of nurse-friendly error messages
 * 
 * @param zodError - The Zod validation error
 * @returns Array of human-readable error messages
 */
export function getFriendlyErrors(zodError: ZodError): string[] {
    const assessmentType = detectAssessmentType(zodError);
    const friendlyMessages: string[] = [];

    // Add context if we detected the assessment type
    if (assessmentType) {
        friendlyMessages.push(`Validation failed for ${assessmentType}:`);
    }

    // Map each issue to a friendly message
    for (const issue of zodError.issues) {
        friendlyMessages.push(mapIssueToFriendlyMessage(issue));
    }

    return friendlyMessages;
}
