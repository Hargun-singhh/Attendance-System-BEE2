const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const studentRoutes = require('../src/routes/studentRoutes');
const CourseRoutes = require('../src/routes/CourseRoutes');
const coursesRouter = require('./routes/courses');
const attendanceRouter = require('./routes/attendance');

const logger = require('../src/middleware/logger');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(logger);
app.use(express.json());

app.use('/api/students', studentRoutes);
app.use('/api/course', CourseRoutes);
app.use('/api', coursesRouter);
app.use('/api', attendanceRouter);

module.exports = app; 
