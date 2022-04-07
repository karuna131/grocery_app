const locationS = require('../../models/location.schema');

const loct = async(req, res)=>{
    // const id = req.params.id
    try{
    const store = await locationS.create(req.body);
    // await locationS.find({vendor_id : id})
    // .select('vendor_id _id')
    // .populate("vendor_id", "current_address")
    // .exec()
    // .then(data =>{
    console.log(store);
    return res.send({
        status : true,
        status_code : 200,
        data : data
    })
    // })
    }
    catch(err){
        console.log(err);
        res.send({
            status : false,
            status_code:400,
            error : 'vendor not found'
        })
    }
}

module.exports = {loct};