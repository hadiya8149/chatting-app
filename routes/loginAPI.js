var express = require("express");
var cors = require('cors');
var router = express.Router();
var mongoose = require("mongoose")
const collection = require('../mongo.js')
var session=require('express-session');
var cookieParser = require('cookie-parser');
const jwt=require("jsonwebtoken");


require('dotenv').config();
const jwtSecret=process.env.JWT_SECRET;
const saltRounds = 10;

const bcrypt=require('bcrypt');
const userExists = async (email) => {
  const isUser = await collection.findOne({"email":email});

  return isUser;
}

router.get('/', function (req, res, next) {
  res.send("login page api loaded")
  res.setHeader('Access-Control-Allow-Origin', '*');
});
router.post('/', async function (req, res, next) {
  const data = {
    email: req.body.email,
    password: req.body.password
  }
  console.log(data)

  const a = await userExists(req.body.email)
  
  req.session.username=a.username;

  console.log(a.username)
  console.log(a.password)
  console.log(req.body.password)
  if (a){
    // const validPassword = await bcrypt.compare(req.body.password, a.password);
    bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
      if (err){
        throw err;

      }
      else{
        bcrypt.compare(req.body.password,hash , function(err, result) {
          if (err){
            throw err;
          }
          if (result) {
            const token = jwt.sign({ userId: a._id }, jwtSecret, { expiresIn: '1h' });
            res.cookie("token", token, {
              withCredentials: true,
              httpOnly: false,
            });
            user="user"
            res.cookie("username",a.username, {
              withCredentials:true, 
              httpOnly:false,
              secure:true,
              samesite:'lax',
              domain:"http://localhost:3000"
            })

            jwt.verify(token, jwtSecret, function(err, decoded){
              if(err){
                throw err;
              }
              else{

                  console.log("decoded user id",decoded.userId)

                  return res.json({token});
              }
            })
          } else {
            // response is OutgoingMessage object that server response http request
           
            return res.json({success: false, message: 'passwords do not match'});
          }
        });
      }
  });
  
  
  }
  else{
    return res.json({success: false, message: 'user not found'})
  }
  
})
module.exports = router;
