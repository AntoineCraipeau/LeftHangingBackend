/* BEGIN db initialization */
const { Op } = require("sequelize");
const Sequelize = require("../db.connection");
const User = require("../models/user.model")(Sequelize.connection, Sequelize.library);
const session = require('./session');


// Get all records with a certain email (sent from the front-end)
exports.findByEmail = async (req, res) => {
    const email = req.body.Email;
    console.log(email);
    var condition = email ? { email: { [Op.eq]: email } } : null;

    var result;
    await User.findOne({ where: condition })
    .then(data => {
        result = data
    })
    .catch(data => {
        result = data
    })
    return result
};

// Get username from a certain Id
exports.findUsernamebyId = async (idPerson) => {
    const id = idPerson;
    var condition =  {where: {Id_Person: {[Op.like]: id}}};

    var result;
    await User.findOne(condition)
    .then(data => {
        result = data
    })
    .catch(data => {
        result = data
    })
    return result
};

// Create JSON for a score associated with it's username
exports.createScoreUsername = async (id, score, moment, list) => {
    let user = await this.findUsernamebyId(id);
    score_item= {
        Score: score,
        Moment: moment,
        Username: user.Username
    }
    list.push(score_item);
    return list;
};

// Send Personal info from Id_Person to Frontend
exports.findPersonalInfo = (req, res) => {
    session.findByToken(req.get("authorization")).then((session)=>{
        if(session){
            this.findUsernamebyId(session.Id_Person)
            .then((user)=>{
            personalInfo = {
                Username: user.Username,
                Email: user.Email,
            }
            res.send(personalInfo);
        })
        }else{
            res.status("401");
            res.send("Error: You are not connected.")
        }
        
    })
}


// Get all records with a certain name (sent from the front-end)
exports.findAll = (req, res) => {
    User.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving records."
            });
        });
};

// Get a record with a certain id (sent from the front-end)
exports.findOne = (req, res) => {
    const id = req.params.id;

    User.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find record with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving record with id=" + id
            });
        });
};

