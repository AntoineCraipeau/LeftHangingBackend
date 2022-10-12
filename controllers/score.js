var mysql = require('mysql');

function getDatabaseScore(req,res){
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

    /* Get all scores with their usernames from database from the chosen theme */ 
    connection.query('SELECT Score, Username FROM DatabaseWordPanic.Score, DatabaseWordPanic.Person WHERE DatabaseWordPanic.Score.Id_Person = DatabaseWordPanic.Person.Id_Person AND DatabaseWordPanic.Score.Theme = "'+req.params.theme+'"', 
    function(err, rows, fields) {
        if (err) throw err;
        res.status(200);
        res.send(JSON.stringify(rows))
        });
    
    /* Ends the connection with the database */
    connection.end;

}

function postScore(req, res){
    var date = new Date();
    var currentDate = date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate();
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

    /* Post Score to database */ 
    connection.query('INSERT INTO DatabaseWordPanic.Score (Score,Moment,Theme, Id_Person) VALUES ("' + req.body.score+'","' +currentDate + '","'+req.params.theme+'","'+1+'")', 
    function(err, rows, fields) {
        if (err) throw err;
        res.status(200);
        res.send({response:"Score successfully sent"});
        });

    /* Ends the connection with the database */
    connection.end;
}
/* Exports methods to other files  */
module.exports = {
    getDatabaseScore,
    postScore,
};