require('dotenv').config();
const user = require("../../models/user.schema");
const bcrypt=require('bcrypt')

// for forgot password
const Email=[]
const forgotpassword=async(req,res)=>{
    if(!req.body.email){
        return res.status(422).send({
            status: false,
            status_code: 422,
            message: "fill the field properly",
            data:{}
        });
    }
    Email.push(req.body.email)
    const data= await user.findOne({email:req.body.email})
    if(data){
        if (data.status=="active"){
            const otpcode=Math.floor(Math.random()*10000+1);
            // const otpcode=1234
            console.log(otpcode);
            let otpResponse= await user.updateOne({email:req.body.email},{otp:otpcode})
            console.log(otpResponse);
            res.status(201).send({
                status: true,
                status_code: 200,
                message: "send otp successfully",
                data: {user_id:data._id}
            })

        }else{
            return res.status(403).send({
                status: false,
                status_code: 403,
                message: "account not active",
                data:{}
            });

        }
    
    }
    else{
        return res.status(404).send({
            status: false,
            status_code: 404,
            message: "account not exist",
            data:{}
        });
    }
    
}

// varify otp
const varifyOtp=async(req,res)=>{
    if(!req.body.id||!req.body.otp){
        return res.status(422).send({
            status: false,
            status_code: 422,
            message: "fill the field properly",
            data:{}
        });
    }
    const otp=req.body.otp
    const data=await user.findOne({_id:req.body.id})
    if(data){
        // console.log(Email);
        if(data.email==Email[0]){
            if(data.otp==otp){
                res.status(201).send({
                    status: true,
                    status_code: 200,
                    message: "varified successfully",
                    data: {user_id:data._id}
                })
            }
            else{
                res.status(412).send({
                    status: true,
                    status_code: 412,
                    message: "enter vailid otp",
                    data: {}
                })
    
            }

        }
        else{
            res.status(412).send({
                status: true,
                status_code: 412,
                message: "enter correct user id",
                data: {}
            })
        }
    }
    else{
        res.status(404).send({
            status: true,
            status_code: 404,
            message: "not found",
            data: {}
        })

    }
}





// Reset password
const setPassword=async(req,res)=>{
    if(!req.body.id||!req.body.Newpassword){
        return res.status(422).send({
            status: false,
            status_code: 422,
            message: "fill the field properly",
            data:{}
        });
    }
    const data=await user.findOne({_id:req.body.id})
    if(data.email==Email[0]){
    if(data){
        salt = bcrypt.genSaltSync(10);
        const d=await user.updateOne({password:bcrypt.hashSync(req.body.Newpassword, salt)})
        res.status(201).send({
            status: true,
            status_code: 200,
            message: "reset password successfully",
            data: data._id
        })
    }

    else{
        res.status(201).send({
            status: true,
            status_code: 200,
            message: "incorrect id ",
            data: {}
        })
    }
}
else{
    res.status(412).send({
        status: true,
        status_code: 412,
        message: "enter correct user id",
        data: {}
    })
}
}
module.exports={forgotpassword,varifyOtp,setPassword}
