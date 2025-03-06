const express = require("express");
const router = express.Router();
const studentController = require('../controllers/studentController');



router.get('/', studentController.allstudents);
router.post('/', studentController.addstudent);
router.put('/:RollNumber', studentController.updateStudentName);
router.delete('/:RollNumber', studentController.deleteStudentByRollNo);

module.exports = router;
