import express from 'express';
import { setValidatorRoutes } from './routes/validatorRoutes';
import { errorHandler } from './middleware/errorHandler';
import path from 'path';

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Root endpoint - API information
// Serve static files from the React app
const clientPath = path.join(__dirname, 'client');
app.use(express.static(clientPath));

// Root endpoint - Serves React app or API information
app.get('/', (req, res) => {
    // Check if index.html exists in the client path
    res.sendFile(path.join(clientPath, 'index.html'), (err) => {
        if (err) {
            // If frontend is not built, fallback to API info JSON
            res.json({
                name: 'NHS Unified Nursing Validator',
                version: '1.0.0',
                description: 'FHIR R4 validation API for the Open Nursing Core Implementation Guide (ONC-IG)',
                endpoints: {
                    validate: 'POST /validate-nursing-data',
                    health: 'GET /health'
                },
                documentation: 'https://clinyqai.github.io/open-nursing-core-ig/',
                author: 'Lincoln Gombedza - Nursing Citizen Development',
                note: 'Visual dashboard not found. Run npm run build to enable.'
            });
        }
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