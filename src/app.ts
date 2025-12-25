import express from 'express';
import { setValidatorRoutes } from './routes/validatorRoutes';
import { errorHandler } from './middleware/errorHandler';

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Root endpoint - API information
app.get('/', (req, res) => {
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
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({
        status: 'healthy',
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
    });
});

// Set up routes
setValidatorRoutes(app);

// Error handling middleware
app.use(errorHandler);

export default app;