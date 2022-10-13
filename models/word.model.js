module.exports = (sequelize, Sequelize) => {
    const Word = sequelize.define("Words", {
        Name: {
            type: Sequelize.STRING,
            primaryKey: true
        },
        picture: {
            type: Sequelize.STRING
        },
        Theme:{
            type:Sequelize.STRING
        }
    }, { timestamps: false });
    /*
    Word.associate = models =>{
        Word.belongsTo(models.Theme, {foreignKey: 'Theme'});
    }
    sequelize.sync({ force: false, alter: true });
    */
    return Word;
};