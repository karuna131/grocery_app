const validator=require('validator');
const mongoose=require("../database/connection")
const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        validate: [ validator.isEmail, 'invalid email' ]
       
    },
    mob_no:{
        type:Number,
        required:true
    },
    password:{
        type:String,
        required:true,
        minlength:8
       
    },
    tokens:{
            type:String,

        },
    otp:{
        type:Number

    },
    status:{
        type:String,
        default:"active"

    },
    country:{
        type:String
    },
    address:{
        type:String,
    }
    }
    ,{
        timestamps:true  }
    
)

const user=mongoose.model("users",userSchema)
module.exports=user