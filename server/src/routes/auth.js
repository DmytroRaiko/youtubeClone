const express = require('express');
const { signUp, signIn, google } = require('../controllers/auth.js');
const asyncFunction = require('../middlewars/asyncFunction.js');
const router = express.Router();

// create a user
router.post("/sign-up", asyncFunction(signUp));

// sign in
router.post("/sign-in", asyncFunction(signIn));

// google auth
router.post("/google", asyncFunction(google));

module.exports = router;
