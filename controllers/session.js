/* BEGIN db initialization */
const { Op } = require("sequelize");
const { v4: uuidv4 } = require('uuid');
const moment = require('moment');
const Sequelize = require("../db.connection");
const Session = require("../models/session.model")(Sequelize.connection, Sequelize.library);

/* END db initialization */

// Create session for user
exports.create = async (id) => {

    let validity =  moment().add(25,'minutes').format()
    const obj = {
        token: uuidv4(),
        validUntil: validity,
        Id_Person: id
    };

    // Save in the database
    var result = {};
    await Session.create(obj)
        .then(data => {
            result = data
        })
        .catch(e => {
            console.log("error", e)
        });
    return result;
};

// Get session by user id
exports.findByUserId = async (id) => {
    var condition = id ? { Id_Person: { [Op.eq]: id } } : null;
    var result = {};
    await Session.findOne({ where: condition })
    .then(data => {
        result = data
    })
    .catch(e => {
        console.log("Error", e)
    })
    return result
};

// Get session by token
exports.findByToken = async (token) => {
    var condition = token ? { token: { [Op.eq]: token } } : null;
    var result = {};
    await Session.findOne({ where: condition })
    .then(data => {
        result = data
    })
    .catch(e => {
        console.log("Error", e)
    })
    return result
};

exports.deleteExpiredToken = async () => {
    var currentDate = moment().format();
    var condition = {where: {validUntil: {[Op.lte]: currentDate}}}
    await Session.findAll(condition)
    .then(data => {
        for(var i=0; i<data.length; i++){
            this.delete(data[i].id)
        }
    })
}

// Delete a record with a certain id
exports.delete = (id) => {
    Session.destroy({
        where: { id: id }
    })
};