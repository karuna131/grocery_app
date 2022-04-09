const mongoose = require('../database/connection');

const locationSchema = new mongoose.Schema({
    // isVerified:{
    //   type:Boolean,
    //   default:false,
    //   required:true
    // },
    isEnabled:{
      type:Boolean,
      default:false,
      required:true
    },
    lon : {
        type : Number,
        required : true
    },
    lat : {
        type : Number,
        required : true
    },
    location: {
      type: { type: String },
      coordinates: [],
      
    },
    vendor_store : {
        type : String,
        required : true
    },
    // shopId:{
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: 'vendor_access'
    // }
    
  });
  
  locationSchema.index({ location: "2dsphere", location : "2d" });

module.exports = mongoose.model('location', locationSchema, 'location');