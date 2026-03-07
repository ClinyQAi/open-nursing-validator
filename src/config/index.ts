if (process.env.NODE_ENV === 'production' && !process.env.API_KEY) {
    throw new Error('API_KEY environment variable must be set in production');
}

export const config = {
    port: process.env.PORT || 3000,
    dbUri: process.env.DB_URI || 'mongodb://localhost:27017/nhs-nursing-validator',
    apiKey: process.env.API_KEY,
    environment: process.env.NODE_ENV || 'development',
};