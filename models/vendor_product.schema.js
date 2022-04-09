const mongoose=require("../database/connection")

const vendor_product= new mongoose.Schema({
    vendor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"vendor"
    },
    product:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"product"

    },
    MRP:{
        type:Number,
        require:true
        
    },
    sell_price:{
        type:Number,
        required:true
    },
    discount:{
        type:Number,

    }

},{timestamps : true});
module.exports = mongoose.model('vendor_product', vendor_product, "vendor_product");