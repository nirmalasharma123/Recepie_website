const mongoose = require("mongoose");

const recipePageSchema = new mongoose.Schema({

    page_name:{
        type:String,
        required:true,
        unique:true
    },
    page_description :{
        type:String,
        required:true,

    },
    page_post:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"recipe",
        required:true
    }],
    isDeleted :{
        type:Boolean,
        default:false
    },
},
{timestamps:true}
    
)

module.exports = mongoose.model("recipePage",recipePageSchema)