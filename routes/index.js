var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/words', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/words/:theme', function(req, res, next) {
  switch(req.params.theme){
    case "animal":
      res.send(JSON.stringify({response:"animal"}));
      break;
    case "plant":
      res.send(JSON.stringify({response:"plant"}));
      break;
    case "insect":
      res.send(JSON.stringify({response:"insect"}));
      break;
  }
})

module.exports = router;
