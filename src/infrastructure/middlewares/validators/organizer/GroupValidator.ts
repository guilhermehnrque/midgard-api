import { body, param } from 'express-validator';
import handleValidationErrors from '../ValidatorHandler';

const schemas = {
    register: [
        body('description')
            .notEmpty().withMessage('A descrição é obrigatório')
            .isString().withMessage('Descrição deve ser uma string'),

        body('visibility')
            .notEmpty().withMessage('Visibilidade é obrigatório')
            .isString().withMessage('Visibilidade deve ser uma string'),

        body('sportType')
            .notEmpty().withMessage('Tipo de esporte é obrigatório')
            .isString().withMessage('Tipo de esporte deve ser uma string'),

    ],

    detail: [
        param('groupId')
            .isString().withMessage('groupId should be a type of text')
            .notEmpty().withMessage('GroupId should be declared Path Variable')
    ],

    update: [
        param('groupId')
            .isString().withMessage('groupId should be a type of text')
            .notEmpty().withMessage('GroupId should be declared Path Variable'),

        body('description')
            .notEmpty().withMessage('A descrição é obrigatório')
            .isString().withMessage('Descrição deve ser uma string'),

        body('status')
            .notEmpty().withMessage('Status é obrigatório')
            .isBoolean().withMessage('Status deve ser um booleano'),

        body('sportType')
            .notEmpty().withMessage('Tipo de esporte é obrigatório')
            .isString().withMessage('Tipo de esporte deve ser uma string'),

    ],

};

export { schemas, handleValidationErrors };
