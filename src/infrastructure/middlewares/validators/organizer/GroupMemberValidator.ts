import { body, param } from 'express-validator';
import handleValidationErrors from '../ValidatorHandler';

const schemas = {
    register: [
        body('members')
            .notEmpty().withMessage('A descrição é obrigatório')
            .isArray().withMessage('members deve ser um array'),

        body('groupId')
            .notEmpty().withMessage('GroupId é obrigatório')
            .isNumeric().withMessage('GroupId deve ser uma número'),
    ],

    getMembers: [
        param('groupId')
            .isString().withMessage('groupId should be a type of text')
            .notEmpty().withMessage('GroupId should be declared Path Variable')
    ],

    removeMember: [
        param('groupId')
            .isString().withMessage('groupId should be a type of text')
            .notEmpty().withMessage('GroupId should be declared Path Variable'),

        param('memberId')
            .isString().withMessage('groupId should be a type of text')
            .notEmpty().withMessage('GroupId should be declared Path Variable'),

    ],

};

export { schemas, handleValidationErrors };
