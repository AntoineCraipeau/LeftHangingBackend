module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("Person", {
        Id_Person:{
            type: Sequelize.BIGINT,
            primaryKey:true
        },
        Username: {
            type: Sequelize.STRING
        },
        Email: {
            type: Sequelize.STRING
        },
        Password: {
            type: Sequelize.STRING
        }
    }, { timestamps: false });
    return User;
};