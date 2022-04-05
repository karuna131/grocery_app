const product = require('../../database/product.schema');

/* add product */
const create_products = async(req, res)=>{
    /* error handle if any field missed while adding */
    if(!req.body.vendor_id || !req.body.category_id || !req.body.product_name || !req.body.description || !req.body.regular_price || !req.body.sell_price || !req.body.attribute || !res.filepath){
        res.send({
            status : false,
            status_code : 401,
            message : "All details are required"
        })
    }
    const data = {
        vendor_id : req.body.vendor_id,
        category_id : req.body.category_id,
        product_name : req.body.product_name,
        description : req.body.description,
        regular_price : req.body.regular_price,
        sell_price : req.body.sell_price,
        attribute : req.body.attribute,
        image : res.filepath
    }
    try{
        const product_data = await product.insertMany(data);
        if(product_data){
            res.send({
                status : product_data.status,
                status_code : 200,
                message : "PRODUCT ADDED SUCCESSFULLY",
                Data : product_data
            })
        }else{
            res.send({
                status : false,
                status_code : 400,
                message : "NOT ABLE TO ADD PRODUCT"
            })
        }
    }
    catch(err){
        console.log(err);
        res.send({
            status : false,
            status_code : 400,
            error : "ERROR WHILE ADDING PRODUCT"
        })
    }
}



/* update products */
const Update_product = async(req, res)=>{
    const where = ({_id : req.params.id});
    const data = {
        product_name : req.body.product_name,
        description : req.body.description,
        regular_price : req.body.regular_price,
        sell_price : req.body.sell_price,
        attribute : req.body.attribute,
        image : res.filepath,
        status : req.body.status
    }
    try{
        const update = await product.updateMany(where, data);
        console.log(update);
        if(update){
            res.send({
                status : true,
                status_code : 200,
                message : "PRODUCT UPDATED SUCCESSFULLY",
                Data : update
            })
        }else{
            res.send({
                status : false,
                status_code : 201,
                message : "PRODUCT NOT UPDATED"
            })
        }
    }
    catch(err){
        console.log(err);
        res.send({
            status : false,
            status_code : 400,
            error :  "PRODUCT NOT FOUND FOR UPDATE"
        })
    }
}


/*  Delete products */ 
const delete_products = async(req, res) =>{
    const id = req.params.id ; 
    try{
        const Delete = await product.deleteOne({_id : id});
        if(Delete){
            res.send({
                status : true,
                status_code : 200,
                message : "Product deleted successfully"
            })
        }else{
            res.send({
                status : true,
                status_code : 200,
                message : "Product not deleted"
            })
        }
    }
    catch(err){
        console.log(err);
        res.send({
            status : false,
            status_code : 400,
            error : "Product not found"
        })
    }
}




module.exports = {create_products, Update_product, delete_products};