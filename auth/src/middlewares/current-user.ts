import { Request, Response, NextFunction } from "express";
import { authPayloadDecoder } from "../services/jwtController";

interface UserPayload {
    id: string;
    email: string;
}

declare global {
    namespace Express {
        interface Request {
            currentUser?: UserPayload;
        }
    }
}

export const currentUser = (
    req: Request, 
    res: Response, 
    next: NextFunction
) => {
    if (!req.session?.jwt) {
        return next();
    }

    try {
        const payload = authPayloadDecoder(req.session.jwt) as UserPayload;
        req.currentUser = payload;
    } catch (err) {
        console.error(err);    
    }

    next();
}   