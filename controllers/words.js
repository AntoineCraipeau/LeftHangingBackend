var mysql = require('mysql');
const dbConfig = require("../db.config");
const Sequelize = require("sequelize");
const {Op} = require('sequelize');

/* BEGIN db initialization */
const connection = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});
const Word = require("../models/word.model")(connection, Sequelize);
const Theme = require("../models/theme.model")(connection, Sequelize);

exports.getWordsTheme = (req, res) => {
    var condition = {where: {Theme: {[Op.like]: req.params.theme}}}
    var include = {include: Theme}

    Word.findAll(condition)
        .then(data => {
            res.send(data[Math.floor(Math.random()*data.length)]);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving users."
            });
        });
}

exports.getAll = (req,res) => {
    Word.findAll().then(data => {res.send(data);})
}

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
