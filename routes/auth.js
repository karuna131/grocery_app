const {verify } = require("jsonwebtoken");
const {authen}=require("../message")

authentication=(req,res,next)=>{
    token=req.cookies;
    // console.log(req.cookies);
    if (token==undefined){
        res.status(401).send(authen())
    }else{
    verify(token.user,"chhayabagwan",(err,tokendata)=>{
        if(err){
            res.status(401).send(authen())
        }
        else if(tokendata.id==undefined){
            res.status(401).send(authen())
        }
        else{
            req.tokendata=tokendata
            next()
        }

    })}

}

module.exports=authentication
