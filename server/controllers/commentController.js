const Comment = require("../models/Comment");
const Profile = require("../models/Profile");

exports.commentsForProfile = async (req, res) => {
    try {
        const profile = await Profile.findById(req.params.profileId);

        if (!profile) {
            return res.status(404).json({message: 'Profile not found!'});
        }

        const comments = await Comment.find({commentTo: req.params.profileId}).populate();

        return res.status(200).json(comments);
        
    } catch (err) {
        return res.status(400).json({message: err.message});
    }
}
exports.storeComment = async (req,res) => {
    try {

        const commentToProfile = await Profile.findById(req.body.commentTo);

        if (!commentToProfile) {
            return res.status(404).json({message: 'Profile does not exist!'})
        }

        const comment = new Comment({
            commentTo: req.body.commentTo,
            commentBy: req.body.commentBy,
            comment: req.body.comment,
            voteOptions: req.body.voteOptions
        });

        await comment.save();

        return res.status(200).json({message: 'Comment added successfully!', comment: comment});

    } catch (err) {
        return res.status(400).json({error: err.message});
    }
}

exports.likeComment = async (req, res) => {
    try {
        const comment = await Comment.findById(req.body.commentId);

        if (!comment) {
            return res.status(404).json({message: 'Comment not available'})
        }

        if (req.body.action === 'like') {
            await Comment.findByIdAndUpdate(req.body.commentId, {
                likes: comment.likes + 1
            });
        } else if (req.body.action === 'unlike') {
               if (comment.likes !== 0) {
                    await Comment.findByIdAndUpdate(req.body.commentId, {
                        likes: comment.likes - 1
                    });
               } 
        }

        return res.status(200).json({message: 'Comment liked successfully!', comment: await Comment.findById(req.body.commentId)});

    } catch (err) {
        return res.status(400).json({error: err.message});
    }
}

exports.sortComments = async (req, res) => {
    try {
        const commentToProfile = await Profile.findById(req.params.profileId);

        if (!commentToProfile) {
            return res.status(404).json({message: 'Profile does not exist!'});
        }
      
        if (req.params.sortBy === 'recent') {
            let comments = await Comment.find({commentTo: req.params.profileId}).sort({'createdAt': -1});
            return res.status(200).json(comments)
        } else if (req.params.sortBy === 'best') {
            let comments = await Comment.find({commentTo: req.params.profileId}).sort({'likes': -1});
            return res.status(200).json(comments);
        }

        return res.status(200).json(await Comment.find({commentTo: req.params.profileId}));
    } catch (err) {
        return res.status(400).json({error: err.message});
    }
}

exports.filterComments = async (req,res) => {
    try {
        const commentToProfile = await Profile.findById(req.params.profileId);

        if (!commentToProfile) {
            return res.status(404).json({message: 'Profile does not exist!'});
        }

        const comments = await Comment.find({
            commentTo: req.params.profileId,
            voteOptions: req.params.personality
        })

        return res.status(200).json(comments);

    } catch (err) {
        return res.status(400).json({error: err.message});
    }
}