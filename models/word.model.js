module.exports = (sequelize, Sequelize) => {
    const Word = sequelize.define("Words", {
        Name: {
            type: Sequelize.STRING,
            primaryKey: true
        },
        picture: {
            type: Sequelize.STRING
        }
    }, { timestamps: true });

    return Word;
};