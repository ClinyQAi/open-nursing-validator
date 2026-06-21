import { Request, Response } from 'express';
import { NhsEdiService } from '../services/nhsEdiService';

class NhsEdiController {
    private service: NhsEdiService;

    constructor() {
        this.service = new NhsEdiService();
    }

    validateEdiReport = (req: Request, res: Response): void => {
        const result = this.service.validate(req.body);

        if (result.isValid) {
            res.status(200).json({
                message: 'NHS EDI Complexity Report is valid',
                status: 'success',
            });
            return;
        }

        res.status(400).json({
            message: 'Validation failed',
            status: 'error',
            errors: result.errors,
            friendlyErrors: result.friendlyErrors,
        });
    };
}

export default NhsEdiController;
