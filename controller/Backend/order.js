const cart = require('../../models/cart.schema')
const Order_ = require('../../models/order.schema');



// const order = async(req, res)=>{
//     const m = await cart.aggregate([
//         {
//             $lookup : {
//                 from : 'product',
//                 localField : 'product_id',
//                 foreignField : 'product_id',
//                 as : 'product_details'
//             }
//         },
//         {
//             $unwind : "$product_details"
//         },
//         {
//             $project : {
//                 user_id : 1,
//                 quantity : 1,
//                 product_name : "$product_details.product_name",
//                 description : "$product_details.description",
//                 category_id : "$product_details.category_id",
//                 vendor_id : "$product_details.vendor_id",
//                 price : "$product_details.sell_price",
//                 image : "$product_details.image",
//             }
//         }
//     ]).exec(function(err, result) {
//         if(err){
//             console.log(err);
//             res.send(err);
//         }
//         // for(var i of result){
//         //     console.log(result);
//         //     res.send(result)
//         // }
//         if(result){
//             console.log(result);
//             res.send(result)
//         }
//     })
// }


const add_order  = async(req, res)=>{
    const da = await cart.find({})
    .populate('product_id')
    .exec(function (err, result) {
        if(err){
            console.log(err);
            res.send(err)
        }
        if(result){
            for(i of result){
                if(i.user_id == res.tokendata.id){
                    const in_data = {
                        user_id : res.tokendata.id,
                        product_id : i.product_id.id,
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
                    "vendore_id" : product.vendore_id,
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





const get_order = async(req, res)=>{
    try{
        const ord_details =await Order_.find({})
        .populate('user_id')
        .exec(function (err, data) {
            if(err){
                console.log(err);
                res.send(err);
            }
            if(data){
                console.log(data);
            }
        })
    }
    catch(err){
        console.log(err);
        res.send(err)
    }
    
}






module.exports = { add_order, get_orderdDetails, get_order};


















