// Middleware for handling auth
const {Admin}= require("../db/index");
async function adminMiddleware(req, res, next) {
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
    const adminname = req.headers.username
    const password = req.headers.password

    const admin = await Admin.findOne({username : adminname, password : password});

    if(admin){
        next();
    } else {
        res.status(400).json({
            msg : 'Incorrect username and password'
        })
    }

}

module.exports = adminMiddleware;