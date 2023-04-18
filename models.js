const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    age:{
        type:Number,
        default:0,
    },
    role:{
        type:String,
        required:true,
    }
});

const User = mongoose.model("User",userSchema);
module.exports = User;