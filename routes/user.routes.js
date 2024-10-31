const express=require('express');
const userModel=require('../models/user.model');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const auth=require('../middleware/auth')
const router=express.Router();

router.post('/register',async(req,res)=>{
    try {
        const {name,email,username,password}=req.body;
        if(!name||!email||!username||!password){
            return res.status(400).send("ALL fields are mandatory")
        }
        let user=await userModel.findOne({email});
        if(user){
            return res.status(400).send({message:'Email Id already registered'})
        }
        user=await userModel.findOne({username});
        if(user){
            return res.status(400).send({message:'Username is already taken by someone'})
        }
        const hashPwd=await bcrypt.hash(password,10);
        const newUser=new userModel({name,email,username,password:hashPwd});
        const resp=await newUser.save();
        res.status(201).send({message:'User Registered successfully'});
    } catch (error) {
        console.log(error);
        res.status(500).send({message:'Internal Server Error'})
    }
})
router.post('/login',async(req,res)=>{
    try {
        const {email,password}=req.body;
        if(!email||!password){
            return res.status(400).send({message:'All fields are mandatory'})
        }
        let user=await userModel.findOne({email});
        if(!user){
            return res.status(400).send({message:'This email Id is not registered with us'})
        }
        const match=await bcrypt.compare(password,user.password);
        if(match){
            const payload={id:user._id,name:user.name,email:user.email};
            const token=await jwt.sign(payload,process.env.JWT_SECRET)
            return res.status(200).send({message:'LOGIN successfully',token})
        }else{
            return res.status(500).send({message:'Invalid credentials'})
        }
        
    } catch (error) {
        console.log(error);
        res.status(500).send({message:"Internal server error"})
        
    }
})
router.get('/profile',auth,async(req,res)=>{
    const data=req.user;
    res.send({message:'Welcome to your profile',data})
})
module.exports=router;