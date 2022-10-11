var express = require('express');
const nodemailer = require('nodemailer');
var mysql = require('mysql');
var router = express.Router();
var words = require('../controllers/words.js');

  
/* GET Words Page. */
router.get('/:theme', function(req, res, next) {
  words.getWordsTheme(res, req);
  })

module.exports = router;