const Profile = require("../models/Profile");

exports.newProfile = async (req, res) => {
    try {
        const profile = new Profile({
            name: req.body.name,
            description: req.body.description,
            mbti: req.body.mbti,
            enneagram: req.body.enneagram,
            variant: req.body.variant,
            tritype: req.body.tritype,
            socionics: req.body.socionics,
            sloan: req.body.sloan,
            psyche: req.body.psyche,
            image: 'https://soulverse.boo.world/images/1.png'
        });

        await profile.save();

        return res.status(200).json({message: 'Profile created successfully', profile: profile});
        
    } catch (err) {
        return res.status(400).json({error: err.message});
    }
}

exports.allProfiles = async (req, res) => {
    try {
        const profiles = await Profile.find();

        return res.status(200).json(profiles);
        
    } catch(err) {
        return res.status(400).json({error: err.message});
    }
}