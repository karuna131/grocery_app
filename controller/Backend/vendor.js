const vendor = require('../../models/vendor.schema');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const vendor_product = require("../../models/vendor_product.schema");
const { Res, innc, Err } = require("../../message")



/* vendor registration */
const vendor_signup = async(req, res) =>{
    if(!req.body.vendor_name || !req.body.email || !req.body.password || !req.body.current_address){
        return res.status(422).send(Mess());
    };
    const userDetails = {
        vendor_name : req.body.vendor_name,
        email : req.body.email,
        password : bcrypt.hashSync(req.body.password, 12),
        current_address : req.body.current_address
    }
    try {
        const data = await vendor.insertMany(userDetails)
        res.status(201).send(Res(data, "register successfully"))
    }
    catch (err) { res.status(404).send(Err(err.message)) }


}





/* vendor login */
const vendor_login = async(req, res)=>{
    if(!req.body.email || !req.body.password){
        return res.status(422).send(Mess());
    };
    try{
        let login_data = await vendor.findOne({email : req.body.email});
            const isMatch = await bcrypt.compareSync(req.body.password, login_data.password);
            if(!isMatch){
                res.status(403).send(innc("incorrect password"))
            }else{
                const token = jwt.sign({id : login_data._id}, process.env.SECRET_KEY, {expiresIn : "8h"});
                res.cookie("Token1", token);
                res.status(200).send(Res(data, "successfully login"))
            }
        }
    catch(err){
        res.status(404).send(Err(err.message))
    }
}

const addProduct=async(req,res)=>{
    if( !req.body.product||!req.body.MRP ||!req.body.sell_price||!req.body.discount){
        return res.status(422).send(Mess());
    }
    try{
        console.log(res.Token1data.id);
        const row={
            vendor:res.Token1data.id,
            product:req.body.product,
            MRP:req.body.MRP,
            sell_price:req.body.sell_price,
            discount:req.body.discount}

        data= await vendor_product.insertMany(row)
        res.send(Res(data))


    }catch(err){
        res.status(404).send(Err(err.message))

    }
}



module.exports = {vendor_signup, vendor_login,addProduct};