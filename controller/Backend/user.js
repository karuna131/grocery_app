const user=require('../../database/user.schema');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


/* user signup */
const userSignUp = async(req, res)=>{
    if(!req.body.username || !req.body.email || !req.body.password){
        res.send({
            status : false,
            status_code : 404,
            message : "ALL DETAILS ARE REQUIRED"
        });
    };

    const userDetails = {
        username : req.body.username,
        email : req.body.email,
        password : bcrypt.hashSync(req.body.password, 12) 
    }
    try{
        const userExist = await user.findOne({email : req.body.email});
        if(userExist){
            return res.status(412).json({
                error : "EMAIL ALREADY EXIST"
            });
        }
        if(validator.isEmail(req.body.email)){
            let data = await user.insertMany(userDetails);
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
            message : "USER CAN'T SIGNUP"
        });
        console.log(err);
    }
}



/* user login */
const userLogin = async(req, res)=>{
    if(!req.body.email || !req.body.password){
        res.send({
            status : false,
            status_code : 401,
            message : "Authentication failed. Required all details"
        });
    };
    try{
        let Userlogin_data = await user.findOne({email : req.body.email});
        if(Userlogin_data){
            const isMatch = await bcrypt.compareSync(req.body.password, Userlogin_data.password);
            
            if(!isMatch){
                res.status(412).json({
                    status : false,
                    error : "INVALID PASSWORD"
                });
            }else{
                const token = jwt.sign({id : Userlogin_data._id}, process.env.SECRET_KEY, {expiresIn : "8h"});
                res.cookie("Token", token);
                res.status(200).json({
                    status: true,
                    message : "USER LOGIN SUCCESSFULLY",
                    Data : Userlogin_data
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
            message : "Server side error while user try to login "
        });
        console.log(err);
    }
}


module.exports = {userSignUp, userLogin};
