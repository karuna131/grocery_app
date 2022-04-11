const cart = require('../../models/cart.schema')
const Order_ = require('../../models/order.schema');







// for adding a product into cart we need to take cart_id AND shipping_id
const add_order  = async(req, res)=>{
    const da = await cart.find()
    .populate('product_id')
    .exec(function (err, result) {
        if(err){
            console.log(err);
            res.send(err)
        }
        if(result){
            console.log(result);
            for(i of result){
                if(i.user_id == res.tokendata.id){
                    const in_data = {
                        user_id : res.tokendata.id,
                        product_id : i.product_id.id,
                        shipping_id :  req.body.shipping_id,
                        total_amount : i.quantity * i.product_id.sell_price
                    }
                    Order_.insertMany(in_data)
                    .then(data=>{
                        const cart_id = ({_id : req.body.id})
                        cart.findByIdAndRemove(cart_id)
                        .then(()=>{
                            res.send({"order" : data[0]})
                        })
                        .catch((err)=>{
                            res.send({message : 'data is not deleted from cart'});
                            console.log(err)
                        })
                    }).catch((err)=>{
                        console.log(err);
                        res.send({message : 'cart id is not valid'})
                    })
                }else{
                    res.send({
                        status : false,
                        status_code : 500,
                        message : "First login please"
                    })
                }
            }
        } 
    })
}






const get_orderdDetails = async(req, res)=>{
    const order_id = ({_id : req.query.id})
    try{
        const ord = await Order_.findOne(order_id)
        .populate('product_id')
        .exec(function (err, data) {
            if(err){
                console.log(err);
                res.send(err)
            }
            if(data){
                var product = data.product_id
                var quantity = 0
                for(i=product.sell_price; i<=data.total_amount; i+=product.sell_price){
                    quantity++
                }
                res.send({
                    "user_id" : data.user_id,
                    "product_id" : product._id,
                    "category_id" : product.category_id,
                    "vendor_id" : product.vendor_id,
                    "image" : product.image,
                    "product_name" : product.product_name,
                    "description" : product.description,
                    "created_on" : product.createdAt,
                    "quantity" : `${quantity} kg`,
                    "price" : product.sell_price,
                    "subtotal_price" : data.total_amount,
                    "status" : product.status
                })
            }
        })
    }
    catch(err){
        console.log(err);
        res.send({
            status : false,
            status_code : 500,
            error : "order id not found"
        })
    }
}





const getOrder = async(req, res)=>{
    try{
        const ord_details =await Order_.find({})
        .populate('user_id')
        .exec(function (err, data) {
            if(err){
                console.log(err);
                res.send(err);
            }
            if(data){
                for(i of data){
                    res.status(200).send({
                        "order_id" : i.id,
                        "user_name" : i.user_id.username,
                        "total_amount" : i.total_amount,
                        "shipped_on" : i.shipping_id,
                        "status" : i.status,
                        "created_on" : i.createdAt
                    })
                }  
            }
        })
    }
    catch(err){
        console.log(err);
        res.send(err)
    }
    
}



// get details by order id
const getOrder_shortDetails = async(req, res)=>{
    const where = ({_id : req.query.id})
    try{
        const ord_details =await Order_.find(where)
        .populate('user_id')
        .exec(function (err, data) {
            if(err){
                console.log(err);
                res.send(err);
            }
            if(data){
                for(i of data){
                    res.status(200).send({
                        "order_id" : i.id,
                        "user_name" : i.user_id.username,
                        "total_amount" : i.total_amount,
                        "shipped_on" : i.shipping_id,
                        "status" : i.status,
                        "created_on" : i.createdAt
                    })
                }  
            }
        })
    }
    catch(err){
        console.log(err);
        res.send(err)
    }
}

const checkout=async(req,res)=>{
    try{
    //     console.log(res.tokendata.id);
        data=await Order_.find({user_id:res.tokendata.id})
        .populate("product_id")
        .exec(function(err,data){
            console.log(data);
            data.forEach(element => {
            res.send({'total_amount':element.total_amount})

            });
          
        })
    }catch(err){
        res.send(err)

    }
    
}


module.exports = { add_order, get_orderdDetails, getOrder, getOrder_shortDetails,checkout};


















