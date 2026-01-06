import { validationPayloadSchema } from '../schemas/fhirSchemas';
import { injectProfile } from '../utils/profileInjector';
import { getFriendlyErrors } from '../utils/errorMapper';

export class NursingValidator {
    validate(data: any): { isValid: boolean; errors?: any; friendlyErrors?: string[] } {
        // Auto-inject profile URL if missing
        const enrichedData = injectProfile(data);

        const result = validationPayloadSchema.safeParse(enrichedData);

        if (result.success) {
            return { isValid: true };
        } else {
            return {
                isValid: false,
                errors: result.error.format(),
                friendlyErrors: getFriendlyErrors(result.error)
            };
        }
    }
}