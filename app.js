var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var authRouter = require('./routes/auth');
var scoreRouter = require('./routes/score');
var wordsRouter = require('./routes/words');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors({
  origin: 'http://68.234.224.24'
}));

app.listen(3001, () => {
  console.log("Example app listening at port 3001!");

})

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/auth', authRouter);
app.use('/score', scoreRouter);
app.use('/words', wordsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

/* BEGIN db initialization */
const Op = {}
const dbConfig = require("./db.config.js");
const Sequelize = require("sequelize");
const connection = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  pool: dbConfig.pool
});
/* END db initialization */

/* Synchronize database and add relationships */
const Theme = require("./models/theme.model")(connection, Sequelize);

const Score = require("./models/score.model")(connection, Sequelize);

const User = require("./models/user.model")(connection, Sequelize);

const Word = require("./models/word.model")(connection, Sequelize);

const Session = require("./models/session.model")(connection, Sequelize);

Theme.hasMany(Score, {as:"scores", foreignKey:"Theme"});
Theme.hasMany(Word, {as:"words", foreignKey:"Theme"});


Score.belongsTo(Theme, {as:"theme", foreignKey:'Theme'})
Score.belongsTo(User, {as:"owner", foreignKey:'Id_Person'})
Score.sync({ force: false, alter: true });

User.hasMany(Score, {as:"score", foreignKey:"Id_Person"});
User.sync({ force: false, alter: true });

Word.belongsTo(Theme, {as:"theme", foreignKey:'Theme'});
Word.sync({ force: false, alter: true });

Session.belongsTo(User, {as: "user", foreignKey: "userId"});
Session.sync({ force: false, alter: true });

module.exports = app;
