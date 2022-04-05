const mongoose = require('../database/conn');
const products = new mongoose.Schema({
    category_id :{
        type : mongoose.Schema.Types.ObjectId,
        ref : "categories"
    },
    vendor_id :{
        type : mongoose.Schema.Types.ObjectId,
        ref : "vendor"
    },
    product_name : {
        type : String,
        required : true
    },
    description : {
        type : String,
    },
    regular_price : {
        type : Number
    },
    sell_price : {
        type : Number
    },
    attribute : {
        type : String
    },
    image : {
        type : String
    },
    status : {
        type : String,
        default : 'active'
    }
},{timestamps : true});


module.exports = mongoose.model('product', products, "product")