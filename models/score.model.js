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
        },
        Theme:{
            type:Sequelize.STRING
        },
        Id_Person:{
            type:Sequelize.BIGINT
        }
    }, { timestamps: false });
    return Score;
};