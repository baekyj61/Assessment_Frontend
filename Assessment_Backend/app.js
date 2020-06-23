const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");

require('dotenv').config();

app.use(bodyParser.urlencoded({extended: false }));
app.use(bodyParser.json());

app.use(cors());

require('./server/routes')(app);

// Test if DB has been connected.
const db = require("./server/models/index.js");
db.sequelize.authenticate().then(() => {
  console.log("DB Connected.");
}).catch(err => {
  console.log("Error " + err);
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
// no stacktraces leaked to user unless in development environment
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: (app.get('env') === 'development') ? err : {}
  });
});

console.log("APP RUNNING");
module.exports = app;
