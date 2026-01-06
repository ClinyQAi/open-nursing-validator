import { validationPayloadSchema } from '../schemas/fhirSchemas';
import { injectProfile } from '../utils/profileInjector';

export class NursingValidator {
    validate(data: any): { isValid: boolean; errors?: any } {
        // Auto-inject profile URL if missing
        const enrichedData = injectProfile(data);

        const result = validationPayloadSchema.safeParse(enrichedData);

        if (result.success) {
            return { isValid: true };
        } else {
            return {
                isValid: false,
                errors: result.error.format()
            };
        }
    }
}