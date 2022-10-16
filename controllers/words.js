var mysql = require('mysql');
const Sequelize = require("../db.connection");
const {Op} = require('sequelize');

const Word = require("../models/word.model")(Sequelize.connection, Sequelize.library);

exports.getWordsTheme = (req, res) => {
    var condition = {where: {Theme: {[Op.like]: req.params.theme}}}

    Word.findAll(condition)
        .then(data => {
            res.send(data[Math.floor(Math.random()*data.length)]);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving words."
            });
        });
}

exports.getAll = (req,res) => {
    Word.findAll().then(data => {res.send(data);})
}

//Get random word from the theme (using SQL language)
function WordsTheme(req, res){
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
    /* Get all value from the table Word which has the Theme chosen */ 
    connection.query('SELECT Name FROM DatabaseWordPanic.Word WHERE DatabaseWordPanic.Word.Theme = "'+req.params.theme+'"',
    function(err, rows, fields) {
        if (err) throw err;
        res.status(200);
        res.send(JSON.stringify({response:rows[Math.floor(Math.random()*rows.length)]}));
        });
    
    /* Ends the connection with the database */
    connection.end;

}
