require("dotenv").config();
const mongoose=require("mongoose");
const DB=process.env.DATABASE
// console.log(DB);

mongoose.connect(DB
// ,{
//     useNewUrlParser:true,
//     useCreateIndex:true,
//     useUnifiedTopology:true,
//     useFindAndModify:false

// }

).then(()=>{
    console.log("connected")
}).catch(()=>{
    console.log('not connected');
})

module.exports=mongoose