var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* Get personnal scores from user */ 
router.get('/score/:theme', function(req, res, next){
  res.status('200')
  var theme = res.paramstheme;
  /* I let Thomas find a way to pull this from the DB*/
  var obj = {score: 5}
  res.send(JSON.stringify(obj))
})

module.exports = router;
