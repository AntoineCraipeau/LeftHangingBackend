module.exports = (sequelize, Sequelize) => {
    const Session = sequelize.define("session", {
        token: {
            type: Sequelize.STRING
        },
        validUntil: {
            type: Sequelize.DATE
        },
        Id_Person: {
            type: Sequelize.BIGINT
        }
    }, { timestamps: false });

    return Session;
};