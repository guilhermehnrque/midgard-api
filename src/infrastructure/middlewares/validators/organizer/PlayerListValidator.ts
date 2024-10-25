import { body, param } from 'express-validator';
import handleValidationErrors from '../ValidatorHandler';

const schemas = {
    getListPlayer: [
        param('listId')
            .notEmpty().withMessage('Id da lista é obrigatório')
            .isNumeric().withMessage('Id da lista deve ser um número'),
    ],

    updateListPlayer: [
        param('listId')
            .isNumeric().withMessage('listId should be a type of number')
            .notEmpty().withMessage('listId should be declared Path Variable'),

        body('playerId')
            .notEmpty().withMessage('Id do jogador é obrigatorio')
            .isNumeric().withMessage('Id do jogador deve ser um número'),

        body('status')
            .notEmpty().withMessage('Status do jogador é obrigatorio')
            .isString().withMessage('Status do jogador deve ser uma string'),
    ],

    addPlayerMemberOnList: [
        body('playerId')
            .notEmpty().withMessage('Id do jogador é obrigatório')
            .isNumeric().withMessage('Id do jogador deve ser um número'),

        body('listId')
            .notEmpty().withMessage('Id da lista é obrigatório')
            .isNumeric().withMessage('Id da lista deve ser um número'),

        body('status')
            .notEmpty().withMessage('Status é obrigatorio')
            .isString().withMessage('Status deve ser um string'),
    ],

    removePlayerMemberOnList: [
        param('listId')
            .isNumeric().withMessage('playerListId should be a type of text')
            .notEmpty().withMessage('playerListId should be declared Path Variable'),

        param('playerId')
            .notEmpty().withMessage('Id do jogador é obrigatório')
            .isNumeric().withMessage('Id do jogador deve ser um número'),
    ],

    addGuestMemberOnList: [
        body('guestId')
            .notEmpty().withMessage('Id do jogador é obrigatório')
            .isNumeric().withMessage('Id do jogador deve ser um número'),

        body('listId')
            .notEmpty().withMessage('Id da lista é obrigatório')
            .isNumeric().withMessage('Id da lista deve ser um número'),

        body('status')
            .notEmpty().withMessage('Status é obrigatorio')
            .isBoolean().withMessage('Status deve ser um booleano'),
    ],

    removeGuestMemberOnList: [
        body('guestId')
            .notEmpty().withMessage('Id do jogador é obrigatório')
            .isNumeric().withMessage('Id do jogador deve ser um número'),

        body('listId')
            .notEmpty().withMessage('Id da lista é obrigatório')
            .isNumeric().withMessage('Id da lista deve ser um número'),

        body('playerListId')
            .notEmpty().withMessage('Id do playerList é obrigatorio')
            .isNumeric().withMessage('Id do playerList deve ser um número'),
    ]

};

export { schemas, handleValidationErrors };