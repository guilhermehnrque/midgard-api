import { body } from 'express-validator';
import handleValidationErrors from '../ValidatorHandler';

const schemas = {
    register: [
        body('name')
            .notEmpty().withMessage('Nome é obrigatório')
            .isString().withMessage('Nome deve ser uma string'),

        body('surname')
            .notEmpty().withMessage('Sobrenome é obrigatório')
            .isString().withMessage('Sobrenome deve ser uma string'),

        body('email')
            .notEmpty().withMessage('Email é obrigatório')
            .isEmail().withMessage('Email inválid'),

        body('type')
            .notEmpty().withMessage('type é obrigatório')
            .isString().withMessage('type deve ser uma string'),

        body('login')
            .notEmpty().withMessage('Login é obrigatório')
            .isString().withMessage('Tipo deve ser to tipo string'),

        body('password')
            .isLength({ min: 6 }).withMessage('A senha deve ter pelo menos 6 caracteres'),

        body('phoneNumber')
            .notEmpty().withMessage('Número de telefone é obrigatório')
            .isNumeric().withMessage('Número de telefone deve ser numérico'),
    ],

    login: [
        body('login')
            .notEmpty().withMessage('Informe um login válido')
            .isString().withMessage('Email inválido'),

        body('password')
            .isLength({ min: 6 }).withMessage('A senha deve ter pelo menos 6 caracteres'),
    ],

    forgotPassword: [
        body('phoneNumber')
            .notEmpty().withMessage('Número de telefone é obrigatório')
            .isNumeric().withMessage('Número de telefone deve ser numérico'),
    ],

    resetPassword: [
        body('password')
            .isLength({ min: 6 }).withMessage('A senha deve ter pelo menos 6 caracteres'),

        body('confirmPassword')
            .isLength({ min: 6 }).withMessage('A senha deve ter pelo menos 6 caracteres')
            .custom((value, { req }) => {
                if (value !== req.body.password) {
                    throw new Error('As senhas devem ser iguais');
                }

                return true;
            }),
    ],
};

export { schemas, handleValidationErrors };
