var express = require('express');
var router = express.Router();
var score = require('../controllers/score');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* Get personnal scores from user */ 
router.get('/score/:theme', score.getUserBestScore)

module.exports = router;
