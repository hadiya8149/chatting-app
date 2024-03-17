var mongoose = require("mongoose")
require('dotenv').config()
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("monodb connected")
    })
    .catch(() => {
        console.log('failed')
    })
const ConversationSchema = new mongoose.Schema({
    user_id:{
        type: String,
        required: true
    },
    message:{
        type:String,
        required:true,
    },
    created_at:{
        type:Date,
        required:true,
    }
});
const msg_collection = new mongoose.model("Conversations", ConversationSchema);

module.exports = msg_collection;