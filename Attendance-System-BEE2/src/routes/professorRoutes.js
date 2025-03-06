const express = require("express");
const router = express.Router();
const professorController = require('../controllers/professorController');

router.get('/', professorController.allProfessors);
router.post('/', professorController.addProfessor);
router.put('/:id', professorController.updateProfessorName);
router.delete('/:id', professorController.deleteProfessorById);

module.exports = router;
