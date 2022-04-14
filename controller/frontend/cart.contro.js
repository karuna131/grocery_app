const cart = require("../../models/cart.schema")
const { Err, Mess, Res, innc } = require("../../message")
const add_cart = async (req, res) => {
    const d = { user_id: req.body.user_id, product_id: req.body.product_id, quantity: req.body.quantity }
    try {
        const data = await cart.insertMany(d)
        return res.status(201).send(Res(data));
    }
    catch (err) {
        res.status(404).send(Err(err.message))
    }
}
// show all item of cart
const showCart = async (req, res) => {
    try {
        var subtotal=0
        const data = await cart.find({user_id:req.body.id})
        if(data){
            cart.find({})
            .populate('product_id', '-__v -createdAt -updatedAt')
            .exec((err, da) => {
                return res.status(201).send(Res(da));
            
            })
        }
            
    } catch (err) {
        res.status(404).send(Err(err.message))
    }
}

// remove item from cart by id
const remove = async (req, res) => {
    try {
        const data = await cart.findByIdAndRemove({ _id: req.query.id })
        if (data) {
            return res.status(422).send(Res(req.query.id ,"product removed"));
        }
        else {
            return res.status(200).send(innc("product not in cart"))
        }
    } catch (err) {
        res.status(404).send(Err(err.message))
        console.log(err);
    }
}
// update quantity
const updateQuantity = async (req, res) => {
    if (!req.body.id || !req.body.quantity) {
        return res.status(422).send(Mess());
    }
    try {
        d=await cart.find({_id:req.body.id})
        if(d.length){
            const data = await cart.updateOne({ _id: req.body.id, quantity: req.body.quantity })
            console.log(data);
            res.status(201).send(Res(d,"Quantity update successfully"))
        }
        else{
            res.status(201).send(innc("empty"))
        }
    } catch (err) {
        res.status(404).send(Err(err.message))
    }



}
module.exports = { showCart, remove, updateQuantity, add_cart }