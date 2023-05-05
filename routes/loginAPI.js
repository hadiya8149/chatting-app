var express = require("express");
var cors = require('cors');
var router = express.Router();
var mongoose = require("mongoose")
const collection = require('../mongo.js')
const userExists = async (email) => {
  const isUser = await collection.exists({ email: email });

  return isUser;
}

var corsOptions = {
  origin: 'http://165.22.54.234',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
router.get('/', function (req, res, next) {
  res.send("login page api loaded")
  res.setHeader('Access-Control-Allow-Origin', '*');
});
router.post('/', async function (req, res, next) {
// res.header("Access-Control-Allow-Origin", "http://165.22.54.234");
// res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept" )  ;
// next();
  const data = {
    email: req.body.email,
    password: req.body.password
  }
  console.log(data)
  const a = await userExists(req.body.email)
  if (a){
    return res.json(200);
  }
  else{
    return res.json(401)
  }
  
})
module.exports = router;
