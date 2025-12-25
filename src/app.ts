import express from 'express';
import { setValidatorRoutes } from './routes/validatorRoutes';
import { errorHandler } from './middleware/errorHandler';
import path from 'path';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './config/swagger';

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Root endpoint - API information
// Serve static files from the React app
const clientPath = path.join(__dirname, 'client');

// Root endpoint - Serves React app or API information
app.get('/', (req, res) => {
    res.sendFile(path.join(clientPath, 'index.html'), (err) => {
        if (err) {
            // Fallback to API info if dashboard is not built
            res.json({
                name: 'NHS Unified Nursing Validator',
                version: '1.0.0',
                description: 'FHIR R4 validation API for the Open Nursing Core Implementation Guide (ONC-IG)',
                endpoints: {
                    validate: 'POST /validate-nursing-data',
                    health: 'GET /health'
                },
                documentation: 'https://clinyqai.github.io/open-nursing-core-ig/',
                author: 'Lincoln Gombedza - Nursing Citizen Development'
            });
        }
    });
});

app.use(express.static(clientPath));

/**
 * @openapi
 * /health:
 *   get:
 *     summary: Health check
 *     description: Returns the health status of the validator service.
 *     responses:
 *       200:
 *         description: Service is healthy
 */
app.get('/health', (req, res) => {
    res.json({
        status: 'healthy',
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
    });
});

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Set up routes
setValidatorRoutes(app);

// Error handling middleware
app.use(errorHandler);

export default app;