const express = require("express");
const router = express.Router();
const CourseController = require('../controllers/CourseController');

router.get('/',CourseController.allCourses);
router.post('/',CourseController.addCourseByName);
router.put('/:id',CourseController.updateCourseName);
router.delete('/:id',CourseController.deleteCoursebyID);

module.exports = router;