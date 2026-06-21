import { NhsEdiValidator } from '../validators/nhsEdiValidator';

export class NhsEdiService {
    private validator: NhsEdiValidator;

    constructor() {
        this.validator = new NhsEdiValidator();
    }

    validate(data: unknown): { isValid: boolean; errors?: unknown; friendlyErrors?: string[] } {
        return this.validator.validate(data);
    }
}
