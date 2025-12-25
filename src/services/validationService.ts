import { NursingValidator } from '../validators/nursingValidator';

export class ValidationService {
    private validator: NursingValidator;

    constructor() {
        this.validator = new NursingValidator();
    }

    performValidation(data: any): { isValid: boolean; errors?: any } {
        return this.validator.validate(data);
    }
}