const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StorySchema = new mongoose.Schema({
    user:{
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    newUser:{
        type: Schema.Types.ObjectId,
        ref: "newUser"
    },
    title:{
        type:String,
    },
});
const Story = mongoose.model("Story",StorySchema);
module.exports = Story;