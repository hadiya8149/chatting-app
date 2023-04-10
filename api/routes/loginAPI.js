var express = require("express");
var router = express.Router();
var mongoose = require("mongoose")
const collection = require('../mongo.js')
const userExists = async (email) => {
  const isUser = await collection.exists({ email: email });

  return isUser;
}


router.get('/', function (req, res, next) {
  res.send("login page api loaded")
});
router.post('/', async function (req, res, next) {
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