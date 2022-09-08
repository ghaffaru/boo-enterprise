const { body, validationResult } = require('express-validator');
const { returnErrors } = require('./helpers');

exports.createComment =  [

    body('commentTo').notEmpty().withMessage('Profile to comment to is required!'),

    body('commentBy').notEmpty().withMessage('Comment by is required!'),


    (req, res, next) => {
        returnErrors(validationResult(req), res, next);
    }
]