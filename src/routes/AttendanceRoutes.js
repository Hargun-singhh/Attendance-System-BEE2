const express = require('express');
const router = express.Router();
const attendanceController = require('../controllers/AttendanceController');

/**
 * @swagger
 * tags:
 *   name: Attendance
 *   description: API endpoints for managing attendance records
 */

/**
 * @swagger
 * /api/attendance:
 *   get:
 *     summary: Get attendance by course
 *     tags: [Attendance]
 *     parameters:
 *       - in: query
 *         name: courseId
 *         schema:
 *           type: integer
 *         required: true
 *         description: Filter attendance by course name
 *     responses:
 *       200:
 *         description: List of attendance records
 */
router.get('/', attendanceController.getAttendanceByCourse);

/**
 * @swagger
 * /api/attendance:
 *   post:
 *     summary: Create a new attendance record
 *     tags: [Attendance]
 *     parameters:
 *       - in: query
 *         name: rollNo
 *         required: true
 *         schema:
 *           type: integer
 *       - in: query
 *         name: courseId
 *         required: true
 *         schema:
 *           type: integer
 *       - in: query
 *         name: status
 *         required: true
 *         schema:
 *           type: string
 *           enum: [Present, Absent]
 *     responses:
 *       201:
 *         description: Attendance recorded successfully
 */
router.post('/', attendanceController.makeAttendance);


/**
 * @swagger
 * /api/attendance:
 *   put:
 *     summary: Update an attendance record
 *     tags: [Attendance]
 *     parameters:
 *       - in: query
 *         name: rollNo
 *         required: true
 *         schema:
 *           type: integer
 *       - in: query
 *         name: courseId
 *         required: true
 *         schema:
 *           type: integer
 *       - in: query
 *         name: status
 *         required: true
 *         schema:
 *           type: string
 *           enum: [Present, Absent]
 *     responses:
 *       200:
 *         description: Attendance updated successfully
 */
router.put('/', attendanceController.updateAttendance);


/**
 * @swagger
 * /api/attendance:
 *   delete:
 *     summary: Delete an attendance record
 *     tags: [Attendance]
 *     parameters:
 *       - in: query
 *         name: rollNo
 *         required: true
 *         schema:
 *           type: integer
 *       - in: query
 *         name: courseId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Attendance record deleted successfully
 */
router.delete('/', attendanceController.delAttendance);

module.exports = router;
