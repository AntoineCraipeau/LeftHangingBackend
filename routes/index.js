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

module.exports = router;
