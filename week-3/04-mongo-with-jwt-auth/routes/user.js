const { Router } = require("express");
const router = Router();
const jwt = require("jsonwebtoken");
const userMiddleware = require("../middleware/user");
const { User, Course } = require("../db");
const {jwtPass} = require("../db/index")

// User Routes
router.post('/signup', async (req, res) => {
    // Implement user signup logic
    const user = req.body.username
    const pass = req.body.password
    const _user = await User.findOne({username : user})
    if(!_user){
        const newUser = new User({
            username : user,
            password : pass
        })

        newUser.save().then(()=>{
            console.log("The user has posted to the DB")
            res.status(200).json({
                msg : "User created successfully"
            })
        })
    }else{
        res.status(401).json({
            msg : "User already exists"
        })
    }

});

router.post('/signin', async(req, res) => {
    // Implement admin signup logic
    const user = req.body.username 
    const pass = req.body.password

    const _user = await User.findOne({username : user, password : pass})
    if(!_user){
        res.status(401).json({
            msg : "Incorrect username or password"
        })
    }else{
        let token = jwt.sign({username : user}, jwtPass)
        token = "Bearer " + token
        res.status(200).json({
            msg : "User signed in successfully",
            token : token
        })
    }

});

router.get('/courses', async (req, res) => {
    // Implement listing all courses logic
    const _courses = await Course.find()
    res.status(200).json({
        courses : _courses
    })
});

router.post('/courses/:courseId', userMiddleware, async (req, res) => {
    // Implement course purchase logic
    const _id = req.params.courseId
    console.log(_id)
    const auth = req.headers.authorization
    const token = auth.split(" ")[1]
    const user = jwt.decode(token).username
    const _user = await User.findOne({username : user});
    _user.coursesPurchased.push(_id)
    _user.save().then(()=>{
        console.log("Purchased course had been updated in the DB");
    })
    res.status(200).json({
        msg : `Course with courseId ${_id} has been purchased`,
        courseId : _id
    })

});

router.get('/purchasedCourses', userMiddleware, async (req, res) => {
    // Implement fetching purchased courses logic
    let token = req.headers.authorization
    token = token.split(" ")[1]
    const user = jwt.decode(token).username
    const _user = await User.findOne({username : user})
    const purchasedCourses = _user.coursesPurchased

    const userCourses = []

    for(let i=0; i<purchasedCourses.length; i++){
        const course = await Course.findOne({courseId : purchasedCourses[i]})
        console.log(course)
        userCourses.push(course)
    }

    res.status(200).json({
        coursesPurchased : userCourses
    })

});

module.exports = router