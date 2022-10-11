var express = require('express');
const nodemailer = require('nodemailer');
var mysql = require('mysql');
var router = express.Router();


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