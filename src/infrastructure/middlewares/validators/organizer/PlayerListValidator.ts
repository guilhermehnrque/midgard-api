import { body, param } from 'express-validator';
import handleValidationErrors from '../ValidatorHandler';

const schemas = {
    getListPlayer: [
        body('listId')
            .notEmpty().withMessage('Id da lista é obrigatório')
            .isNumeric().withMessage('Id da lista deve ser um número'),
    ],

    updateListPlayer: [
        param('listPlayerId')
            .isString().withMessage('listPlayerId should be a type of text')
            .notEmpty().withMessage('listPlayerId should be declared Path Variable'),

        body('listId')
            .notEmpty().withMessage('Id da lista é obrigatório')
            .isNumeric().withMessage('Id da lista deve ser um número'),

        body('playerId')
            .notEmpty().withMessage('Id do jogador é obrigatório')
            .isNumeric().withMessage('Id do jogador deve ser um número'),   

        body('status')
            .notEmpty().withMessage('Status é obrigatorio')
            .isBoolean().withMessage('Status deve ser um booleano'),
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
        body('playerId')
            .notEmpty().withMessage('Id do jogador é obrigatório')
            .isNumeric().withMessage('Id do jogador deve ser um número'),

        body('listId')  
            .notEmpty().withMessage('Id da lista é obrigatório')
            .isNumeric().withMessage('Id da lista deve ser um número'),

        body('playerListId')
            .notEmpty().withMessage('Id do playerList é obrigatorio')
            .isNumeric().withMessage('Id do playerList deve ser um número'),
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
