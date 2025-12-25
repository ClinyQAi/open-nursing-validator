import { Router } from 'express';
import ValidatorController from '../controllers/validatorController';

const router = Router();
const validatorController = new ValidatorController();

/**
 * @openapi
 * /validate-nursing-data:
 *   post:
 *     summary: Validate FHIR nursing data
 *     description: Validates a FHIR resource (Patient, Observation, Condition, etc.) against the Open Nursing Core (ONC-IG) specific schemas.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             description: A FHIR Resource JSON object.
 *     responses:
 *       200:
 *         description: Validation successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Nursing data is valid
 *                 status:
 *                   type: string
 *                   example: success
 *       400:
 *         description: Validation failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Validation failed
 *                 status:
 *                   type: string
 *                   example: error
 *                 errors:
 *                   type: object
 */
export function setValidatorRoutes(app: Router) {
    app.post('/validate-nursing-data', validatorController.validateNursingData.bind(validatorController));
}