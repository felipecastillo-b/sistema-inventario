import { Response, NextFunction } from "express";
import { AuthenticatedRequest } from "./auth.middleware";

export const authorizeRole = (allowedRoles: number[]) => {
    return (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
        if (!req.user) {
            res.status(401).json({ error: 'No authenticated' });
            return;
        }

        const { roleId } = req.user;

        if (!allowedRoles.includes(roleId)) {
            res.status(403).json({ error: 'Not authorized for this action' });
            return;
        }

        next();
    };
};
