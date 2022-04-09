const shipping=require("../../models/shipping.schema")
const { Err, Mess, Res, innc } = require("../../message")
const shippingAdd = async (req, res) => {
    const d = {
        fullName: req.body.fullName,
        contact_no: req.body.contact_no, 
        region: req.body.region,
        colony_no: req.body.colony_no, 
        pin_code: req.body. pin_code,  
        state:req.body.state,
        city : req.body. city, 
        near_by_location: req.body. near_by_location}
    try {
        const data = await shipping.insertMany(d)
        res.send(Res(d))
    }
    catch (err) {
        res.status(404).send(Err(err.message))
    }
}


const updateAddress = async (req, res) => {
    const d = {
        fullName: req.body.fullName,
        contact_no: req.body.contact_no, 
        region: req.body.region,
        colony_no: req.body.colony_no, 
        pin_code: req.body. pin_code,  
        state:req.body.state,
        city : req.body. city, 
        near_by_location: req.body. near_by_location}
    try {
        const data = await shipping.updateMany({_id:res.tokendata.id},d)
        res.send(Res(d,"address updated"))
    }
    catch (err) {
        res.status(404).send(Err(err.message))
    }
}

module.exports={shippingAdd,updateAddress}