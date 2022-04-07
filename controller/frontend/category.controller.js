const category = require("../../models/categories.schema")

// show all category
const list = async (req, res) => {
    try {
        const data = await category.find({})
        if (data.status = 'active') {
            res.status(201).send({
                status: true,
                status_code: 200,
                message: "All categories ",
                data: data
            })

        }
        else {
            res.status(201).send({
                status: true,
                status_code: 200,
                message: "not available",
                data: {}
            })
        }
    } catch (err) {
        res.status(404).send({
            status: true,
            status_code: 200,
            message: "not found ",
            data: {}
        })
    }
}


// get category  by id

const categorybyId=async(req,res)=>{
    if(!req.query.id){
        return res.status(422).send({
            status: false,
            status_code: 422,
            message: "fill the field properly",
            data:{}
        });
    }
    const id=req.query.id
    // console.log(id);
    try{
    const data=await category.findById({_id:id}).select([  "_id","name","image"])
    console.log(data);
    if (data.status='active'){
        res.status(201).send({
            status: true,
            status_code: 200,
            message: "successfully ",
            data: data
        })

    }
    else{
        res.status(404).send({
            status: true,
            status_code: 404,
            message: " not available",
            data: data
        })

    }
}catch(err){
    res.status(404).send({
        status: true,
        status_code: 404,
        message: "not found",
        data: {}
    })

}
   
}
module.exports = { list, categorybyId }