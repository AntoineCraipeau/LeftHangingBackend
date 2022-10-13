module.exports = (sequelize, Sequelize) => {
    const Score = sequelize.define("Score", {
        Id_Score:{
            type: Sequelize.BIGINT,
            primaryKey:true
        },
        Score: {
            type: Sequelize.INTEGER
        },
        Moment:{
            type: Sequelize.DATE
        }
    }, { timestamps: false });
    /*
    Score.associate = models =>{
        Score.belongsTo(models.User);
        Score.belongsTo(models.Theme);
    }
    sequelize.sync({ force: false, alter: true });
    */
    return Score;
};