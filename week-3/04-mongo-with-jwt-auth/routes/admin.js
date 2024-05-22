const { Router } = require("express");
const jwt = require("jsonwebtoken")
const adminMiddleware = require("../middleware/admin");
const {Admin, Course} = require("../db/index")
const router = Router();
const {jwtPass} = require("../db/index")

// Admin Routes
router.post('/signup', async (req, res) => {
    const _admin = req.body.username
    const _password = req.body.password
    const admin = await Admin.findOne({username : _admin})
    if(admin){
        res.status(401).json({
            msg : "Admin already Exists"
        })
    } else {
        const newAdmin = new Admin({
            username : _admin,
            password : _password
        })
        newAdmin.save().then(()=>{
            console.log("The new admin has been posted to the DB")
        })

        res.status(200).json({
            msg : "Admin created successfully"
        })
    }
});

router.post('/signin', async (req, res) => {
    const _admin = req.body.username
    const _password = req.body.password
    const admin = await Admin.findOne({username : _admin, password : _password})
    if(admin){
        let token = jwt.sign({username : _admin}, jwtPass);
        token = "Bearer " + token
        
        res.status(200).json({
            msg : "Signed in successfully",
            token : token
        })
    }else{
        res.status(401).json({
            msg : "Incorrect username or password."
        })
    }
});

router.post('/courses', adminMiddleware, async (req, res) => {
    // Implement course creation logic
    const newCourse = new Course({
        courseId : (Math.floor(Math.random()* 1000000)).toString(),
        title : req.body.title,
        description : req.body.description,
        price : req.body.price,
        imageLink : req.body.imageLink
    })
    newCourse.save()
    .then(()=>{
        console.log("The course has been posted to the DataBase")
    })
    res.status(200).json({
        msg : "Course has been updated",
        course : newCourse
    })
});

router.get('/courses', adminMiddleware, async (req, res) => {
    // Implement fetching all courses logic
    const courses = await Course.find()
    console.log(courses)
    res.status(200).json({
        courses : courses
    })
});

module.exports = router;