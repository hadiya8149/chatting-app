var createError = require('http-errors');
const uuid = require('uuid');

var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session=require('express-session');
const PORT = process.env.PORT || 9000;
const http=require('http')
var indexRouter = require('./routes/index');
var loginAPIRouter = require('./routes/loginAPI');
var logoutAPIRouter = require('./routes/logoutAPI');
var signupAPIRouter = require("./routes/signupAPI");
var peopleAPIRouter = require("./routes/peopleAPI")
var chatAPIRouter = require("./routes/chat_api");

var app = express();
const MAX_AGE = 1000 * 60 * 60 * 3; // Three hours

const sessionMiddleware=session({
  secret:"SECRET_SESSION",
  resave: true,
  saveUninitialized: true,
  cookie:{
    maxAge:MAX_AGE,
    sameSite:'None',
  }
})

app.use(sessionMiddleware)


const cors = require("cors");
app.use(cors({
origin:'http://localhost:3000',
  methods:["GET", "POST", "PUT", "DELETE"],
  credentials:true,
  },
))


const server = http.createServer(app);
const {Server} = require("socket.io")
const io = new Server(server, {cors:{
  origin:"http://localhost:3000",
  credentials:true
}})


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(express.json())
app.use(logger('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use("/api/loginAPI", loginAPIRouter);
app.use("/api/signupAPI", signupAPIRouter);
app.use("/api/peopleAPI", peopleAPIRouter);
app.use("/api/chat_api",chatAPIRouter);
app.use("/api/logoutAPI", logoutAPIRouter);
app.set('trust proxy', 1)

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
io.engine.use(sessionMiddleware);

io.on("connection", (socket) => {
  const req = socket.request;
  const count = io.engine.clientsCount;

  console.log(count);
  const session = socket.request.session;

  const sessionID=socket.request.session.id;
  console.log("SESSION", sessionID)

  console.log("client connected:", socket.id);
  // socket.join(req.session.id)
  console.log(socket.rooms)
  socket.onAny((event, ...args) => {
    console.log(event, args);
  });

  socket.emit("session", {
    sessionID: socket.sessionID,
    userID: socket.userID,
  });
  socket.on("disconnect", (reason) => {
    console.log("reason", reason);
  })
  socket.on("chat message", (msg) => {
    console.log("message: " + msg.message);
    io.emit("chat message", msg);
  });
});
server.listen(PORT, ()=>{
  console.log('server running on port', PORT)
})

module.exports = app;
