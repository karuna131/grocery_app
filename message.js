const Err=function Err(message){
    return {
        status: true,
        status_code: 404,
        message: message,
        data: {}
    }
}

const Res=function Res(data,message="successfully"){
    return {
        status: true,
        status_code: 200,
        message:message ,
        data: data
    }
}
const Mess=function Mess(){
    return {
        status: false,
        status_code: 422,
        message: "all details required",
        data:{}
    }
}
const innc=function innc(message){
    return {
        status_code: 403,
        status: false,
        message: message,
        data: {}
    }
}
module.exports={Err,Res,Mess,innc}