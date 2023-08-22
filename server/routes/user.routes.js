const express=require("express");
const { register } = require("../controllers/user.controllers");

const userRouter=express.Router();


userRouter.post("/register",register)

userRouter.post("/login",(req,res)=>{
    res.send("login")
})


module.exports ={userRouter}