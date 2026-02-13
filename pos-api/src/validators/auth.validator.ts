import { body } from 'express-validator';

export const authLoginValidator = [
    body('email')
    .exists()
    .withMessage('Email is required')
    .isString(), 

    body('password')
    .exists()
    .withMessage('Password is required')
    .isString()
]