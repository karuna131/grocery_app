const user=require('../../models/categories.schema');


/* add category */
const create_categories = async(req, res) =>{
    if(!req.body.name || !res.filepath){
        res.send({
            status : false,
            status_code : 401,
            message : "All details are required"
        })
    }
    var name = req.body.name;
    /* This will remove hyphens (but no spaces) on the first replace, and in the second replace it will condense consecutive spaces into a single hyphen */
    var slug = name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');   
    var data = {
        name : name,
        slug : slug,
        image : res.filepath
    }
    try{
        const name_exist = await category.findOne({name : req.body.name});
        if (!name_exist){
            let category_data = await category.insertMany(data)
            if(category_data){
                res.send({
                    status : category_data.status,
                    status_code : 200,
                    message : "NEW CATEGORY ADDED SUCCESSFULLY",
                    Data : category_data
                })
            }else{
                res.send({
                    status : false,
                    status_code : 400,
                    message : "NOT ABLE TO ADD CATEGORY"})
            }
        }else{
            res.send({
                status : false,
                status_code : 409,
                message : "This category already exist"
            })
        }
    }
    catch(err){
        if(res.status(500)){
            console.log(err);
            res.status(500).json({
                status : false,
                error : "getting error while connecting with server"
            })
        }
    }
}




/* update category */
const category_update = async(req,res) =>{
    const name = req.body.name;
    const slug_update=name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
    let id = req.params.id;
    try{
        /* we are updating all fields */
        const update = await category.updateMany({_id : id},{name: req.body.name, slug : slug_update, image : res.filepath, status : req.body.status});
        console.log(update);
        if(update){
            res.send({
                status : true,
                status_code : 200,
                message : "STATUS UPDATE SUCCESSFULLY",
                Data : update
            })
        }else{
            res.send({
                status : false,
                status_code : 201,
                error : "CATEGORY NOT UPDATED"
            })
        }
    }
    catch(err){
        if(err.code == 11000){
            res.status(409).json({
                status : false,
                message : "slug is already exist"
            })
        }else{
        console.log(err);
        res.send({
            status : false,
            status_code : 500,
            error :  "getting server side error while updating category"
        })
    }
    }

}




/* Delete category */
const delete_category = async(req, res) =>{
    const id = req.params.id ; 
    try{
        const Delete = await category.deleteOne({_id : id});
        if(Delete){
            res.send({
                status : true,
                status_code : 200,
                message : "Category deleted successfully",
                Data : Delete
            })
        }else{
            res.send({
                status : true,
                status_code : 200,
                message : "Category not deleted"
            })
        }
    }
    catch(err){
        console.log(err);
        res.send({
            status : false,
            status_code : 400,
            error : "Category not found"
        })
    }
}




module.exports = {create_categories, category_update, delete_category};