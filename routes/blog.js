const {Router} = require("express");
const router = Router();
const mongoose = require("mongoose");
const multer = require("multer");
const BLOG = require("../models/blog");
const path = require("path");




router.get("/AddBlog",(req,res)=>{
    res.render("addblog",{
        User:req.user
    });
});

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null,path.resolve("./public/uploads"));
    },
    filename: function (req, file, cb) {
      const fileName = `${Date.now()}-${file.originalname}`;
      cb(null,fileName);
    }
  })
  
  const upload = multer({storage});

router.post("/AddBlog",upload.single("coverImage"),async(req,res)=>{
    const {Title,body} =req.body;
    const coverImageUrl=`/uploads/${req.file.filename}`
    const Blog = await BLOG.create({
        Title,
        body,
        createdBy: req.user._id,
        coverImageUrl
    });
    res.redirect("/");
});

router.get("/:id",async(req,res)=>{
  const id = req.params.id
   const blog = await BLOG.findById(id);
   console.log(blog);
   res.render("Blog",{
    Blog:blog,
    User: req.user 
    });
})



module.exports = router
