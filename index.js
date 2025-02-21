const express = require("express");
const path =require("path");
require("dotenv").config()
const cookieParser = require("cookie-parser");

const BLOG = require("./models/blog");

const UserRoute= require("./routes/user");
const BlogRoute = require("./routes/blog");

const app = express();
const PORT = 2000;

const mongoose =require("mongoose");
const CheckForAuthentication = require("./middleware/Authentication");
const { configDotenv } = require("dotenv");
mongoose.connect(process.env.MONGODB_LINK).then(()=> console.log("MongoDb Connected"))

app.set("view engine","ejs");
app.set("views",path.resolve("./views"));

app.use(express.static(path.resolve("./public")));
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());
app.use(CheckForAuthentication("Token"));


app.use("/user", UserRoute);
app.use("/blog",BlogRoute)

app.get("/",async(req,res)=>{
   const AllBlogs = await BLOG.find({});
   res.render("home",{
    Blogs:AllBlogs,
    User:req.user,
});
 

     
});
   



app.listen(PORT,()=>{console.log(`server started at port:${PORT}`)});

