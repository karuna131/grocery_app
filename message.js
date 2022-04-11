const Err = function Err(message) {
    return {
        status: true,
        status_code: 500,
        message: message,
        data: {}
    }
}

const Res = function Res(data = {}, message = "successfully") {
    return {
        status: true,
        status_code: 201,
        message: message,
        data: data
    }
}
const Mess = function Mess() {
    return {
        status: false,
        status_code: 422,
        message: "all details required",
        data: {}
    }
}
const innc = function innc(message) {
    return {
        status: false,
        status_code: 401,
        message: message,
        data: {}
    }
}

const authen = function authen() {
    return {
        status: false,
        status_code: 403,
        message: "authentication failed",
        data: {}
    }
}
module.exports = { Err, Res, Mess, innc ,authen}

