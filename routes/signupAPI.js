var express = require("express");
var router = express.Router();
const collection = require('../mongo.js')

router.get('/',  function(req, res, next){
    res.send("signup page api loaded")
});

router.post('/', async function (req, res, next){
    const data ={
    username:req.body.username,
    email:req.body.email,
    username:req.body.username,
    password:req.body.password,

}
    await collection.insertMany([data]);
});

module.exports=router;