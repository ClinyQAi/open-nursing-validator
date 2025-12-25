import { Router } from 'express';
import ValidatorController from '../controllers/validatorController';

const router = Router();
const validatorController = new ValidatorController();

export function setValidatorRoutes(app: Router) {
    app.post('/validate-nursing-data', validatorController.validateNursingData.bind(validatorController));
}