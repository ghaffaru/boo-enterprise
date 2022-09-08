'use strict';

const express = require('express');
const router = express.Router();

const profileValidators = require('../validations/profileValidators');

const profileController = require('../controllers/profileController');
const Profile = require('../models/Profile');


const profiles = [
  {
    "id": 1,
    "name": "A Martinez",
    "description": "Adolph Larrue Martinez III.",
    "mbti": "ISFJ",
    "enneagram": "9w3",
    "variant": "sp/so",
    "tritype": 725,
    "socionics": "SEE",
    "sloan": "RCOEN",
    "psyche": "FEVL",
    "image": "https://soulverse.boo.world/images/1.png",
  }
];

module.exports = function() {

  router.get('/:id', async function(req, res, next) {
    
    const profile = await Profile.findById(req.params.id);

    if (!profile) {
      return res.status(404).json({message: 'Profile not found!'});
    }
    res.render('profile_template', {
      profile: profile,
    });
  });

  router.post('/create',profileValidators.createNewProfile, profileController.newProfile)
  router.get('/', profileController.allProfiles);

  return router;
}

