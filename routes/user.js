const {Router} = require("express");
const mongoose = require("mongoose");
const USER = require("../models/user");


const router = Router();

router.get("/signup",(req,res)=>{
    res.render("signup");
});

router.get("/login",(req,res)=>{
    res.render("login");
});

router.post("/signup",async (req,res)=>{
    const {FullName,Email,Password} = req.body;
    await USER.create({
    FullName,
    Email,
    Password
   });
   res.redirect("/")

});


router.post("/login",async (req,res)=>{
    const {Email,Password} = req.body;
    try {
        const token= await USER.MatchPasswordAndGeneratetoken(Email,Password);
    
        res.cookie("Token",token).redirect("/");
        
    } catch (error) {
        
        res.render("login",{
            error:"Invalid Password or Email"
        });
    }
});

router.get("/logout",(req,res)=>{
    res.clearCookie("Token").redirect("/");
});



module.exports= router;