var mysql = require('mysql');

function getWordsTheme(res, req){
    var word;
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
    connection.query('SELECT Name FROM DatabaseWordPanic.Word WHERE DatabaseWordPanic.Word.Theme = "'+req.params.theme+'"',
    function(err, rows, fields) {
        if (err) throw err;
        console.log(rows);
        word = rows[Math.floor(Math.random()*rows.length)];
        res.send(JSON.stringify({response:word}));
        });

    connection.end;

}
module.exports = {
    getWordsTheme
};