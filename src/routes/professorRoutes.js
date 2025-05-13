const express = require("express");
const router = express.Router();
const professorController = require('../controllers/professorController');

/**
 * @swagger
 * tags:
 *   name: Professors
 *   description: API endpoints for managing professors
 */

/**
 * @swagger
 * /api/professer:
 *   get:
 *     summary: Get all professors
 *     tags: [Professors]
 *     responses:
 *       200:
 *         description: List of professors
 */
router.get('/', professorController.allProfessors);

/**
 * @swagger
 * /api/professer:
 *   post:
 *     summary: Add a new professor
 *     tags: [Professors]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - PName
 *             properties:
 *               PName:
 *                 type: string
 *     responses:
 *       201:
 *         description: Professor added successfully
 */
router.post('/', professorController.addProfessor);

/**
 * @swagger
 * /api/professer:
 *   put:
 *     summary: Update professor name
 *     tags: [Professors]
 *     parameters:
 *       - in: query
 *         name: ID
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: PName
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Professor updated successfully
 */
router.put('/', professorController.updateProfessorName);


/**
 * @swagger
 * /api/professer/{ID}:
 *   delete:
 *     summary: Delete a professor by ID
 *     tags: [Professors]
 *     parameters:
 *       - in: path
 *         name: ID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Professor deleted successfully
 */
router.delete('/:ID', professorController.deleteProfessorById);

module.exports = router;
