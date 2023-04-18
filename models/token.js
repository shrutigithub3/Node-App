const mongoose = require("mongoose");
const TokenSchema = new mongoose.Schema({
    token:{
        type:String,
        unique:true,
    },
});
const Token = mongoose.model("token",TokenSchema);
module.exports = Token;