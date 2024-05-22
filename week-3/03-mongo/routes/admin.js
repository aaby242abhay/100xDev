const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const {Admin, Course} = require("../db/index");
const router = Router();

// Admin Routes
router.post('/signup', async (req, res) => {
    // Implement admin signup logic
    const admin = await Admin.findOne({username : req.body.username});
    if(admin){
        res.status(401).json({
            'msg' : 'The adminUsername already exits in the dataBase'
        })
    } else {
        const newAdmin = new Admin({
            username : req.body.username,
            password : req.body.password
        })
    
        newAdmin.save()
        
        res.status(200).json({
            'msg' : 'Admin created successfully',
        })
    }
    

});

router.post('/courses', adminMiddleware, (req, res) => {
    // Implement course creation logic

    const newCourse = new Course({
        courseId : (Math.random()*100000).toString(),
        title : req.body.title,
        description : req.body.description,
        price : req.body.price,
        imageLink : req.body.imageLink
    })

    newCourse.save().then(()=>{
        console.log("New course has been posted to the dataBase.")
    })

    res.status(200).json({
        'msg' : "Course created successfully",
        'courseId' : newCourse.courseId
    })

});

router.get('/courses', adminMiddleware, async (req, res) => {
    // Implement fetching all courses logic

    const courses = await Course.find()
    res.json({
        courses : courses
    })

});

module.exports = router;