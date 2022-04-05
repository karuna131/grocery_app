require('dotenv').config();
const user = require("../../models/user.schema");
const bcrypt = require('bcrypt')
const { Err, Res, Mess, innc } = require("../../message")

// for forgot password
const Email = []
const forgotpassword = async (req, res) => {
    if (!req.body.email) {
        return res.status(422).send(Mess());
    } try {
        Email.push(req.body.email)
        const data = await user.findOne({ email: req.body.email })
        if (data) {
            if (data.status == "active") {
                const otpcode = Math.floor(Math.random() * 10000 + 1);
                let otpResponse = await user.updateOne({ email: req.body.email }, { otp: otpcode })
                res.status(201).send(Res({ user_id: data._id }, "send otp successfully"))
            } else {
                return res.status(403).send(innc("account not active"));
            }
        } else {
            return res.status(403).send(innc("account not active"));
        }
    } catch (err) {
        res.status(404).send(Err(err.message))
    }
}

// varify otp
const varifyOtp = async (req, res) => {
    if (!req.body.id || !req.body.otp) {
        return res.status(422).send(Mess());
    }
    try {
        const otp = req.body.otp
        const data = await user.findOne({ _id: req.body.id })
        if (data) {
            if (data._id == req.body.id) {
                if (data.otp == otp) {
                    res.status(201).send(Res(data, "varified successfully"))
                } else {
                    res.status(412).send(innc("otp does not match"))
                }
            } else {
                res.status(412).send(innc("enter correct user id"))
            }
        }
    } catch (err) {
        res.status(404).send(Err(err.message))
    }
}

// Reset password
const setPassword = async (req, res) => {
    if (!req.body.id || !req.body.Newpassword) {
        return res.status(422).send(Mess());
    }
    try {
        const data = await user.findOne({ _id: req.body.id })
        if (data._id == req.body.id) {
            salt = bcrypt.genSaltSync(10);
            const d = await user.updateOne({ password: bcrypt.hashSync(req.body.Newpassword, salt) })
            res.status(201).send(data, "reset password successfully")
        } else {
            res.status(412).send(innc("enter correct user id"))
        }
    } catch (err) {
        res.status(404).send(Err(err.message))
    }
}
module.exports = { forgotpassword, varifyOtp, setPassword }
