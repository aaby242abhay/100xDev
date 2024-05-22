// Middleware for handling auth
const {jwtPass} = require("../db/index")
const jwt = require("jsonwebtoken")
function adminMiddleware(req, res, next) {
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected

    const _token = req.headers.authorization;
    const token = _token.split(" ")[1];

    try{
        const decoded = jwt.verify(token, jwtPass)
        next()
    }
    catch(e){
        res.status(401).json({
            msg : "Unauthorized Access"
        })
    }

}

module.exports = adminMiddleware;