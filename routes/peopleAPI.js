var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
const collection = require("../mongo.js");
const userMap = {};

const app = express();
const PORT = process.env.PORT || 5000;
const {createServer} = require("http");
const {Server } = require("socket.io")
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors:{
    orgin:"http://165.22.54.234",
	methods:["GET","POST"]
  }
})

var corsOptions = {
  origin: 'http://165.22.54.234',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

var cors = require("cors");
app.use(cors());


router.get("/peopleAPI", cors(corsOptions), async function (req, res, next) {
  usernames = [];

  const all = await collection.find({}, "username");

  all.forEach((user) => {
    // console.log('user', user.json, typeof user)
    userMap[user.email] = user;
    console.log(user._doc.username);
    usernames.push(user._doc.username);
  });
  return res.json(usernames);
});
app.use("/", router);
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
httpServer.listen(5000, (err)=>{
  if(err) console.log(err);
  console.log("server listening on port 5000")
})
module.exports = router;
