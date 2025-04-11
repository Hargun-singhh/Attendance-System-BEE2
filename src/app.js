const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const logger = require('./middleware/logger');

const studentRoutes = require('./routes/studentRoutes');
const CourseRoutes = require('./routes/CourseRoutes');
const AttendanceRoutes = require('./routes/AttendanceRoutes');
const ProfesserRoutes = require('./routes/professorRoutes');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(logger);

app.use('/api/students', studentRoutes);
app.use('/api/course', CourseRoutes);
app.use('/api/attendance', AttendanceRoutes);
app.use('/api/professer', ProfesserRoutes);

module.exports = app;
