import { Router } from 'express';
import ValidatorController from '../controllers/validatorController';
import NhsEdiController from '../controllers/nhsEdiController';

const router = Router();
const validatorController = new ValidatorController();
const nhsEdiController = new NhsEdiController();

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

    /**
     * @openapi
     * /validate-nhs-edi:
     *   post:
     *     summary: Validate an NHS EDI Complexity Report
     *     description: >
     *       Validates an NHS Equality, Diversity & Inclusion workforce report
     *       against the Complexity Sciences framework derived from Castellani &
     *       Gerrits' Map of the Complexity Sciences (Durham Repository,
     *       output/1638759). Covers WRES, WDES, the six NHS EDI High Impact
     *       Actions, and five complexity-science lineage indicators.
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             description: NHSEdiComplexityReport JSON object
     *     responses:
     *       200:
     *         description: Report is valid
     *       400:
     *         description: Validation failed
     */
    app.post('/validate-nhs-edi', nhsEdiController.validateEdiReport.bind(nhsEdiController));
}