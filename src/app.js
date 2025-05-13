const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');

const logger = require('./middleware/logger');

const studentRoutes = require('./routes/studentRoutes');
const courseRoutes = require('./routes/CourseRoutes');
const attendanceRoutes = require('./routes/AttendanceRoutes');
const professorRoutes = require('./routes/professorRoutes');

const Student = require('./Model/Student');
const Professor = require('./Model/Professor');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(logger);

app.use('/api/students', studentRoutes);
app.use('/api/course', courseRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/professer', professorRoutes);

app.get('/students/view/all', async (req, res) => {
    try {
        const students = await Student.find();
        res.render('students', { students });
    } catch (err) {
        res.status(500).send("Error loading students");
    }
});

app.get('/students/view/add', (req, res) => {
    res.render('addStudent');
});

app.post('/students/view/add', async (req, res) => {
    const { SName, RollNumber } = req.body;
    if (!SName || !RollNumber) {
        return res.render('addStudent', { error: "All fields are required" });
    }
    try {
        const newStudent = new Student({ SName, RollNumber: parseInt(RollNumber) });
        await newStudent.save();
        res.redirect('/students/view/all');
    } catch (err) {
        res.render('addStudent', { error: "Failed to add student" });
    }
});
const swaggerUiOptions = {
  customCss: `
    .swagger-ui .topbar { background-color: #4B0082; } 
    .swagger-ui .topbar .topbar-wrapper span { color: #fff !important; font-weight: bold; font-size: 20px; }
    .swagger-ui .info .title { color: #4B0082; }
    body { background-color: #f8f9fa; }
  `,
  customSiteTitle: 'Student API Docs',
  customfavIcon: 'https://cdn-icons-png.flaticon.com/512/1077/1077063.png', // Optional favicon
};

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec,swaggerUiOptions));

module.exports = app;
