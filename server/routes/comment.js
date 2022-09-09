'use strict';

const express = require('express');
const router = express.Router();
const commentValidators = require('../validations/commentValidators');
const commentController = require('../controllers/commentController');

module.exports = function() {
    
    router.post('/create',  commentValidators.createComment,commentController.storeComment);

    router.post('/like-unlike', commentValidators.likeOrUnlike, commentController.likeComment);

    router.get('/:profileId/profile', commentController.commentsForProfile);
    
    router.get('/:profileId/sort/:sortBy', commentController.sortComments);
    
    return router;
}