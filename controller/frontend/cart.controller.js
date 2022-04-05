const cart=require("../../database/cart.schema")



const add_cart = async(req, res)=>{
    let body=req.body
    const d={user_id:body.user_id, /*vendor_id:body.vendor_id,*/ product_id:body.product_id, attribute_name:body.attribute_name, quantity:body.quantity}
    try{
        // const act = await cart.findOne({product_id : req.body.product_id});
        // console.log(act);
        // if(act.status == "active"){
            const data=await cart.insertMany(d)
            // console.log(data)
            if(data){
                const Data =await cart.find()
                .populate('product_id', 'product_name description sell_price')
                .exec(function(err,da){
                    for(var i of da){
                        console.log(da) //whole data
                        // console.log(da[0].product_id) //undefind
                        // console.log(da[i])   //undefind
                        // const subtotal = da.quantity * da.product_id.sell_price
                        console.log(product_id)
                    }
                    res.send(da.product_id)
                    
                   
                })
                // .then(da =>{
                //     console.log(da)
                //     for(var i of da){
                //     const subtotal = da[0].quantity * 
                //     console.log(subtotal)
                //     // i['subtotal'] = subtotal
                //     // da.push(i[subtotal])
                //     }
                //     res.status(200).send({
                //         status: true,
                //         status_code: 200,
                //         message: "item added in cart",
                //         data: da
                //     })
                // })
            }else{
                res.send({
                    status : false,
                    status_code : 201,
                    message : "Product not add to cart"
                })
            }
        // }
        // else{
        //     res.status(400).send({
        //         status: false,
        //         status_code: 400,
        //         message: "Currently unavailable"
        //     })
        // }
    }
    catch(err){
        console.log(err);
        res.send({
            status : false,
            status_code : 404,
            error : 'Error while product adding into cart'
        })
    }
}






// add item in cart
const addcart=async(req,res)=>{
    if(!req.body.user_id /*||!req.body.vendor_id */ ||!req.body.product_id||!req.body.attribute_name||!req.body.quantity){
        return res.status(422).send({
            status: false,
            status_code: 422,
            message: "All details are required",
            data:{}
        });
    }
    let body=req.body
    const d={user_id:body.user_id, /*vendor_id:body.vendor_id,*/ product_id:body.product_id, attribute_name:body.attribute_name, quantity:body.quantity}
    try{
        const data=await cart.insertMany(d)
        if(data){
            res.status(201).send({
                status: true,
                status_code: 200,
                message: "item added in cart",
                data: data
            })

        }
        else{
            res.status(400).send({
                status: false,
                status_code: 400,
                message: "error",
                data: data
            })
        }
    }
    catch(err){
        console.log(err);
        res.send({
            status : false,
            status_code : 404,
            error : 'Error while adding into cart'
        })
    }
}  
    



// show all item of cart
const showCart=async(req,res)=>{
    const data=await cart.find({})
    .populate('user_id', '-__v -password -createdAt -updatedAt')
    .populate('product_id', '-__v -createdAt -updatedAt')
    .exec((err, data) => {
        console.log(data);
        res.status(201).send({
            status: true,
            status_code: 200,
            message: "all item of cart",
            data: data
        })
    })
}

// remove item from cart by id
const remove=async(req,res)=>{
    if(!req.body.id){
        return res.status(422).send({
            status: false,
            status_code: 422,
            message: "Id is required",
            data:{}
        });
    }
    
    const id=req.body.id
    const data=await cart.findOneAndRemove({_id : id})
    res.status(201).send({
        status: true,
        status_code: 200,
        message: "This item is removed from cart",
        data: data
    })
    
}
// update quantity
const updateQuantity=async(req,res)=>{
    if(!req.body.id||!req.body.quantity){
        return res.status(422).send({
            status: false,
            status_code: 422,
            message: "fill the field properly",
            data:{}
        });
    }
    const item=req.body.id
    const data= await cart.updateOne({_id:item,quantity:req.body.quantity})
    const d1= await cart.findOne({_id:item})
    res.status(201).send({
        status: true,
        status_code: 200,
        message: "quantity updated successfully ",
        data: d1
    })
    

}
module.exports={addcart,showCart,remove,updateQuantity, add_cart}