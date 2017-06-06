// // Main starting point of the application
// const express = require('express');
// const http = require('http');
// const bodyParser = require('body-parser');
// const morgan = require('morgan');
// const app = express();
// const router = require('./router');
// const mongoose = require('mongoose');
// const cors = require('cors');

// // DB Setup
// mongoose.connect('mongodb://localhost:auth/auth');

// // App Setup
// app.use(morgan('combined'));
// app.use(cors());
// app.use(bodyParser.json({ type: '*/*' }));
// router(app);

// // Server Setup
// const port = process.env.PORT || 3090;
// const server = http.createServer(app);
// server.listen(port);
// console.log('Server listening on:', port);

//===============================

var express = require('express');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');

var routes = require('./routes/index');
var users  = require('./routes/users');
// var articles  = require('./routes/articles');
// var contact  = require('./routes/contact');
// var adminReact  = require('./routes/admin-react');

const cors = require('cors');
const morgan = require('morgan');

// global settings
var env  = process.env.NODE_ENV || "development";
// var config  = require(__dirname + '/config.json')[env];

//express() returns a function and stores it in app.
var app = express();

// // App Setup
app.use(morgan('combined'));
app.use(cors());
app.use(bodyParser.json());
// app.use(bodyParser.json({ type: '*/*' }));
app.use(bodyParser.urlencoded({ extended: false }));
// this line must be immediately after express.bodyParser()!
//app.use(expressValidator([options]));
app.use(expressValidator());

//routes
// app.use('/admin-react', adminReact);
app.use('/users', users);
// app.use('/articles', articles);
// app.use('/contact', contact);
app.use('/', routes);

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;