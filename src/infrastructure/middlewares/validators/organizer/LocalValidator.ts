import { body, param } from 'express-validator';
import handleValidationErrors from '../ValidatorHandler';

const schemas = {
    register: [
        body('description')
            .notEmpty().withMessage('A descrição é obrigatório')
            .isString().withMessage('Descrição deve ser uma string'),

        body('country')
            .notEmpty().withMessage('Visibilidade é obrigatório')
            .isString().withMessage('Visibilidade deve ser uma string'),

        body('state')
            .notEmpty().withMessage('Tipo de esporte é obrigatório')
            .isString().withMessage('Tipo de esporte deve ser uma string'),

        body('city')
            .notEmpty().withMessage('Cidade é obrigatório')
            .isString().withMessage('Cidade deve ser uma string'),

        body('street')
            .notEmpty().withMessage('Rua é obrigatório')
            .isString().withMessage('Rua deve ser uma string'),

        body('number')
            .notEmpty().withMessage('Número é obrigatório')
            .isNumeric().withMessage('Número deve ser um número'),

        body('zipCode')
            .notEmpty().withMessage('CEP é obrigatório')
            .isNumeric().withMessage('CEP deve ser um número'),

        body('number')
            .notEmpty().withMessage('Número é obrigatório')
            .isNumeric().withMessage('Número deve ser um número'),

        body('groupId')
            .isNumeric().withMessage('GroupId deve ser tdo tipo Inteiro')
            .notEmpty().withMessage('GroupId deve ser declarado no body'),

    ],

    detail: [
        param('localId')
            .isNumeric().withMessage('localId should be a type of text')
            .notEmpty().withMessage('localId should be declared Path Variable')
    ],

    update: [
        body('description')
            .notEmpty().withMessage('A descrição é obrigatório')
            .isString().withMessage('Descrição deve ser uma string'),

        body('country')
            .notEmpty().withMessage('Visibilidade é obrigatório')
            .isString().withMessage('Visibilidade deve ser uma string'),

        body('state')
            .notEmpty().withMessage('Tipo de esporte é obrigatório')
            .isString().withMessage('Tipo de esporte deve ser uma string'),

        body('city')
            .notEmpty().withMessage('Cidade é obrigatório')
            .isString().withMessage('Cidade deve ser uma string'),

        body('street')
            .notEmpty().withMessage('Rua é obrigatório')
            .isString().withMessage('Rua deve ser uma string'),

        body('number')
            .notEmpty().withMessage('Número é obrigatório')
            .isNumeric().withMessage('Número deve ser um número'),

        body('zipCode')
            .notEmpty().withMessage('CEP é obrigatório')
            .isNumeric().withMessage('CEP deve ser um número'),

        body('number')
            .notEmpty().withMessage('Número é obrigatório')
            .isNumeric().withMessage('Número deve ser um número'),

        body('groupId')
            .isNumeric().withMessage('GroupId deve ser tdo tipo Inteiro')
            .notEmpty().withMessage('GroupId deve ser declarado no body'),

    ],

    getLocals: [
        param('groupId')
            .isNumeric().withMessage('groupId should be a type of text')
            .notEmpty().withMessage('GroupId should be declared Query'),
    ],

};

export { schemas, handleValidationErrors };
