const mongoose = require('mongoose');
const vendor_details = new mongoose.Schema({
    vendor_name : {
        type : String
    },
    email : {
        type : String
    },
    password :{
        type : String
    },
    current_address : {
        type : String
    }
},{timestamps : true});

module.exports = mongoose.model('vendor', vendor_details, "vendor");