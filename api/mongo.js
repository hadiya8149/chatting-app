// import config from "dotenv"
var mongoose =require("mongoose")
require('dotenv').config()
mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log("monodb connected")
})
.catch(()=>{
    console.log('failed')
})



const LogInSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

const collection = new mongoose.model("Collection1", LogInSchema)
module.exports=collection
