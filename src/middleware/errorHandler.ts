import { Request, Response, NextFunction } from 'express';

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    // Log full stack internally but never expose it to clients
    console.error(err.stack);

    const isDevelopment = process.env.NODE_ENV !== 'production';

    res.status(err.status || 500).json({
        message: 'An internal server error occurred',
        // Only include error details in non-production environments
        ...(isDevelopment && { error: err.message }),
    });
};