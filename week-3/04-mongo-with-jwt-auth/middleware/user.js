const {jwtPass} = require("../db/index")
const jwt = require("jsonwebtoken")
function userMiddleware(req, res, next) {

    // Implement user auth logic
    // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
    const _token = req.headers.authorization;
    const token = _token.split(" ")[1];
    try{
        jwt.verify(token, jwtPass)
        next()
    }
    catch(e){
        res.status(401).json({
            msg : "Unauthorized Access"
        })
    }

}

module.exports = userMiddleware;