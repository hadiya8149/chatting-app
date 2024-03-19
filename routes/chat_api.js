var express = require("express");
var router = express.Router();
var {msg_collection }=require("../mongo.js")
const jwt=require("jsonwebtoken");
var mongoose = require("mongoose")

router.get('/', async function(req, res, next){
    const msg_history = await msg_collection.find({}).exec()
    //load msg history and return it as an array with username msg and timestamp
    res.send({msg_history})
})
router.post('/', async function(req, res, next){
    const msg=req.body.data;
    const token = req.body.token
    const username=req.body.username
    let decoded = jwt.decode(token)
    const data={
        user_id:decoded.userId,
        message:msg,
        username:username,
        created_at:new Date()

    }
    await msg_collection.create(data)
    res.json(200)

})
module.exports =router;