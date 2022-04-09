const vendor_product = require("../../models/vendor_product.schema")
const { Res, innc, Err } = require("../../message")
const showVendor = async (req, res) => {
    try {
        const data = await vendor_product.find({})
            .populate('product', '-__v -createdAt -updatedAt -status -sell_price -regular_price -vendor_id')
            .exec((err, data) => {
                res.send(Res(data))
            })

    } catch (err) {
        res.send(Err(err.message))

    }
}

module.exports = { showVendor }