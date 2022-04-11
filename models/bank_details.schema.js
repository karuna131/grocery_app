const mongoose=require("../database/connection")
const bankSchema=new mongoose.Schema({
    user_id:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'users'
    },
    account_holder_name:{
        type: String,
        required:true,
        
    },
    Acoount_number:{
        type:Number,
        required:true,
        unique:true,
        min:13
    },
    IFSC_Code: {
        type:String,
        required:true
    }
},{
    timestamps:true
})

const bank=mongoose.model("bankDetails",bankSchema,"bankDetails")
module.exports=bank