const mongoose = require('mongoose');

const userSchema =new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        validate: {
            validator: function(v) {
              return /\b[A-Za-z0-9._%+-@]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/.test(v);
            },
            message: props => `${props.value} is not a valid email address!`
          }
    },
    password:{
        type:String,
        required:true,
        
    },
    phoneNo:{
        type:Number,
        required:true,
        unique:true,

        validate: {
            validator: function(v) {
              return /^(?:\+91|0)?[6-9]\d{9}$/.test(v)
            },
            message: props => `${props.value} is not a valid phone number! Must be in format XXX-XXX-XXXX`
          }
    },
    isDeleted:{
        type:Boolean,
        default:false,
    },
},
  {timestamps:true}
)

module.exports = mongoose.model('User',userSchema) 