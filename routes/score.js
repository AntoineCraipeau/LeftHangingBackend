var express = require('express');
var router = express.Router();
var score = require('../controllers/score.js');

/* Post Score to database */
router.post('/:theme', function(req, res, next) {
    score.postScore(req, res);
  })

/* Get all score from a theme */
router.get('/:theme', function(req, res, next) {
    score.getDatabaseScore(req,res);
})
module.exports = router;