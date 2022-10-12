var mysql = require('mysql');
var nodemailer = require('nodemailer');

function getLogin(req, res){
    /* Connecting to database */
    var connection = mysql.createConnection({
        host     : "wordpanic-database-1.cnmskxwcoqjq.us-east-2.rds.amazonaws.com",
        user     : "admin",
        password : "wordpanicdatabasepassword2002",
        port     : 3306
    }); 
    connection.connect(function(err) {
    if (err) {
        console.error('Database connection failed: ' + err.stack);
        return;
    }
    console.log('Connected to database.');
    });
    /* Get the password value of the chosen email */ 
    connection.query('SELECT Password FROM DatabaseWordPanic.Person WHERE DatabaseWordPanic.Person.Email = "'+req.body.email+'"',
    function(err, rows, fields) {
        if (err) throw err;
        res.send(JSON.stringify(rows));
        if(rows[0].Password == req.body.password){
            res.status(200);
            console.log("Password Matched");
        }
        else{
            res.status(401);
            console.log("Wrong Password");  
        }
    });
    /* Ends the connection with the database */
    connection.end;

}


function registerNewUser(req, res){

    /* Connecting to database */
    var connection = mysql.createConnection({
        host     : "wordpanic-database-1.cnmskxwcoqjq.us-east-2.rds.amazonaws.com",
        user     : "admin",
        password : "wordpanicdatabasepassword2002",
        port     : 3306
    }); 
    connection.connect(function(err) {
    if (err) {
        console.error('Database connection failed: ' + err.stack);
        return;
    }
    console.log('Connected to database.');
    });

    /* Get the password value of the chosen email */ 
    connection.query('SELECT * FROM DatabaseWordPanic.Person WHERE DatabaseWordPanic.Person.Email = "'+req.body.email+'"',
    function(err, rows, fields) {
        try{
            if(rows[0].Email == req.body.email){
                res.status(401);
                res.send({response: "Account already created"});
            }
        }catch(err){
            res.status(200);
            /* Get all value from the table Word which has the Theme chosen */ 
            connection.query('INSERT INTO DatabaseWordPanic.Person (Email,Username,Password) VALUES ("' + req.body.email+'","' +req.body.username + '","'+req.body.password+'")',
            function(err, rows, fields) {
                if (err) throw err;
                /* Send Confirmation email */
                sendConfirmationMail(req, res);
            })
            res.send({response: "Account successfully created"});
        };
    });


    
    /* Ends the connection with the database */
    connection.end;
    

}

function sendConfirmationMail(req, res){
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
    to: req.body.email,
    subject: 'Confirmation of Account creation',
    text: 'Hi ' + req.body.username +",",
    html:'Hi '+ req.body.username + ',' + '<br><p>Thanks again for creating an account on WordPanic.</p> <p>Follow this link to begin your WordPanic adventure!'
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

    res.status('200');
    res.send({success:"account created"});
}

/* Exports methods to other files  */
module.exports = {
    getLogin,
    registerNewUser
};