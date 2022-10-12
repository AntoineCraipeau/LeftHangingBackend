var express = require('express');
var router = express.Router();
var scores = require('../controllers/score.js')

/* Post Score to database */
router.post('/:theme', function(req, res, next) {
    /* Sucess status */
    res.status('200')
  
    /* Score */
    var obj = {msg: req.body.score}
    console.log(req.body)
    console.log("here!")
    
    /* Get score from database */

    /* Send to database ???? */

  
    /* Re-send to front-end (for test)*/
    res.send(JSON.stringify(obj))
  })

/* Get all score from a theme */
router.get('/:theme', function(req, res, next) {
    scores.getDatabaseScore(req,res);
})
module.exports = router;