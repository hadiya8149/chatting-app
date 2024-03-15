var express = require("express");
var router = express.Router();
const collection = require('../mongo.js')
const bcrypt = require('bcrypt');
const saltRounds = 10;


router.get('/',  function(req, res, next){
    res.send("signup page api loaded")
});

router.post('/', async function (req, res, next){
    // hash a passowrd using bcrypt
    bcrypt.genSalt(saltRounds, function(err, salt){
        bcrypt.hash(req.body.password, salt, function(err, hash){

        const data ={
            username:req.body.username,
            email:req.body.email,
            username:req.body.username,
            password:hash,
        
        }
        collection.insertMany([data]);
        });
    })
    
    
});

module.exports=router;