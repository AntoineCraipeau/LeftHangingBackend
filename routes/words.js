var express = require('express');
var router = express.Router();
var words = require('../controllers/words.js');


/* Get random word from theme */ 
router.get('/:theme', words.getWordsTheme);

/* Get all words */ 
router.get('/',words.getAll);

module.exports = router;