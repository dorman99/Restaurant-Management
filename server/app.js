var express = require('express');
var logger = require('morgan');
var bodyParser = require('body-parser');
var redis = require('redis');
var client = redis.createClient();
var cors = require('cors')
var users = require('./routes/users');
var dishes = require('./routes/dishes');
var signup = require('./routes/signup')
var login = require('./routes/login')
var chef = require('./routes/chef')
var orderFood = require('./routes/orderFood')
var app = express();

client.on('connect', function (err) {
  console.log('redis connected')
})

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors())
app.use('/chef',chef)
app.use('/users', users);
app.use('/dishes', dishes);
app.use('/signup',signup)
app.use ('/login',login)
app.use('/orderFood',orderFood)
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send('error');
});

module.exports = app;
