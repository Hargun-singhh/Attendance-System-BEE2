const express = require("express");
const router = express.Router();
const studentController = require('../controllers/studentController');



router.get('/',studentController.allstudents);
router.post('/',studentController.addstudent);


module.exports = router;studentController