const express = require('express');
const router = express.Router();
const dataStore = { attendanceRecords: [], attendanceId: 1 };

router.post('/attendance', (req, res) => { const { studentId, courseId, status } = req.query; if (!studentId || !courseId || !status) return res.status(400).json({ error: 'Missing parameters' }); const record = { id: dataStore.attendanceId++, studentId, courseId, status }; dataStore.attendanceRecords.push(record); res.status(201).json(record); });

router.put('/attendance', (req, res) => { const { id, status } = req.query; const record = dataStore.attendanceRecords.find(r => r.id == id); if (!record) return res.status(404).json({ error: 'Not found' }); record.status = status; res.json(record); });

router.delete('/attendance', (req, res) => { const { id } = req.query; const index = dataStore.attendanceRecords.findIndex(r => r.id == id); if (index === -1) return res.status(404).json({ error: 'Not found' }); const deleted = dataStore.attendanceRecords.splice(index, 1); res.json(deleted); });

module.exports = router;