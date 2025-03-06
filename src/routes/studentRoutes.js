const express = require("express");
const router = express.Router();
const studentController = require('../controllers/studentController');



router.get('/', studentController.allStudents);
router.post('/', studentController.addStudent);
router.put('/:roll_no', studentController.updateStudentName);
router.delete('/:roll_no', studentController.deleteStudentByRollNo);

module.exports = router;
