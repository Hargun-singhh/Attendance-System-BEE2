
const courses = require('../data/Course');

exports.allCourses = (req,res) =>{
    res.status(200).json(courses);
};

exports.addCourseByName = (req,res) =>{
    const { CourseName }  = req.body;

    const CourseDetails = {
        id: courses.length + 1,
        CourseName: CourseName,

    };

    courses.push(CourseDetails);
    res.status(201).json({message : "Course Added SuccesFully "})

};

exports.updateCourseName = (req, res) => {
    const { id } = req.params; 
    const { CourseName } = req.body; 
    const course = courses.find(c => c.id === parseInt(id));

    if (!course) {
        return res.status(404).json({ message: "Course not found" });
    }
    course.CourseName = CourseName;
    res.status(200).json({ message: "Course updated successfully", course });
};


exports.deleteCoursebyID = (req,res) =>{
    const { id } = req.params;
    const index = courses.findIndex(c => c.id === parseInt(id));

    if (index === -1) {
        return res.status(404).json({ message: "No Such Course Exists" });
    }
    courses.splice(index, 1);
    res.status(200).json({Message : "Course Deleted Successfully "})

};