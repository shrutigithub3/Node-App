const express = require("express");
const userModel = require('./models/user');
const storyModel = require('./models/story');
const newUserModel=require('./models/newUser');
const bodyParser = require('body-parser');
const userControllers=require('./controllers/newuser');
const cors = require("cors");
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({limit: '5000mb',extended:true,parameterLimit:100000000}));

app.post("/addUser",async(request,response)=>{
    const user = new userModel(request.body);
    try{
        await user.save();
        response.status(200).send(user);
    }catch(error){
        response.status(500).send(error);
    }
    }
);
app.post("/addUser_story",(request,response)=>{
    const user =  new userModel(request.body);
 
     try{
        user.save();
        const storydata = {
         user:user._id,
         title:"shruti story",
        }
        const story = new storyModel(storydata);
        try{
         story.save();
         response.send(story);
        }catch(error){
         response.status(500).send(error);
        }
 
        }catch(error){
         response.status(500).send(error);
        }
        
 
 });


app.get("/users",async(request,response)=>{
    const user = await userModel.find({});
    const userlen = user.length;

    try{
        response.send({userlen:userlen,users:user})
    }catch(error){
        response.status(500).send(error);
     }
});

app.get("/getUser_story",(request,response)=>{
    storyModel.findOne({title: "User first story"})
    .populate("user").then(story=>{
        response.send(story);
    });
})

app.post('/formuser',(req,res)=>{
    const newUser = new newUserModel(req.body);
    try{
        newUser.save();
        res.status(200).send(newUser);
    }
    catch(error){
        res.status(500).send(error);
    }
});
app.get("/newusers",async(request,response)=>{
    const newuser = await newUserModel.find({});
    const userlen = newuser.length;

    try{
        response.send(newuser)
    }catch(error){
        response.status(500).send(error);
     }
});

app.get('/fetchuser',(req,res)=>{
    return res.sendFile(__dirname + '/index.html');
})   


module.exports = app;
 