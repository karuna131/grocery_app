require('dotenv').config();
const user = require("../../database/user.schema");
const bcrypt = require('bcrypt')
const { sign } = require('jsonwebtoken')
const validator = require('validator');

// signup
const signup = async (req, res) => {
    if (!req.body.username || !req.body.email || !req.body.password || !req.body.mob_no) {
        return res.status(422).send({
            status: false,
            status_code: 422,
            message: "all details required",
            data:{}
        });
    }
    salt = bcrypt.genSaltSync(10);
    let user_1 = new user({ username: req.body.username, email: req.body.email, mob_no:req.body.mob_no, password: bcrypt.hashSync(req.body.password, salt) })
    try {
        if (validator.isEmail(req.body.email) == true) {
            const data = await user.insertMany(user_1)
            console.log(data);
            res.status(201).send({
                status: true,
                status_code: 200,
                message: "Resgister successfully",
                data: data
            })
        }
        else {
            res.status(412).send({
                status: false,
                status_code: 412,
                message: "invalid email",
                data:{}
            })
        }
    }
    catch (err) {
        // res.send(err)
        console.log(err);
        if (res.status(409)) {
            res.status(409).send({
                status: false,
                status_code: 409,
                message: "email already exist",
                data:{}
            })
            console.log("email already exist")
            
        }

        else {
            console.log(err);
            res.status(404).send({
                status: false,
                status_code: 404,
                message: "User can't signup",
                data:{}
            })
        }
    }


}

// login
const login = async (req, res) => {
    if (!req.body.email || !req.body.password) {
        return res.send({
            message: "All Details Are Required"
        })
    }
    try {
        const data = await user.findOne({ email: req.body.email })
        if (data) {
            const pass = await bcrypt.compareSync(req.body.password, data.password)
            if (!pass) {
                res.send({
                    status_code:413,
                    status: false,
                    message: "incorrect password",
                    data:{}
                })
            }
            else {
                const token = sign({ id: data._id }, process.env.secret_key, { expiresIn: "6h" })
                // console.log(token);
                res.cookie("user", token)
                res.status(200).send({
                    status_code:200,
                    status: true,
                    message: "login succesfully",
                    user: data
                });
            }
        }
        else {
            res.send({
                status: false,
                status_code:403,
                message: "incorrect email",
                data:{}
            })
        }
    }
    catch (err) {
        res.send({
            status : false,
            status_code : 404,
            message : "Server side error while user try to login "
        });
        console.log(err);
    }
}




// update user detail
const updateUser=async(req,res)=>{
    salt = bcrypt.genSaltSync(10);
    const where={_id:req.params.id}
    let user_1 = { username: req.body.username, email: req.body.email,mob_no:req.body.mob_no ,password: bcrypt.hashSync(req.body.password, salt) /*,country:req.body.country,address:req.body.address*/ }
    try {
        if (validator.isEmail(req.body.email) == true) {
            const d= await user.find(where)
            console.log(d)
            if(d){
                const data = await user.updateMany(where,user_1)
                res.status(201).send({
                    status: true,
                    status_code: 200,
                    message: "updated successfully",
                    data: data
                })
            }
        }
        else {
            res.status(412).send({
                status: false,
                status_code: 412,
                message: "invalid email",
                data:{}
            })
        }
    }
    catch (err){
        console.log(err);
        res.status(404).send({
            status: false,
            status_code: 404,
            message: "User not found for updation",
            data:{}
        })
    }
}




// user signout

const Signout=async(req,res)=>{
    res.clearCookie("user")
    res.status(200).send({
        status_code:200,
        status: true,
        message: "logout succesfully"
    });
}


module.exports = { signup, login, updateUser, Signout}


