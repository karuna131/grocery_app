const category = require("../../models/categories.schema")
const { Err, Res, Mess, innc } = require("../../message")

// show all category
const list = async (req, res) => {
    try {
        const data = await category.find({})
        if (data.status = 'active') {
            res.status(201).send(Res(data, "All categories "))
        } else {
            res.status(201).send(Res(data, "Not Available "))
        }
    } catch (err) {
        res.send(Err(err.message))
    }
}

// get category  by id
const categorybyId = async (req, res) => {
    if (!req.query.id) {
        return res.status(422).send(Mess());
    }try {
        const data = await category.findById({ _id: req.query.id}).select(["_id", "name", "image"])
        if (data.status = 'active') {
            res.status(201).send(Res(data))
        }else {
            res.status(201).send(Res(data, "Not Available "))
        }
    } catch (err) {
        res.send(Err(err.message))
    }
}
module.exports = { list, categorybyId }