import jwt, { JwtPayload, TokenExpiredError, JsonWebTokenError } from 'jsonwebtoken';
import { JWT_SECRET } from '../configs/jwt.config';
import { Request, Response, NextFunction } from "express";

interface AuthPayload extends JwtPayload {
    userId: string;
    name: string;
    email: string;
    roleId: number;
    statusId: number;
}

interface AuthenticatedRequest extends Request {
    user?: AuthPayload;
}

export const authenticate = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        res.status(401).json({ error: 'Token not provided' });
        return;
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET) as AuthPayload;

        console.log(decoded);
        req.user = decoded;
        next();
    } catch (error) {
        if (error instanceof TokenExpiredError) {
            res.status(401).json({ error: 'Token expirado' });
        } else if (error instanceof JsonWebTokenError) {
            res.status(401).json({ error: 'Token inválido back' });
        } else {
            res.status(401).json({ error: 'No autorizado' });
        }
    }
}