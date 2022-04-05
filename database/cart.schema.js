const mongoose=require("./conn")
const shoppingSchema=new mongoose.Schema({
    user_id:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'users'
    },
    // vendor_id:{
    //     // type : mongoose.Schema.Types.ObjectId,
    //     // ref : 'vendor'
    //     type:Number,
    //     required:true,
    // },
    product_id :{
        type:mongoose.Schema.Types.ObjectId,
        ref : 'product'
    },
    attribute_name :{
        type:String,
        required:true
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