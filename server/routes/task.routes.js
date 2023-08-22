const express=require("express");
const { auth } = require("../middlewares/auth.middleware");

const taskRouter=express.Router();


taskRouter.get("/",auth,(req,res)=>{
    res.send("all tasks") ;
})




module.exports ={taskRouter}