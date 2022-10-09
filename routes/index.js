var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/words', function(req, res, next) {
  res.send(JSON.stringify({response: "respond with a resource"}));
});

router.get('/words/:theme', function(req, res, next) {
  switch(req.params.theme){
    case "animals":
      res.send(JSON.stringify({response:"animals"}));
      break;
    case "plants":
      res.send(JSON.stringify({response:"plants"}));
      break;
    case "insects":
      res.send(JSON.stringify({response:"insects"}));
      break;
    default:
      res.send(JSON.stringify({response:"Theme not found"}))
      break;
  }
})

router.post('/score/:theme', function(req, res, next) {
  res.status('500')
  var obj = {msg: "Success!"}
  res.send(JSON.stringify(obj))
})

module.exports = router;
