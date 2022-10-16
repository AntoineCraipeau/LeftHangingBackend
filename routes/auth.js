var express = require('express');
var auth = require('../controllers/auth');
var router = express.Router();


/* Verification of the account with the database */
router.post('/login', auth.login);

router.post('/verifyLogin', auth.isLoggedIn);

/* Post new user to database and send confirmation mail */
router.post('/register', auth.register);  

/* Disconnect user, make the token expire */
router.get('/disconnect', auth.disconnect);

  module.exports = router;