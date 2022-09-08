const mongoose = require('mongoose');

const CommentSchema = mongoose.Schema({
    commentTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Profile',
        required: true
    },
    commentBy: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: false
    },
    voteOptions: [
        {
            type: String
        }
    ],
    likes: {
        type: Number,
        default: 0
    }

}, {timestamps: true});

const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;