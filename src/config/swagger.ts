import swaggerJsdoc from 'swagger-jsdoc';

const options: swaggerJsdoc.Options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'NHS Unified Nursing Validator API',
            version: '1.0.0',
            description: 'A spec-driven FHIR validation service for the Open Nursing Core Implementation Guide (ONC-IG).',
            contact: {
                name: 'Lincoln Gombedza - Nursing Citizen Development',
                url: 'https://github.com/ClinyQAi/nhs-unified-nursing-validator',
                email: 'lincolngombedza@gmail.com'
            },
        },
        servers: [
            {
                url: 'https://nhs-nursing-validator.bravedesert-5038bd59.westus2.azurecontainerapps.io',
                description: 'Production Server'
            },
            {
                url: 'http://localhost:3000',
                description: 'Local Development Server'
            }
        ],
    },
    apis: [
        process.env.NODE_ENV === 'production'
            ? './dist/app.js'
            : './src/app.ts',
        process.env.NODE_ENV === 'production'
            ? './dist/routes/*.js'
            : './src/routes/*.ts'
    ],
};

export const swaggerSpec = swaggerJsdoc(options);
