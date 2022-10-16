module.exports = (sequelize, Sequelize) => {
    const Theme = sequelize.define("Theme", {
        Theme: {
            type: Sequelize.STRING,
            primaryKey:true
        }
    }, { timestamps: false });
    return Theme;
};