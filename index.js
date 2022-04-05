require("dotenv").config();
const PORT=process.env.PORT
const express=require("express");
const app=express();

const fileUpload = require('express-fileupload');

const bodyparser=require('body-parser')
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true}))

const cookieParser=require("cookie-parser")
app.use(cookieParser())

app.use(fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
}));

app.use("/",require("./routes/backend.routes"))
app.use('/', require("./routes/frontend.routes"))

app.listen(PORT,()=>{
    console.log(`server is runnig ${PORT}`);
});

 