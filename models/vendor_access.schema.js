const mongoose = require('../database/connection');
const vendor_access = new mongoose.Schema({
    vendor_id :{
        type : mongoose.Schema.Types.ObjectId,
        ref : "vendor"
    }
})

module.exports = mongoose.model('vendor_access', vendor_access, 'vendor_access')