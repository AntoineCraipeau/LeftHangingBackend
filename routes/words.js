var express = require('express');
var router = express.Router();
var words = require('../controllers/words.js');


/* GET Words Page. */
router.get('/:theme', function(req, res, next) {
    words.getWordsTheme(req, res);
})

module.exports = router;