var express = require("express");
var router = express.Router();
// var msg_collection = require("../conversations.js")

  
router.get('/', function(req, res, next){
    // const msg_history = msg_collection.find();
    console.log(req.cookie)
})
router.post('/', async function(req, res, next){
    // msg=req.body.message,
    // user_id = res.cookie("token")
    // msg_collection.insert(msg)
})
module.exports =router;