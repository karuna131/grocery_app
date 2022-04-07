const mongoose = require('../database/connection');
const geocoder = require('../untils/geocoder')

// const pointSchema = new mongoose.Schema({
//     main_location: {
//       type: String,
//       enum: ['Point'],
//       required: true
//     },
//     coordinates: {
//       type: [Number],
//       required: true,
//     }
//   });
  
//   const locationSchema = new mongoose.Schema({
//     name: String,
//     location: {
//         type: pointSchema,
//         required: true
//         // index : '2dsphere'
//     }
//   });


// const locationSchema = new mongoose.Schema({
//     type : {
//         type :String,
//         enum : ['Point'],
//         default : 'Point',
//         required : true
//     },
//     coordinates : {
//         type : [Number],
//         required : true
//     }
// }) 

const locationSchema = new mongoose.Schema({
    // vendor_id : {
    //     type : mongoose.Schema.Types.ObjectId,
    //     ref : "vendor"
    // },
    vendorStore_id :{
        type : String,
        required : [true, 'please store a vendorStor id'],
        unique : true,
        trim : true,
        maxlength : [10, 'vendorStore id should be less then 10 digit']
    },
    address : {
        type : String,
        required : true
    },
    location : {
        type : {
            type :String,
            enum : ['Point']
        },
        coordinates : {
            type : [Number],
            required : true,
            index : '2dsphere'
        },
        formattedAddress : String
    }
})

locationSchema.pre('save', async(next)=>{
    const loc = await geocoder.geocode(this.address)
    this.location = {
        type : 'Point',
        coordinates : [loc[0].longitude, loc[0].latitude],
        formattedAddress : loc[0].formattedAddress
    }

    //do not save address in database
    this.address = undefined
    next()
})

// locationSchema.index({location : '2dsphere'})


module.exports = mongoose.model('location', locationSchema, 'location');