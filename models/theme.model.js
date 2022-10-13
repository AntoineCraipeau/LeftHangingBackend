module.exports = (sequelize, Sequelize) => {
    const Theme = sequelize.define("Theme", {
        Theme: {
            type: Sequelize.STRING,
            primaryKey:true
        }
    }, { timestamps: true });
    return Theme;
};