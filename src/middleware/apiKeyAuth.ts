import { Request, Response, NextFunction } from 'express';
import { config } from '../config';

/**
 * Middleware that enforces API key authentication via the X-API-Key header.
 * When API_KEY is configured, requests missing or providing a wrong key receive 401.
 * When API_KEY is not set (local development), the check is skipped.
 */
export const apiKeyAuth = (req: Request, res: Response, next: NextFunction): void => {
    if (!config.apiKey) {
        // No key configured – running in local dev without authentication
        next();
        return;
    }

    const providedKey = req.headers['x-api-key'];

    if (!providedKey || providedKey !== config.apiKey) {
        res.status(401).json({ error: 'Unauthorized: valid X-API-Key header required' });
        return;
    }

    next();
};
