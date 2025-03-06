const students = require('../data/students');

//Show all students
exports.allstudents = (req, res) => {
    if (students.length === 0) {
        return res.status(404).json({ message: "No students found" });
    }
    res.status(200).json(students);
};

//Add a new student
exports.addstudent = (req, res) => {
    const {SName, RollNumber } = req.body;

    const StundentDetails = {
        id: students.length + 1,
        StudentName: SName,
        RollNumber : parseInt(RollNumber)

    };

    students.push(StundentDetails);
    res.status(201).json({ message: "Student Record Added Successfully :) " });
};

// Update Student Name
exports.updateStudentName = (req, res) => {
    const { roll_no } = req.params; 
    const { name } = req.body; 
    const student = students.find(s => s.roll_no === parseInt(roll_no));

    if (!student) {
        return res.status(404).json({ message: "Student not found" });
    }

    student.name = name;
    res.status(200).json({ message: "Student name updated successfully", student });
};

// Delete Student record by its roll No
exports.deleteStudentByRollNo = (req, res) => {
    const { roll_no } = req.params;
    const index = students.findIndex(student => student.roll_no === parseInt(roll_no));

    if (index === -1) {
        return res.status(404).json({ message: "No such student exists" });
    }

    students.splice(index, 1);
    res.status(200).json({ message: "Student Record deleted successfully" });
};
