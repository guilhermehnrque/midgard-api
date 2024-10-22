import { param } from "express-validator";

export const validateGetJoinedLists = [
  param('userId')
    .isInt({ gt: 0 }).withMessage('UserId must be a positive integer')
];

export const validateGetLists = [
  param('userId')
    .isInt({ gt: 0 }).withMessage('UserId must be a positive integer'),
  param('groupId')
    .isInt({ gt: 0 }).withMessage('GroupId must be a positive integer')
];

export const validateJoinList = [
  param('userId')
    .isInt({ gt: 0 }).withMessage('UserId must be a positive integer'),
  param('listId')
    .isInt({ gt: 0 }).withMessage('ListId must be a positive integer')
];

export const validateLeaveList = [
  param('userId')
    .isInt({ gt: 0 }).withMessage('UserId must be a positive integer'),
  param('listId')
    .isInt({ gt: 0 }).withMessage('ListId must be a positive integer')
];
