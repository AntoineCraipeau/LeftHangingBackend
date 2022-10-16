var mysql = require('mysql');
const Sequelize = require("../db.connection");
const {Op} = require('sequelize');

const Word = require("../models/word.model")(Sequelize.connection, Sequelize.library);

/* Get a random word from the chosen theme from the database */
exports.getWordsTheme = (req, res) => {
    //Condition if the Theme in the database is the same as the chosen one
    var condition = {where: {Theme: {[Op.like]: req.params.theme}}}

    Word.findAll(condition)
        .then(data => {
            //Send a random word from the word list
            res.send(data[Math.floor(Math.random()*data.length)]);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving words."
            });
        });
}

//Get all the words from the database
exports.getAll = (req,res) => {
    Word.findAll().then(data => {res.send(data);})
}

