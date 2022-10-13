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
    /*
    User.associate = models =>{
        User.hasMany(models.Score);
    }
    
    sequelize.sync({ force: false, alter: true });*/
    return User;
};