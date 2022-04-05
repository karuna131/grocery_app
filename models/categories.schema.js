const mongoose = require('../database/conn');
const category = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    image : {
        type : String
    },
    slug : {
        type : String,
        slug : String,
        unique : true
    },
    status : {
        type : String,
        default : 'active'
    }
},
{timestamps : true});


module.exports = mongoose.model('categories', category)