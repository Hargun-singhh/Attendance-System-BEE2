const express = require("express");
const router = express.Router();
const CourseController = require('../controllers/CourseController');

/**
 * @swagger
 * tags:
 *   name: Courses
 *   description: API endpoints for managing courses
 */

/**
 * @swagger
 * /api/course:
 *   get:
 *     summary: Get all courses
 *     tags: [Courses]
 *     responses:
 *       200:
 *         description: List of courses
 */
router.get('/', CourseController.allCourses);

/**
 * @swagger
 * /api/course:
 *   post:
 *     summary: Add a new course
 *     tags: [Courses]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - CourseName
 *             properties:
 *               CourseName:
 *                 type: string
 *     responses:
 *       201:
 *         description: Course added successfully
 */
router.post('/', CourseController.addCourseByName);

/**
 * @swagger
 * /api/course/{id}:
 *   put:
 *     summary: Update course name by ID
 *     tags: [Courses]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - CourseName
 *             properties:
 *               CourseName:
 *                 type: string
 *     responses:
 *       200:
 *         description: Course updated successfully
 */
router.put('/:id', CourseController.updateCourseName);

/**
 * @swagger
 * /api/course/{id}:
 *   delete:
 *     summary: Delete course by ID
 *     tags: [Courses]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Course deleted successfully
 */
router.delete('/:id', CourseController.deleteCoursebyID);

module.exports = router;
