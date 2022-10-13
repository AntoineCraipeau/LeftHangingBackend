module.exports = (sequelize, Sequelize) => {
    const Theme = sequelize.define("Theme", {
        Theme: {
            type: Sequelize.STRING,
            primaryKey:true
        }
    }, { timestamps: false });
    Theme.associate = models =>{
        Theme.hasMany(models.Score);
        Theme.hasMany(models.Words);
    }
    sequelize.sync({ force: false, alter: true });
    return Theme;
};