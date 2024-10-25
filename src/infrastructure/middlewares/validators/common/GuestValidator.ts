import { body, param } from 'express-validator';
import handleValidationErrors from '../ValidatorHandler';

const schemas = {
    register: [
        body('name')
            .notEmpty().withMessage('Nome é obrigatório')
            .isString().withMessage('Nome deve ser uma string'),
    ],

    updateGuest: [
        body('name')
            .notEmpty().withMessage('Nome é obrigatório')
            .isString().withMessage('Nome deve ser uma string'),
        param('guestId')
            .notEmpty().withMessage('guestId é obrigatório no param')
            .isNumeric().withMessage('guestId deve ser um número'),
    ],

    deleteGuest: [
        param('guestId')
            .notEmpty().withMessage('guestId é obrigatório no param')
            .isNumeric().withMessage('guestId deve ser um número'),
    ],



};

export { schemas, handleValidationErrors };
