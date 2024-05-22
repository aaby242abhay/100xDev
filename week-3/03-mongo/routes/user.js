const { Router } = require("express");
const {User, Course} = require("../db/index");
const router = Router();
const userMiddleware = require("../middleware/user");

// User Routes
router.post('/signup',async (req, res) => {
    // Implement user signup logic
    const user = await User.findOne({username : req.body.username});
    if(user){
        res.status(401).json({
            msg : "User already exists",
        })
    } else{
        const newUser = new User({
            username : req.body.username,
            password : req.body.password,
            coursePurchased : []
        })
        newUser.save();

        res.status(200).json({
            msg : "User created successfully"
        })
    }
});

router.get('/courses', userMiddleware, async (req, res) => {
    // Implement listing all courses logic
    const courses = await Course.find()
    res.json({
        courses : courses
    })

});

router.post('/courses/:courseId', userMiddleware, async (req, res) => {
    // Implement course purchase logic
    const id = req.params.courseId;
    const user = await User.findOne({username : req.headers.username})
    
    user.coursesPurchased.push(id);
    user.save();
    console.log(user.coursesPurchased);
    res.json({
        msg : "Course purchased succesfully"
    })

});

router.get('/purchasedCourses', userMiddleware, async (req, res) => {
    // Implement fetching purchased courses logic
    const user = await User.findOne({username : req.headers.username})
    const purchased = user.coursesPurchased

    // purchased.forEach( (id)=>{
    //     const course = await Course.find({courseId : id});

    //     purchasedCourses.push(course);
        
    // })
    console.log(purchased);

    async function processPurchasedCourses(purchasedCourseIds) {
        const purchasedCourses = [];
    
        for (const courseId of purchasedCourseIds) {
            try {
                const course = await Course.findOne({courseId : courseId}); // Await the fetchCourse function
                if (course) {
                    purchasedCourses.push(course);
                } else {
                    console.log(`Course with ID ${courseId} not found`);
                }
            } catch (error) {
                console.error(`Error processing course with ID ${courseId}:`, error);
            }
        }
    
        return purchasedCourses;
    }

    const arr = await processPurchasedCourses(purchased)

    console.log(arr);
    res.status(200).json({
        'coursesPurchased' : arr
    })
   
    
});

module.exports = router