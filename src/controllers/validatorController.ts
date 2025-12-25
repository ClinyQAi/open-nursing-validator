import { Request, Response } from 'express';
import { ValidationService } from '../services/validationService';

class ValidatorController {
    private validationService: ValidationService;

    constructor() {
        this.validationService = new ValidationService();
    }

    validateNursingData = (req: Request, res: Response): void => {
        const nursingData = req.body;

        const result = this.validationService.performValidation(nursingData);

        if (result.isValid) {
            res.status(200).json({
                message: 'Nursing data is valid',
                status: 'success'
            });
        } else {
            res.status(400).json({
                message: 'Validation failed',
                status: 'error',
                errors: result.errors
            });
        }
    }
}

export default ValidatorController;