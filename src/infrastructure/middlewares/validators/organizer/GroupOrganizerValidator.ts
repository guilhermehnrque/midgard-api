import { body } from 'express-validator';

const MESSAGES = {
    GROUP_ID_REQUIRED: 'GroupId é obrigatório',
    MUST_BE_NUMBER: 'GroupId deve ser um número',
    MUST_BE_STRING: 'groupId should be a type of text',
    PATH_VARIABLE_REQUIRED: 'GroupId should be declared as Path Variable',
    MEMBER_ID_REQUIRED: 'MemberId é obrigatório',
};

const groupIdBodyValidator = body('groupId')
    .notEmpty().withMessage(MESSAGES.GROUP_ID_REQUIRED)
    .isNumeric().withMessage(MESSAGES.MUST_BE_NUMBER);

const memberIdBodyValidator = body('memberId')
    .notEmpty().withMessage(MESSAGES.MEMBER_ID_REQUIRED)
    .isNumeric().withMessage(MESSAGES.MUST_BE_NUMBER);

export const requestValidations = [
    groupIdBodyValidator,
    memberIdBodyValidator
];
