var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var catalogRouter = require('./api/catalog');
const mongoose = require('mongoose');
var configDb = require('./config/database');
const cors = require('cors');

var app = express();
// Header cross origin
var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// On importe la config puis on connecte via la propriété "database"
mongoose.connect(configDb.database, {
  useNewUrlParser: true
});
mongoose.set('useFindAndModify', false);
let db = mongoose.connection;

// Controle de la connexion
db.once('open', () => {
  console.log('Connecté à MongoDB app');
});

// Controle des erreurs DB (déjà configurées dans MongoDB)
db.on('error', (err) => {
  console.log(err);
});

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter); //adresse par défaut :  / correspond au fichier index
app.use('/users', usersRouter); //adresse /user correspond au fichier users dont le path est spécifié dans la var usersRouter
app.use('/catalog', catalogRouter);


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

module.exports = app;
