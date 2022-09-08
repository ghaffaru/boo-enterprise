const mongoose = require('mongoose');

const ProfileSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    mbti: {
        type: String,
        required: false
    },
    enneagram: {
        type: String,
        required: false
    },
    variant: {
        type: String,
        required: false
    },
    tritype: {
        type: String,
        required: false
    },
    socionics: {
        type: String,
        required: false
    },
    sloan: {
        type: String,
        required: false
    },
    psyche: {
        type: String,
        required: false
    },
    image: {
        type: String,
        required: false
    }
}, {timestamps: true});

const Profile = mongoose.model('Profile', ProfileSchema);

module.exports = Profile;