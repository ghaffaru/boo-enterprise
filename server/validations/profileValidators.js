const { body, validationResult } = require('express-validator');
const { returnErrors } = require('./helpers');

exports.createNewProfile = [
    
    body('name').notEmpty().withMessage('Profile name is required!'),

    (req, res, next) => {
        returnErrors(validationResult(req), res, next);
    }
]
