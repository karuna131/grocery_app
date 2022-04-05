const Order_ = require('../../models/order.schema');


const order = async(req,res)=>{
    // const where = ({_id : req.params.id});
    try{
        // const user = await Order_.findOne(where);
        // if(user){
            const ag = await Order_.aggregate([
                {
                    $lookup : {
                        from : 'cart',
                        localField : 'Order_.prodct_id',
                        foreignField : 'product_id',
                        as : 'cart_details'
                    }
                },
                {
                    $project : {
                        product_id : "$product_id",
                        quantity : "$quantity",
                        product_discount : "$product_discount",
                        Delivery_charges : "$Delivery_charges",
                        Deliver_to : "$Deliver_to",
                        transaction_id : "$transaction_id",
                        "cart" :{
                                sell_price : "$cart.product_id.sell_price"
                            }
                    },

                    // $group : {
                    //     _id : {
                    //     product_id : { "$first": "$product_id" }, //$first accumulator
                    //     quantity : {"$first" : "$quantity"},
                    //     product_discount : {"$first":"$product_discount"},
                    //     Delivery_charges : {"$first" : "$Delivery_charges"},
                    //     Deliver_to : {"$first" : "$Deliver_to"},
                    //     transaction_id : {"$first" : "$transaction_id"},
                    //     "cart" :{
                    //         sell_price : "$cart.product_id.sell_price"
                    //     }
                    // }
                    //     // Total_amount  : quantity * cart.sell_price,
                    // }
                }
            ],function(err, ag){
                if(err){
                console.log(err);
                res.send(err)
                }
                console.log(ag, "data");
                res.send(ag)
            }
            )
            // else{
            //     res.send({
            //         message : "User need to login"
            //     })
            // }
        }
    catch(err){
        console.log(err);
        res.send(err)
    }
}



module.exports = {order};


















