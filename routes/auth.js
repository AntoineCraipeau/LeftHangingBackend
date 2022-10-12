var express = require('express');
const nodemailer = require('nodemailer');
var auth = require('../controllers/auth');
var router = express.Router();


/* Verification of the account with the database */
router.post('/login', function(req, res, next){
  auth.getLogin(req, res);
})


  /* Post new user to database and send confirmation mail */
router.post('/register', function(req, res, next){
    auth.registerNewUser(req, res);
  })

  module.exports = router;