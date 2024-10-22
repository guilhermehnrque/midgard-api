import { body, param } from 'express-validator';

const MESSAGES = {
    GROUP_ID_REQUIRED: 'GroupId é obrigatório',
    MUST_BE_NUMBER: 'GroupId deve ser um número',
    MUST_BE_STRING: 'groupId should be a type of text',
    PATH_VARIABLE_REQUIRED: 'GroupId should be declared as Path Variable',
};

const groupIdBodyValidator = body('groupId')
    .notEmpty().withMessage(MESSAGES.GROUP_ID_REQUIRED)
    .isNumeric().withMessage(MESSAGES.MUST_BE_NUMBER);

const groupIdParamValidator = param('groupId')
    .isString().withMessage(MESSAGES.MUST_BE_STRING)
    .notEmpty().withMessage(MESSAGES.PATH_VARIABLE_REQUIRED);

export const joinGroupValidation = [
    groupIdBodyValidator,
];

export const leaveGroupValidation = [
    groupIdParamValidator,
];

export const getMembersValidation = [
    groupIdParamValidator,
];

export const getGroupDetailsValidation = [
    groupIdParamValidator,
];

