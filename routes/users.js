var express = require('express');
var router = express.Router();
var score = require('../controllers/score');
var user = require('../controllers/users');

/* GET users listing. */
router.get('/', user.findAll);

/* Get personnal scores from user */ 
router.get('/score/:theme', score.getUserBestScore)

/* Get user personnal info */ 
router.get('/myinfo', user.findPersonalInfo)

module.exports = router;
