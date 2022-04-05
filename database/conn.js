require("dotenv").config();
const mongoose=require("mongoose");
const DB=process.env.DATABASE
mongoose.connect(DB, { useNewUrlParser: true, useUnifiedTopology: true, }, (err) => {
    if (!err){ console.log("connected");}
    else {console.log(err);}
});
module.exports = mongoose