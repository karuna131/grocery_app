const { default: mongoose } = require("mongoose")
const product = require("../../database/product.schema")

// show all product
const listOfProduct = async (req, res) => {
    try {
        const data = await product.find().select(['category_id', 'vendor_id','product_name','description','regular_price','sell_price','attribute','image', 'status']);
        if (data.status = 'active') {
            res.status(201).send({
                status: true,
                status_code: 200,
                message: "All product",
                data: data
            })

        }
        else {
            res.status(404).send({
                status: true,
                status_code: 404,
                message: "product not available",
                data: data
            })

        }

    } catch (err) {
        res.status(404).send({
            status: true,
            status_code: 404,
            message: "not found",
            data: {}
        })


    }
}



// get product by id
const by_productId = async (req, res) => {
    if (!req.query.id) {
        return res.status(422).send({
            status: false,
            status_code: 422,
            message: "All field required",
            data: {}
        });
    }
    const id = req.query.id

    try {
        const data = await product.findById({ _id: id }).select(['category_id', 'vendor_id', 'product_name','description','regular_price','sell_price','attribute','image']);

        if (data.status = 'active') {
            res.status(201).send({
                status: true,
                status_code: 200,
                message: "successfully ",
                data: data
            })

        }
        else {
            res.status(404).send({
                status: true,
                status_code: 404,
                message: " not available",
                data: data
            })

        }
    } catch (err) {

        res.status(404).send({
            status: true,
            status_code: 404,
            message: "not found",
            data: {}
        })

    }
}

// product by category id
const byCategoryId = async (req, res) => {
    if (!req.query.category_id) {
        return res.status(422).send({
            status: false,
            status_code: 422,
            message: "All field required",
            data: {}
        });
    }
    const id = req.query.category_id
    try {
        const data = await product.find({ category_id: id })
        .select([ 'vendor_id','product_name','description','regular_price','sell_price','attribute','image','status'])
        .populate('category_id','name')
        .exec((err, data) => {
            if (data.status = 'active') {
                res.status(201).send({
                    status: true,
                    status_code: 200,
                    message: "successfully ",
                    data: data
                })
    
            }
            else {
                res.status(404).send({
                    status: true,
                    status_code: 404,
                    message: " not available",
                    data: data
                })
    
            }
          
        })
       
    } catch (err) {
        console.log(err);
        res.status(404).send({
            status: true,
            status_code: 404,
            message: "not found",
            data: {}
        })

    }
}



// product details by id
// const DetailsbyId = async (req, res) => {
//     if (!req.query.id) {
//         return res.status(422).send({
//             status: false,
//             status_code: 422,
//             message: "All field required",
//             data: {}
//         });
//     }
//     const id = req.query.id

//     try {
//         const data = await product.findById({ _id: id })
//         if (data.status = 'active') {
//             res.status(201).send({
//                 status: true,
//                 status_code: 200,
//                 message: "All details of product ",
//                 data: data
//             })

//         }
//         else {
//             res.status(404).send({
//                 status: true,
//                 status_code: 404,
//                 message: " not available",
//                 data: data
//             })

//         }
//     } catch (err) {

//         res.status(404).send({
//             status: true,
//             status_code: 404,
//             message: "not found",
//             data: {}
//         })

//     }
// }
module.exports = { listOfProduct, by_productId ,byCategoryId, /*DetailsbyId*/ }