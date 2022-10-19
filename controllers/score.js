const Sequelize = require("../db.connection");
const {Op} = require('sequelize');

const Score = require("../models/score.model")(Sequelize.connection, Sequelize.library);

const session = require('./session');
const users = require("./users");

/* Send to the front-end the 10 best scores of a theme */
exports.findAll = (req, res) => {
    //Condition if the Theme is the same as the front-end theme
    var condition = {where: {Theme: {[Op.like]: req.params.theme}}}
    //Create a empty list
    var list = [];
    Score.findAll(condition)
        .then(data => {
            // Enter loop for each item in the score table with the chosen Theme
            for(var i=0; i<data.length; i ++){
                // For each item, use the function createScoreUsername to push the data in the list
                users.createScoreUsername(data[i].Id_Person, data[i].Score, data[i].Moment, list)
                .then(
                    (listScore) => {
                        if(listScore.length == data.length){
                            listScore.sort(function(a, b){return b.Score - a.Score});
                            if(listScore.length>10){
                                listScore.length = 10;
                            }
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

/* Send a score from the user to the database */
exports.postScore = (req, res) => {
    var date = new Date();
    var currentDate = date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate();

    session.findByToken(req.get("authorization")).then((session)=>{
        //If connected then
        if(session){
            // Create a Score
            const score = {
                Score: req.body.score,
                Moment: currentDate,
                Theme: req.params.theme,
                Id_Person: session.Id_Person
            };
            
            // Send score to database
            Score.create(score)
                .then(data =>{
                    res.send(data);
                })
                .catch(err => {
                    res.status(500).send({
                        message:
                            err.message || "Some error occurred while sending the Score."
                    });
                }
            );
        }
        else{
            res.status(401).send({
                message:
                    err.message || "Error: You are not connected"
            });

        }
    })
}

/* Send the best score from a theme and from a user to the front-end */
exports.getUserBestScore = (req, res) =>{
    session.findByToken(req.get("authorization")).then((session)=>{
        //If connected then
        if(session){
            //Find the user by it's id
            users.findUsernamebyId(session.Id_Person)
            .then((username)=>{
                var condition = {where: {
                    [Op.and]: [
                        {Id_Person: {[Op.like]: session.Id_Person}},
                        {Theme: {[Op.like]: req.params.theme}}
                    ]
                }};
                Score.findAll(condition)
                .then((data)=>{
                    data.sort(function(a, b){return b.Score - a.Score});
                    // Create a Score Board
                    score_item= {
                        Score: data[0]?data[0].Score:"Never played",
                        Moment: data[0]?data[0].Moment:"Never played",
                        Username: username.Username
                    }
                    //Send score board to front-end
                    res.send(score_item);  
                })
            });
        }else{
            res.status("401");
            res.send("Error: You are not connected.")
        }
    })
}

