const bank=require("../../models/bank_details.schema")
const {Err,Res}=require('../../message')

const addDetails=async(req,res)=>{
    try{
        d={user_id:res.tokendata.id, account_holder_name:req.body. account_holder_name, Acoount_number:req.body. Acoount_number,IFSC_Code:req.body.IFSC_Code}
        const data =await bank.insertMany(d)
        res.status(201).send(Res(data,"bank details added successfully"))

    }catch(err){
        res.status(404).send(Err(err.message))
    }
}

// edit
const edit=async(req,res)=>{
    try{
        d={ account_holder_name:req.body. account_holder_name, Acoount_number:req.body. Acoount_number,IFSC_Code:req.body.IFSC_Code}
        const data =await bank.updateOne({user_id:res.tokendata.id},d)
        res.status(201).send(Res(data,"bank details updated successfully"))

    }catch(err){
        res.status(404).send(Err(err.message))
    }
}
module.exports={addDetails,edit}
