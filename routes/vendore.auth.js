const { verify } = require("jsonwebtoken");
const { authen } = require("../message")
Vendorauth = (req, res, next) => {
    token1 = req.cookies
    if (token1 == undefined) {
        res.status(401).send(authen())
    } else {
        verify(token1.Token1, "karunajaiswal", (err, Token1data) => {
            if (err) {
                res.status(401).send(authen())
            }
            else if (Token1data.id == undefined) {
                res.status(401).send(authen())

            }else {
                res.Token1data = Token1data
                next()
            }

        })
    }
}

module.exports = Vendorauth
