import { body, param } from 'express-validator';
import handleValidationErrors from '../ValidatorHandler';

const schemas = {
    register: [
        body('status')
            .notEmpty().withMessage('Status é obrigatório')
            .isBoolean().withMessage('Status deve ser um boolean'),

        body('limitOfPlayers')
            .notEmpty().withMessage('Limite de jogadores é obrigatório')
            .isNumeric().withMessage('Limite de jogadores deve ser um número'),

        body('startingTime')
            .notEmpty().withMessage('Hora de início é obrigatório')
            .isString().withMessage('Hora de início deve ser uma string'),

        body('endingTime')
            .notEmpty().withMessage('Hora de fim é obrigatório')
            .isString().withMessage('Hora de fim deve ser uma string'),

        body('dayOfWeek')
            .notEmpty().withMessage('Dia da semana é obrigatório')
            .isString().withMessage('Dia da semana deve ser uma string'),

        body('groupId')
            .isNumeric().withMessage('GroupId deve ser tdo tipo Inteiro')
            .notEmpty().withMessage('GroupId deve ser declarado no body'),

        body('localId')
            .isNumeric().withMessage('LocalId deve ser tdo tipo Inteiro')
            .notEmpty().withMessage('LocalId deve ser declarado no body'),
    ],

    details: [
        param('listId')
            .notEmpty().withMessage('Id é obrigatório')
            .isNumeric().withMessage('Id deve ser um número'),

        param('groupId')
            .isNumeric().withMessage('LocalId deve ser tdo tipo Inteiro')
            .notEmpty().withMessage('LocalId deve ser declarado no param'),
    ],

    get: [
        param('groupId')
            .isNumeric().withMessage('LocalId deve ser tdo tipo Inteiro')
            .notEmpty().withMessage('LocalId deve ser declarado no param'),
    ],

    update: [
        param('listId')
            .notEmpty().withMessage('Id é obrigatório')
            .isNumeric().withMessage('Id deve ser um número'),

        body('status')
            .notEmpty().withMessage('Status é obrigatório')
            .isBoolean().withMessage('Status deve ser um boolean'),

        body('limitOfPlayers')
            .notEmpty().withMessage('Limite de jogadores é obrigatório')
            .isNumeric().withMessage('Limite de jogadores deve ser um número'),

        body('startingTime')
            .notEmpty().withMessage('Hora de início é obrigatório')
            .isString().withMessage('Hora de início deve ser uma string'),

        body('endingTime')
            .notEmpty().withMessage('Hora de fim é obrigatório')
            .isString().withMessage('Hora de fim deve ser uma string'),

        body('dayOfWeek')
            .notEmpty().withMessage('Dia da semana é obrigatório')
            .isString().withMessage('Dia da semana deve ser uma string'),

        body('groupId')
            .isNumeric().withMessage('GroupId deve ser tdo tipo Inteiro')
            .notEmpty().withMessage('GroupId deve ser declarado no body'),

        body('localId')
            .isNumeric().withMessage('LocalId deve ser tdo tipo Inteiro')
            .notEmpty().withMessage('LocalId deve ser declarado no body'),
    ]
}

export { schemas, handleValidationErrors };
