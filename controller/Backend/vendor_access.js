const access = require('../../database/vendor_access.schema');

/* add vendor */
const add_vandor = async(req, res)=>{
    try{
        const add = await access.insertMany({vendor_id : req.body.id})
        if(add){
            res.send({
                status : true,
                status_code : 200,
                message : "VENDOR ADDED SUCCESSFULLY",
                Data : add
            })
        }else{
            res.send({
                status : false,
                status_code : 201,
                message : "VENDOR NOT ADDED"
            })
        }
    }
    catch(err){
        console.log(err);
        res.send({
            status : false,
            status_code : 404,
            error : "VENDOR NOT FOUND FOR ADD"
        })
    }
}




const getVendor_data = async(req, res)=>{
    try{
        await access.find()
        .select("vendor_id _id")
        /*replacing the specified paths in the document with document from other collection */
        .populate('vendor_id')       
        .exec()
        .then(data =>{
            if(data){
                res.send({
                    status : true,
                    status_code : 200,
                    message : "VENDOR DATA GET SUCCESSFULLY",
                    Data : data
                })
            }else{
                res.send({
                    status : false,
                    status_code : 201,
                    message : "VENDOE DATA NOT GET"
                })
            }
        })
    }
    catch(err){
        res.send({
            status : false,
            status_code : 404,
            message : "NOT FOUND VENDOR DATA"
        })
    }
}



module.exports = {add_vandor, getVendor_data};