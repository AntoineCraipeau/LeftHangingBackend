var express = require('express');
var router = express.Router();


/* Post Score to database */
router.post('/score/:theme', function(req, res, next) {
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
router.get('/score/:theme', function(req, res, next) {
    res.status('200')
    var theme = res.paramstheme
    /* I let Thomas find a way to pull this from the DB*/
    var obj = [{id: 1, owner: 'Leowenex', score: 5},{id: 2, owner: 'Totopoiuytreza', score: 3}]
    res.send(JSON.stringify(obj))
})
module.exports = router;