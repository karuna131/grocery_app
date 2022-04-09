const mongoose = require('../database/connection');
const validator = require('validator');
const vendor_details = new mongoose.Schema({
    vendor_name : {
        type : String
    },
    email : {
        type:String,
        required:true,
        unique:true,
        validate: [ validator.isEmail, 'invalid email' ]
    },
    password :{
        type:String,
        required:true
    },
    current_address : {
        type : String,
        required:true
    }
},{timestamps : true});

module.exports = mongoose.model('vendor', vendor_details, "vendor");