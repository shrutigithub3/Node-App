const ObjectID = require('mongodb').ObjectId;
const newUserModel=require('../models/newUser');
const otp = require('../models/otp');
const newTokenModel=require('../models/token');
const jwt  = require("jsonwebtoken");
const otpModel=require('../models/otp');
const nodemailer=require("nodemailer");


exports.formuser = (req,res)=>{
        const newUser = new newUserModel(req.body);
        try{
            newUser.save();
            res.status(200).send(newUser);
        }
        catch(error){
            res.status(500).send(error);
        }
    
     
    };
    exports.newusers =(req,res)=>{
            return res.sendFile(__dirname + '/index.html');
        } 

    exports.getuserId=async(req,res)=>{
        const _id = req.params.id;
        const newUser =await newUserModel.findById(_id);
        try{
            res.status(200).send(newUser);
            console.log(newUser);
        }catch(error){
            res.status(500).send(error);
        }
    };
        
    exports.putusers =async (req,res)=>{
        const update=req.body
        const newUser= await newUserModel.updateOne({_id:ObjectID(req.params.id)},{$set:update})
        console.log(newUser)
        try{
            res.status(200).send(newUser)
        }
        catch(error){
            res.status(500).send(error)
        }
    }

    exports.deleteusers=async(req,res)=>{
        console.log(req.params.id)
        const newUser=await newUserModel.deleteOne({_id:new ObjectID(req.params.id)})
        try{
            res.status(200).send(newUser)
        }
        catch(error){
            res.status(500).send(error)
        }
    }
    exports.SignIn = async (req,res)=>{
        const email = req.body.email;
        const password = req.body.password;
        try{
            const newUser=await newUserModel.findOne({email})
            console.log(newUser)
            if(!newUser){
                res.status(422).json({"message":"username or password is invalid"})
            }
            if(newUser.password==password){
                
            const token=jwt.sign({id:newUser.id},"sdjhyfsdhgfjak",{
            expiresIn:86400,

            })
        const get_token = newTokenModel({token})
        await get_token.save()
        return res.status(200).json({"email":newUser.email,"role":newUser.role,"age":newUser.age,"token":token})
        }
        else{
            res.status(422).json({"message":"username or password is invalid"})
        }
    }catch(error){
            console.log(error)
            res.status(500).send(error)
            
        }

        
        
    }
    exports.sendEmail = async (req,res)=>{ 
        const newUser=await newUserModel.findOne({email:req.body.email})
        const responseType={};
        if(newUser){
            let otpCode= Math.floor((Math.random()*10000)+1);
            let otpData= new otp({
                email:req.body.email,
                code:otpCode,
                expireIn:new Date().getTime()+ 300*1000 ,
            })
            let otpResponse=await otpData.save();
            responseType.statusText='Success';
            // mailer()
            responseType.message='Please check your email';
        }
        else{
            responseType.statusText='Error'
            responseType.message='Wrong Email id';

        }
        res.status(200).json(responseType);
    }

const mailer = (email,otp)=>{
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        requireTLS: true,
        auth: {
            user: 'kumrashruti3@gmail.com',
            pass: '123456'
        }
    });
    
    let mailOptions = {
        from: 'kumrashruti3@gmail.com',
        to: 'vi@gmail.com',
        subject: 'Test',
        text: 'Hello World!'
    };
    
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error.message);
        }
        console.log('success');
    });
}    
    


    
    