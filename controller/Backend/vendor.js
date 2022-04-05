const vendor = require('../../database/vendor.schema');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

/* vendor registration */
const vendor_signup = async(req, res) =>{
    if(!req.body.vendor_name || !req.body.email || !req.body.password || !req.body.current_address){
        res.send({
            status : false,
            status_code : 404,
            message : "ALL DETAILS ARE REQUIRED"
        });
    };

    const userDetails = {
        vendor_name : req.body.vendor_name,
        email : req.body.email,
        password : bcrypt.hashSync(req.body.password, 12),
        current_address : req.body.current_address
    }
    try{
        const userExist = await vendor.findOne({email : req.body.email});
        if(userExist){
            return res.status(412).json({
                error : "EMAIL ALREADY EXIST"
            });
        }
        if(validator.isEmail(req.body.email)){
            let data = await vendor.insertMany(userDetails);
            if(data){
                res.send({
                    status : true,
                    status_code : 200,
                    message : "DATA INSERTED SUCCESSFULLY",
                    Data : data
                });
            };
        }
        else{
            return res.status(404).send({
                status : false,
                error : "INVALID EMAIL"
            });
        };
    }
    catch(err){
        res.send({
            status : false,
            status_code : 404,
            message : "YOU CAN'T SIGNUP"
        });
        console.log(err);
    }
}





/* vendor login */
const vendor_login = async(req, res)=>{
    if(!req.body.email || !req.body.password){
        res.send({
            status : false,
            status_code : 401,
            message : "Authentication failed. Required all details"
        });
    };
    try{
        let login_data = await vendor.findOne({email : req.body.email});
        if(login_data){
            const isMatch = await bcrypt.compareSync(req.body.password, login_data.password);
            
            if(!isMatch){
                res.status(412).json({
                    status : false,
                    error : "INVALID PASSWORD"
                });
            }else{
                const token = jwt.sign({id : login_data._id}, process.env.SECRET_KEY, {expiresIn : "8h"});
                res.cookie("Token", token);
                res.status(200).json({
                    status: true,
                    message : "USER LOGIN SUCCESSFULLY",
                    Data : login_data
                })
            }
        }else{
            res.status(412).json({
                status : false,
                error : "INVALID EMAIL"
            })
        }
    }
    catch(err){
        res.send({
            status : false,
            status_code : 404,
            message : "USER NOT FOUND"
        });
        console.log(err);
    }
}





module.exports = {vendor_signup, vendor_login};