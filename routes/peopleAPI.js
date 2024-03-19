var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
const {collection} = require("../mongo.js");
const userMap = {};



// const cors = require("cors");
// app.use(cors({
// origin:'http://165.22.54.234:3000'}))

router.get("/", async function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  usernames = [];

  const all = await collection.find({}, "username");

  all.forEach((user) => {
    userMap[user.email] = user;
    usernames.push(user._doc.username);
  });
  return res.json(usernames);
});

module.exports = router;
