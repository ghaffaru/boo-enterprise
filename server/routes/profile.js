'use strict';

const express = require('express');
const router = express.Router();

const profileValidators = require('../validations/profileValidators');

const profileController = require('../controllers/profileController');


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

    res.render('profile_template', {
      profile: profiles[0],
    });
  });

  router.post('/create',profileValidators.createNewProfile, profileController.newProfile)
  router.get('/', profileController.allProfiles);

  return router;
}

