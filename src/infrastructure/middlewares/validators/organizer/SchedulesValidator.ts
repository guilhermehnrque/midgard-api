import { body, param } from 'express-validator';

const schemas = {
    register: [
        body('dayOfWeek')
            .notEmpty().withMessage('Dia da semana é obrigatório')
            .isString().withMessage('Dia da semana deve ser uma string'),

        body('startTime')
            .notEmpty().withMessage('Hora de início é obrigatório')
            .isString().withMessage('Hora de início deve ser uma string'),

        body('endTime')
            .notEmpty().withMessage('Hora de término é obrigatório')
            .isString().withMessage('Hora de término deve ser uma string'),


        body('groupId')
            .isNumeric().withMessage('GroupId deve ser tdo tipo Inteiro')
            .notEmpty().withMessage('GroupId deve ser declarado no body'),

        body('localId')
            .isNumeric().withMessage('LocalId deve ser tdo tipo Inteiro')
            .notEmpty().withMessage('LocalId deve ser declarado no body'),

    ],

    update: [
        param('scheduleId')
            .isNumeric().withMessage('Id deve ser um número')
            .notEmpty().withMessage('Id deve ser declarado no param'),

        body('dayOfWeek')
            .notEmpty().withMessage('Dia da semana é obrigatório')
            .isString().withMessage('Dia da semana deve ser uma string'),

        body('startTime')
            .notEmpty().withMessage('Hora de início é obrigatório')
            .isString().withMessage('Hora de início deve ser uma string'),

        body('endTime')
            .notEmpty().withMessage('Hora de fim é obrigatório')
            .isString().withMessage('Hora de término deve ser uma string'),

        body('localId')
            .isNumeric().withMessage('LocalId deve ser tdo tipo Inteiro')
            .notEmpty().withMessage('LocalId deve ser declarado no body'),
    ],

    detail: [
        param('scheduleId')
            .isNumeric().withMessage('groupId should be a type of numeric')
            .notEmpty().withMessage('GroupId should be declared Path Variable'),
    ],

    getSchedules: [
        param('groupId')
            .isNumeric().withMessage('groupId should be a type of text')
            .notEmpty().withMessage('GroupId should be declared Path Variable')
    ]
}

export { schemas };
