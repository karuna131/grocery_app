const mongoose=require("../database/connection")
const shoppingSchema=new mongoose.Schema({
    user_id:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'users'
    },
    product_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref : 'product'
    },
    quantity: {
        type:Number,
        required:true
    }
},{
    timestamps:true
})

const shopping=mongoose.model("cart",shoppingSchema,"cart")
module.exports=shopping