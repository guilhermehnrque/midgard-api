import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';

export default class ValidationErrorHandler {
    public static handle(req: Request, res: Response, next: NextFunction) {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            const formattedErrors = errors.array().map(err => ({
                message: err.msg,
                field: err.type
            }));

            return res.status(400).json({ errors: formattedErrors });
        }

        next();
    }
}
