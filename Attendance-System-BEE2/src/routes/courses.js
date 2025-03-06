const express = require('express');
const router = express.Router();
const dataStore = { courses: [] };

router.get('/courses', (req, res) => res.json({ courses: dataStore.courses }));
router.post('/courses', (req, res) => { const name = req.query.name; if (!name) return res.status(400).json({ error: 'Course name is required' }); const course = { id: dataStore.courses.length + 1, name }; dataStore.courses.push(course); res.status(201).json(course); });

module.exports = router;