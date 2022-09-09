const { body, validationResult } = require('express-validator');
const { returnErrors } = require('./helpers');

exports.createComment =  [

    body('commentTo').notEmpty().withMessage('Profile to comment to is required!'),

    body('commentBy').notEmpty().withMessage('Comment by is required!'),


    (req, res, next) => {
        returnErrors(validationResult(req), res, next);
    }
]

exports.likeOrUnlike = [

    body('commentId').notEmpty().withMessage('Comment Id is required'),

    body('action').notEmpty().withMessage('Action field is required'),

    body('action').isIn(['like', 'unlike']).withMessage('Action can be like or unlike'),
    
    (req, res, next) => {
        returnErrors(validationResult(req), res, next);
    }

]