const express = require("express");
const router = express.Router();
const studentController = require('../controllers/studentController');

/**
 * @swagger
 * tags:
 *   name: Students
 *   description: API endpoints for managing students
 */

/**
 * @swagger
 * /api/students:
 *   get:
 *     summary: Get all students
 *     tags: [Students]
 *     responses:
 *       200:
 *         description: List of students
 */
router.get('/', studentController.allstudents);

/**
 * @swagger
 * /api/students:
 *   post:
 *     summary: Add a new student
 *     tags: [Students]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - SName
 *               - RollNumber
 *             properties:
 *               SName:
 *                 type: string
 *               RollNumber:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Student added successfully
 */
router.post('/', studentController.addstudent);

/**
 * @swagger
 * /api/students/{RollNumber}:
 *   put:
 *     summary: Update student name by Roll Number
 *     tags: [Students]
 *     parameters:
 *       - in: path
 *         name: RollNumber
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - SName
 *             properties:
 *               SName:
 *                 type: string
 *     responses:
 *       200:
 *         description: Student updated successfully
 */
router.put('/:RollNumber', studentController.updateStudentName);

/**
 * @swagger
 * /api/students/{RollNumber}:
 *   delete:
 *     summary: Delete student by Roll Number
 *     tags: [Students]
 *     parameters:
 *       - in: path
 *         name: RollNumber
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Student deleted successfully
 */
router.delete('/:RollNumber', studentController.deleteStudentByRollNo);

// These routes are for internal frontend rendering (not included in Swagger)
router.get('/view/all', studentController.renderAllStudents);
router.get('/view/add', (req, res) => res.render('addStudent'));
router.post('/view/add', studentController.addStudentAndRedirect);

module.exports = router;
