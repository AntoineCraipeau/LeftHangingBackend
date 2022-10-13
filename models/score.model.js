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
    }, { timestamps: true });

    return Score;
};