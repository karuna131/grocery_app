const mongoose = require('../database/connection');
const shipping= new mongoose.Schema({
    fullName:{
        type : String,
        required : true
    },
    contact_no:{
        type  : Number,
        required : true
    },
    region : {
        type : String,
        required : true
    },
    colony_no: {
        type : String,
        required : true
    },
    pin_code : {
        type : Number,
        required : true
    },
    state : {
        type : String,
        required : true
    },
    city: {
        type : String,
        required : true
    },
    near_by_location: {
        type : String,
        required : true
    }
},{timestamps : true});


module.exports = mongoose.model('shipping', shipping, "shipping")