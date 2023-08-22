const express=require("express");

const userRouter=express.Router();


userRouter.post("/register",(req,res)=>{
    res.send("register")
})

userRouter.post("/login",(req,res)=>{
    res.send("login")
})


module.exports ={userRouter}