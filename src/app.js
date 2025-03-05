const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const studentRoutes = require('../src/routes/studentRoutes');
const CourseRoutes = require('../src/routes/CourseRoutes');
const logger = require('../src/middleware/logger');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(logger);

app.use('/api/students', studentRoutes);
app.use('/api/course', CourseRoutes);

module.exports = app; 
