var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
const collection = require("../mongo.js");
const userMap = {};

const http = require("http");

const socketIo = require("socket.io");
const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 5000;
var cors = require("cors");
app.use(cors());

const io = socketIo(server, {
  cors: {
    orgin: "http://localhost:3000/",
  },
});

router.get("/peopleAPI", async function (req, res, next) {
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
app.use("/api", router);
var clients = 0;

io.on("connection", (socket) => {
  clients++;
  console.log(clients);
  io.sockets.emit("broadcast", {
    description: clients + "clients connected",
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

server.listen(PORT, (err) => {
  if (err) console.log(err);
  console.log("server running on port", PORT);
});

module.exports = router;
