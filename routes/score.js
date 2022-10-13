var express = require('express');
var router = express.Router();
var score = require('../controllers/score.js');

/* Post Score to database */
router.post('/:theme', score.postScore);  

/* Get all score from a theme */
router.get('/:theme', score.findAll);
module.exports = router;