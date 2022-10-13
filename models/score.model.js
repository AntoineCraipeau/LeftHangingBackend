module.exports = (sequelize, Sequelize) => {
    const Score = sequelize.define("Score", {
        Id_Score:{
            type: Sequelize.INTEGER,
            primaryKey:true
        },
        Score: {
            type: Sequelize.INTEGER
        },
        Moment:{
            type: Sequelize.STRING
        }
    }, { timestamps: false });
    Score.associate = models =>{
        Score.belongsTo(models.User);
        Score.belongsTo(models.Theme);
    }
    sequelize.sync({ force: false, alter: true });
    return Score;
};