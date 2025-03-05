const students = require('../data/students');

exports.allstudents = (req, res) => {
    if (students.length === 0) {
        return res.status(404).json({ message: "No students found" });
    }
    res.status(200).json(students);
};

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