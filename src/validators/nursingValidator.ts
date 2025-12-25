import { validationPayloadSchema } from '../schemas/fhirSchemas';

export class NursingValidator {
    validate(data: any): { isValid: boolean; errors?: any } {
        const result = validationPayloadSchema.safeParse(data);

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