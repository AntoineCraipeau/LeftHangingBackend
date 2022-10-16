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

