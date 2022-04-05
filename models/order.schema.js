const mongoose=require("../database/conn")
const orderSchema=new mongoose.Schema({
    user: {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'users'
    },
    product: {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'product'
    },
    product_id : {
        type : String
        // required : true
    },
    quantity : {
        typr : Number
        // required : true
    },
    product_discount : {
        type : Number
        // required : true
    },
    Delivery_charges : {
        type : Number
        // required : true
    },
    Total_amount:{
        type:String
        // required:true,
    },
    Deliver_to : {
        type : String
        // required : true
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
