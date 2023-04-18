const mongoose = require("mongoose");


const Schema = mongoose.Schema;
const newUserSchema = new mongoose.Schema({
    name: {
           type: String,
        },

    email: {
            type: String,
    
    },
    password: {
            type: String,

        
    },
    age: {
        type: Number,
        default: 0,
    },
    role: { 
        type: String,
    }
});

const newUser = mongoose.model("newUser",newUserSchema);
module.exports = newUser;