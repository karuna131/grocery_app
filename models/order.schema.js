const mongoose=require("../database/connection")
const orderSchema=new mongoose.Schema({
    user_id : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'users'
    },
    product_id: {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'product'
    },
    cart : {
       type : mongoose.Schema.Types.ObjectId,
       ref : "cart" 
    },
    quantity : {
        typr : Number
    },
    product_discount : {
        type : Number
    },
    delivery_charges : {
        type : Number
    },
    total_amount:{
        type:String
    },
    deliver_to : {
        type : String
    },
    status: {
        type: String,
        default : 'active'
    },
    transaction_id : {
        typr : String
    }
},{timestamps:true})

const shopping=mongoose.model("order",orderSchema,"order")
module.exports=shopping
