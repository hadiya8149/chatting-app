var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session=require('express-session');
const bcrypt = require('bcrypt'); // For password hashing
const jwt=require("jsonwebtoken");
const PORT = process.env.PORT || 9000;

var indexRouter = require('./routes/index');
var loginAPIRouter = require('./routes/loginAPI')
var signupAPIRouter = require("./routes/signupAPI");
var peopleAPIRouter = require("./routes/peopleAPI")
var chatAPIRouter = require("./routes/chat_api");
var app = express();
app.use(express.json());

const http=require('http'
)
const server = http.createServer(app);
const {Server} = require("socket.io")
const io = new Server(server, {cors:{
  origin:"http://localhost:3000"
}})

const cors = require("cors");
app.use(cors({
origin:'http://localhost:3000',
  methods:["GET", "POST", "PUT", "DELETE"],
  credentials:true,
  },
))

app.use(express.json())
app.use(cookieParser());
app.use(session({
  'secret':'secret',
  resave: false,
  saveUninitialized: false,
  cookie:{
    secure:false,
    maxAge: 1000*60*60*24
  } //set the session cookie properties
}))
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
app.use("/api/peopleAPI", peopleAPIRouter);
app.use("/api/chat_api",chatAPIRouter);
// catch 404 and forward to error handler

app.use(function(req, res, next) {
  next(createError(404));
});

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,UPDATE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
  next();
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
io.engine.on("connection_error", (err) => {
  console.log(err.req);      // the request object
  console.log(err.code);     // the error code, for example 1
  console.log(err.message);  // the error message, for example "Session ID unknown"
  console.log(err.context);  // some additional error context
});
io.on("connection", (socket) => {
  const count = io.engine.clientsCount;

  console.log(count);
  io.sockets.emit("broadcast", {
    description: count + "clients connected",
  });
  console.log("client connected:", socket.id);
  socket.on("disconnect", (reason) => {
    console.log("reason", reason);
  });
  socket.on("chat message", (msg) => {
    console.log("message: " + msg);
    io.emit("chat message", msg);
  });
});
server.listen(PORT, ()=>{
  console.log('server running on port', PORT)
})


module.exports = app;
