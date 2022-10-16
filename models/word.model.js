module.exports = (sequelize, Sequelize) => {
    const Word = sequelize.define("Words", {
        Name: {
            type: Sequelize.STRING,
            primaryKey: true
        },
        Picture: {
            type: Sequelize.STRING
        },
        Theme:{
            type:Sequelize.STRING
        }
    }, { timestamps: false });
    return Word;
};