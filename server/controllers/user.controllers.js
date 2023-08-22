const { User } = require("../models/user.model");
const bcrypt=require("bcrypt");


// register user and hashing the password 
const register=async(req,res)=>{
    const {username,password,email}=req.body;
    try{

        const existingUser=await User.findOne({email});
        if(existingUser){
            return res.status(400).json({message:"user already registered"})
        }
        const hashedPassword= await bcrypt.hash(password,10);
        const user=await new User({email,password:hashedPassword,username});
        user.save();
        res.status(201).json({message:"user registered successfully",data:user})

    }catch(error){
       console.log(error);
       res.status(500).json({message:"Registration Failed"})
    }
}

module.exports = {register}