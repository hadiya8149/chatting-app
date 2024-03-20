var mongoose = require("mongoose")
const {Schema}=mongoose;

require('dotenv').config()
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("mongodb connected")
    })
    .catch((error) => {
        console.log('failed connection from mongodb')
        console.log(error)
    })



const LogInSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

const ConversationSchema = new Schema({
    user_id:{
        type: String,
        required: true
    },
    message:{
        type:String,
        required:true,
    },
    username:{
        type:String,
        required:true
    },
    created_at:{
        type:Date,
        required:true,
    }
});
const msg_collection =  mongoose.model("conversations", ConversationSchema);


const collection =  mongoose.model("Collection1", LogInSchema)
console.log(LogInSchema._id instanceof mongoose.Types.ObjectId);
console.log(ConversationSchema._id instanceof mongoose.Types.ObjectId)

module.exports = {collection, msg_collection}