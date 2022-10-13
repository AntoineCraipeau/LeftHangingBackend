var express = require('express');
var router = express.Router();
var words = require('../controllers/words.js');


/* GET Words Page. */
router.get('/:theme', words.getWordsTheme);
router.get('/',words.getAll);

module.exports = router;