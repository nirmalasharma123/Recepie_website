const mongoose=require("mongoose");

const recipeSchema=new mongoose.Schema({

    name:{
        type:String,
        required:true
    },
    ingredients:{
        type:Array,
    
    },
    hashtag:{
        type:Array,
    },
    instructions:{
        Type:String,
        required:true
    },
    isDeleted:{
        type:Boolean,
        default:false
    },
},{
    timestamps:true    
    
})

module.exports = mongoose.model('recipe',recipeSchema)