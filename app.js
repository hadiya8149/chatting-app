var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var loginAPIRouter = require('./routes/loginAPI')
var signupAPIRouter = require("./routes/signupAPI");
var peopleAPIRouter = require("./routes/peopleAPI")
var app = express();
var server = require('http').createServer(app);
const port = process.env.PORT || 9000;
var io = require('socket.io')

// const collection = require("mongoose")
const cors = require("cors");
app.use(cors({
origin:'http://165.22.54.234:3000'}))


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use("/api/loginAPI", loginAPIRouter);
app.use("/api/signupAPI", signupAPIRouter);
app.use("/peopleAPI", peopleAPIRouter);
// catch 404 and forward to error handler
var corsOptions = {
  origin: 'http://165.22.54.234',
  optionsSuccessStatus: 200 // dsome legacy browsers (IE11, various SmartTVs) choke on 204
}
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
app.listen(port, ()=>{
  console.log('server running on port', port)
})


module.exports = app;
