import { nhsEdiComplexityPayloadSchema } from '../schemas/nhsEdiComplexitySchema';
import { getFriendlyErrors } from '../utils/errorMapper';

export class NhsEdiValidator {
    validate(data: unknown): { isValid: boolean; errors?: unknown; friendlyErrors?: string[] } {
        const result = nhsEdiComplexityPayloadSchema.safeParse(data);

        if (result.success) {
            return { isValid: true };
        }

        return {
            isValid: false,
            errors: result.error.format(),
            friendlyErrors: getFriendlyErrors(result.error),
        };
    }
}
