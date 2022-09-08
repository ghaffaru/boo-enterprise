'use strict';

const express = require('express');
const router = express.Router();
const commentValidators = require('../validations/commentValidators');
const commentController = require('../controllers/commentController');

module.exports = function() {
    
    router.post('/create',  commentValidators.createComment,commentController.storeComment)

    return router;
}