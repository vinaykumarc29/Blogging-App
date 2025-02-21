const mongoose= require("mongoose");
const { schema } = require("./user");
 
const BlogSchema = new  mongoose.Schema({
    Title:{
        type:String,
        require:true,
    },
    body:{
        type:String,
        require:true,
    },
    coverImageUrl:{
        type:String
    },
    createdBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"USER",
    }
},{timestamps:true});

const BLOG = mongoose.model("blog",BlogSchema);

module.exports = BLOG