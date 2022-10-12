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

    connection.query('SELECT * FROM DatabaseWordPanic.Score WHERE DatabaseWordPanic.Score.Theme = "'+req.params.theme+'"', 
    function(err, rows, fields) {
        if (err) throw err;
        res.send(JSON.stringify({response:rows}))
        });
    
    connection.end;

}
module.exports = {
    getDatabaseScore
};