const Course = require('../Model/Course');

exports.allCourses = async (req, res) => {
    try {
        const courses = await Course.find();
        res.status(200).json(courses);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch courses", error: error.message });
    }
};

exports.addCourseByName = async (req, res) => {
    const { CourseName } = req.body;

    if (!CourseName) {
        return res.status(400).json({ message: "CourseName is required" });
    }

    try {
        const lastCourse = await Course.findOne().sort({ id: -1 });
        const newId = Number(lastCourse?.id) + 1 || 101;

        const course = new Course({ id: newId, CourseName });
        await course.save();
        res.status(201).json({ message: "Course added successfully", course });
    } catch (error) {
        res.status(500).json({ message: "Failed to add course", error: error.message });
    }
};

exports.updateCourseName = async (req, res) => {
    const { id } = req.params;
    const { CourseName } = req.body;

    if (!CourseName) {
        return res.status(400).json({ message: "CourseName is required" });
    }

    try {
        const updatedCourse = await Course.findOneAndUpdate(
            { id: parseInt(id) },
            { CourseName },
            { new: true }
        );

        if (!updatedCourse) {
            return res.status(404).json({ message: "Course not found" });
        }

        res.status(200).json({ message: "Course updated successfully", course: updatedCourse });
    } catch (error) {
        res.status(500).json({ message: "Failed to update course", error: error.message });
    }
};

exports.deleteCoursebyID = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedCourse = await Course.findOneAndDelete({ id: parseInt(id) });

        if (!deletedCourse) {
            return res.status(404).json({ message: "No such course exists" });
        }

        res.status(200).json({ message: "Course deleted successfully", course: deletedCourse });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete course", error: error.message });
    }
};
