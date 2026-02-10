import { body } from "express-validator";

export const createMenuValidator = [
    body('name').exists().withMessage('Menu name is required')
    .isString().isLength({
        min: 6, max: 50
    }).withMessage('Menu name at least have 6 characters'), 

    body('description').exists().withMessage('Menu description is required')
    .isString().isLength({
        min: 10, max: 200
    }).withMessage('Menu description at leash have 10 characters'), 

    body('price').exists().withMessage('Menu price is required')
    .toInt(), 

    body('isAvailable').exists().withMessage("Menu available is required").toBoolean()
]