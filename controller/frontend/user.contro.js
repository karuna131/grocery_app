require('dotenv').config();
const user = require("../../models/user.schema");
const bcrypt = require('bcrypt')
const { sign } = require('jsonwebtoken')
const validator = require('validator');
const { Err, Res, Mess, innc } = require("../../message")

// signup
const signup = async (req, res) => {
    if (!req.body.username || !req.body.email || !req.body.password || !req.body.mob_no) {
        return res.status(422).send(Mess());
    }
    salt = bcrypt.genSaltSync(10);
    let user_1 = new user({ username: req.body.username, email: req.body.email, mob_no: req.body.mob_no, password: bcrypt.hashSync(req.body.password, salt) })
    try {
        const data = await user.insertMany(user_1)
        res.status(201).send(Res(data, "register successfully"))
    }
    catch (err) { res.status(404).send(Err(err.message)) }
}

// login
const login = async (req, res) => {
    if (!req.body.email || !req.body.password) {
        return res.send(Mess())
    } try {
        const data = await user.findOne({ email: req.body.email })
        if (data) {
            const pass = await bcrypt.compareSync(req.body.password, data.password)
            if (!pass) {
                res.status(403).send(innc("incorrect password"))
            } else {
                const token = sign({ id: data._id }, process.env.secret_key, { expiresIn: "6h" })
                res.cookie("user", token)
                res.status(200).send(Res(data, "successfully login"));
            }
        } else {
            res.status(403).send(innc("incorrect email"))
        }
    } catch (err) {
        res.status(404).send(Err(err.message))
    }
}

// update user detail
const updateUser = async (req, res) => {
    salt = bcrypt.genSaltSync(10);
    const where ={_id: res.tokendata.id}
    let user_1 = { username: req.body.username, email: req.body.email, mob_no: req.body.mob_no, password: bcrypt.hashSync(req.body.password, salt) /*,country:req.body.country,address:req.body.address*/ }
    try {
        const d = await user.find(where)
        if (d) {
            const data = await user.updateMany(where, user_1)
            res.status(200).send(Res(user_1, "successfully update"))
        }
    } catch (err) {
        res.status(404).send(Err(err.message))
    }
}

// user signout
const Signout = async (req, res) => {
    try {
        res.clearCookie("user")
        res.status(200).send(Res({},"logout successfully"))
    } catch (err) {
        res.status(404).send(Err(err.message))
    }
}

module.exports = { signup, login, updateUser, Signout }


