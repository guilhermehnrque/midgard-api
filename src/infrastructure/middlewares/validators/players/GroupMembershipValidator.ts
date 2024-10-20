import { body, param } from 'express-validator';
import handleValidationErrors from '../ValidatorHandler';

const schemas = {
    joinGroup: [
        body('groupId')
            .notEmpty().withMessage('GroupId é obrigatório')
            .isNumeric().withMessage('GroupId deve ser uma número'),
    ],

    leaveGroup:[
        param('groupId')
            .isString().withMessage('groupId should be a type of text')
            .notEmpty().withMessage('GroupId should be declared Path Variable'),
    ],

    getMembers: [
        param('groupId')
            .isString().withMessage('groupId should be a type of text')
            .notEmpty().withMessage('GroupId should be declared Path Variable')
    ],

    getGroupDetails: [
        param('groupId')
            .isString().withMessage('groupId should be a type of text')
            .notEmpty().withMessage('GroupId should be declared Path Variable'),
    ],

};

export { schemas, handleValidationErrors };
