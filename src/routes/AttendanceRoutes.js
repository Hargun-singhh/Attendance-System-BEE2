const express = require('express');
const router = express.Router();
const attendanceController = require('../controllers/AttendanceController')

router.get('/',attendanceController.getAttendanceByCourse);
router.post('/',attendanceController.makeAttendance);
router.put('/',attendanceController.updateAttendance);
router.delete('/',attendanceController.delAttendance);

module.exports = router;
