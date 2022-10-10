var express = require('express');
const nodemailer = require('nodemailer');
var router = express.Router();

/*
//Create reusable transporter 
let transporter = nodemailer.createTransport({
  service: "gmail",
  secure:true,
  auth: {
      user: "wordpanic@gmail.com",
      pass: "diykfziehqyeibio"
  }
});
// Message object
let message = {
  from: 'wordpanic@gmail.com',
  to: "tomatasong@gmail.com",
  subject: 'Test',
  text: 'Hello to myself!',
};

// send mail with defined transport object
transporter.sendMail(message, function(err, success){
  if(err){
    console.log(err);
  }
  else{
    console.log("Email Sent!")
  }
})
*/
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/words', function(req, res, next) {
  res.send(JSON.stringify({response: "respond with a resource"}));
});

/* GET Words Page. */
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



/* Post Score to database */
router.post('/score/:theme', function(req, res, next) {
  /* Sucess status */
  res.status('200')

  /* Score */
  var obj = {msg: req.body.score}
  console.log(req.body)
  console.log("here!")

  /* Send to database ???? */

  /* Re-send to front-end (for test)*/
  res.send(JSON.stringify(obj))
})

router.get('/score/:theme', function(req, res, next) {
  res.status('200')
  var theme = res.paramstheme
  /* I let Thomas find a way to pull this from the DB*/
  var obj = [{id: 1, owner: 'Leowenex', score: 5},{id: 2, owner: 'Totopoiuytreza', score: 3}]
  res.send(JSON.stringify(obj))
})

router.get('/pscore/:theme', function(req, res, next) {
  res.status('200')
  var theme = res.paramstheme
  /* I let Thomas find a way to pull this from the DB*/
  var obj = {score: 5}
  res.send(JSON.stringify(obj))
})




/* Post new user to database */
router.post('/register', function(req, res, next){
  var email = req.body.email; 
  //Create reusable transporter 
  let transporter = nodemailer.createTransport({
    service: "gmail",
    secure:true,
    auth: {
        user: "wordpanic@gmail.com",
        pass: "diykfziehqyeibio"
    }
  });
  // Message object
  let message = {
    from: 'wordpanic@gmail.com',
    to: email,
    subject: 'Test',
    text: 'Hello to myself!',
  };

  // send mail with defined transport object
  transporter.sendMail(message, function(err, success){
    if(err){
      console.log(err);
    }
    else{
      console.log("Email Sent!")
    }
  })

  res.status('200')
  res.send({success:"account created"})

})

module.exports = router;
