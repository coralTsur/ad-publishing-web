var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');

const db = require('./models/index');
//create the tables if don't exist
db.sequelize.sync()
    .then(()=> {
      console.log('Database Synced');
      return Promise.all([
        db.User.findOrCreate({
          where: {userName: 'admin'},
          defaults: {userName: 'admin', password: 'admin'}
        })])
    })
    .then(()=>    {
      return Promise.all([
        db.User.findOrCreate({
          where:{userName:'admin2'},
          defaults:{userName:'admin2', password:'admin2'}
        })

      ])  })
    .then(()=>{
      console.log("Admin user created");
    }).catch((err)=>{
  console.log(err);
});

var indexRouter = require('./routes/index');
var formRoute = require('./routes/formhandler');
var adminRoute = require('./routes/loginhandler');
var newAdRoute = require('./routes/newadhandler');
var apiRouter = require('./routes/api');
var apiAdminRouter = require('./routes/apiAdmin');



var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret:"reutCoralKey",
  resave: false, // Force save of session for each request
  saveUninitialized: false, // Save a session that is new, but has not been modified
  cookie: {maxAge: 10*60*1000 },// milliseconds!
  isAdmin: false
}));
app.use('/admin-area/api-admin', (req,res,next)=>{
  if(!req.session.isAdmin){
    return  res.render('login',{message: ""});
  }
  next();
});




app.use('/', indexRouter);
app.use('/action', formRoute);
app.use('/admin-area', adminRoute);
app.use('/admin-area/api-admin', apiAdminRouter);
app.use('/new-ad', newAdRoute);
app.use('/api', apiRouter);


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


