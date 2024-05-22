const mongoose = require('mongoose');
const jwtPass = "Some jwt Password"

// Connect to MongoDB
const mongoUrl = "mongodb+srv://aaby242abhay:%402l4P2@mongo101.mjuaccs.mongodb.net/newCourseSelling";
mongoose.connect(mongoUrl)
.then(()=>{
    console.log("DB Connected");
})

// Define schemas
const AdminSchema = new mongoose.Schema({
    username : String,
    password : String
});

const UserSchema = new mongoose.Schema({
    username : String,
    password : String,
    coursesPurchased : [String]

});

const CourseSchema = new mongoose.Schema({
    // Schema definition here
    courseId : String,
    title : String,
    description : String,
    price : Number,
    imageLink : String
});

const Admin = mongoose.model('Admin', AdminSchema);
const User = mongoose.model('User', UserSchema);
const Course = mongoose.model('Course', CourseSchema);

module.exports = {
    jwtPass,
    Admin,
    User,
    Course
}