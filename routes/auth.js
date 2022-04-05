const {verify } = require("jsonwebtoken");

authentication=(req,res,next)=>{
    token=req.cookies;
    // console.log(req.cookies);
    if (token==undefined){
        res.status(401).send({
            status: false,
            status_code: 401,
            message: "authentication failed",
            data: {}
        })
        
    }else{
    verify(token.user,"chhayabagwan",(err,tokendata)=>{
        if(err){
            res.status(401).send({
                status: false,
                status_code: 401,
                message: "authentication failed",
                data: {}
            })

        }
        else if(tokendata.id==undefined){
            res.status(401).send({
                status: false,
                status_code: 401,
                message: "authentication failed",
                data: {}
            })
        }
        else{
            res.tokendata=tokendata
            next()
        }

    })}

}

module.exports=authentication
