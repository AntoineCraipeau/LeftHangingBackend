var express = require('express');
const nodemailer = require('nodemailer');
var mysql = require('mysql');
var router = express.Router();

var connection = mysql.createConnection({
  host     : "wordpanic-database-1.cnmskxwcoqjq.us-east-2.rds.amazonaws.com",
  user     : "admin",
  password : "wordpanicdatabasepassword2002",
  port     : 3306
});
/* Connection to database */ 
connection.connect(function(err) {
  if (err) {
    console.error('Database connection failed: ' + err.stack);
    return;
  }

console.log('Connected to database.');
});


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

/* Verification of the account with the database */
router.post('/login', function(req, res, next){
  /* Get value from FrontEnd*/
  var email = req.body.email;
  var password = req.body.password;

  /* Get value from Database*/


  /* Connexion access */
  var connexion = true;
  if(connexion){
    res.status('200')
    res.send({msg:"login successfull"})
  }
  else{
    res.status('200')
    res.send({msg:"login failed"})
  }
})


/* Post new user to database and send confirmation mail */
router.post('/register', function(req, res, next){
  var email = req.body.email; 
  var username = req.body.username;
  var password = req.body.password;
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
    subject: 'Confirmation of Account creation',
    text: 'Hi ' + username +",",
    html:'Hi '+ username + ',' + '<br><p>Thanks again for creating an account on WordPanic.</p> <p>Follow this link to begin your WordPanic adventure!'
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
connection.end();
