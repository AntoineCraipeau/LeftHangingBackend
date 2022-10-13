module.exports = {
    HOST: "wordpanic-database-1.cnmskxwcoqjq.us-east-2.rds.amazonaws.com",
    USER: "admin",
    PASSWORD: "wordpanicdatabasepassword2002",
    DB: "DatabaseWordPanic",
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};