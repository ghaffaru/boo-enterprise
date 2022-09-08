const Comment = require("../models/Comment");
const Profile = require("../models/Profile");

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