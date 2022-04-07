require("dotenv").config();
const mongoose=require("mongoose");
const DB=process.env.DATABASE

mongoose.connect(DB)
.then(()=>{
    console.log("connected")
}).catch((err)=>{
    console.log(err);
})

module.exports=mongoose