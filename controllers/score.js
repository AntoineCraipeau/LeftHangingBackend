var mysql = require('mysql');
const Sequelize = require("../db.connection");
const {Op} = require('sequelize');

const Score = require("../models/score.model")(Sequelize.connection, Sequelize.library);

const session = require('./session');
const users = require("./users");

exports.findAll = (req, res) => {
    var condition = {where: {Theme: {[Op.like]: req.params.theme}}}
    //Create a empty list
    var list = [];
    Score.findAll(condition)
        .then(data => {
            // Enter loop for each item in the score table with the chosen Theme
            for(var i=0; i<data.length; i ++){
                // For eacht item, use the function createScoreUsername to push the data in the list
                users.createScoreUsername(data[i].Id_Person, data[i].Score, data[i].Moment, list).then(
                    (listScore) => {
                        /* If the number of item in the list is equal
                        to the number of score item of the chosen Theme,
                        then send to frontENd */
                        if(listScore.length == data.length){
                            res.send(listScore);
                        }
                    }
                ) 
            }
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving users."
            });
        });
}


exports.postScore = (req, res) => {
    var date = new Date();
    var currentDate = date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate();

    session.findByToken(req.get("authorization")).then((session)=>{
        // Create a Score
        const score = {
            Score: req.body.score,
            Moment: currentDate,
            Theme: req.params.theme,
            Id_Person: session.Id_Person
        };

        Score.create(score)
            .then(data =>{
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while sending the Score."
                });
            });
        })
}

// 
exports.getUserBestScore = (req, res) =>{
    session.findByToken(req.get("authorization")).then((session)=>{
        users.findUsernamebyId(session.Id_Person)
        .then((username)=>{
            var condition = {where: {Id_Person: {[Op.like]: session.Id_Person}}};
            Score.findAll(condition)
            .then((data)=>{
                data.sort(function(a, b){return a.Score - b.Score});
                // Create a Score Board
                score_item= {
                    Score: data[0].Score,
                    Moment: data[0].Moment,
                    Username: username
                }
                res.send(score_item);  
            })
        });
    })
}


//Get scores from a theme in the database using SQL language
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
//Post score in the database using SQL language
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
