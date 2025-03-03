const students = require('../data/students');


exports.allstudents = (req,res) =>{
    if (students.length === 0) {
        return res.status(404).json({ message: "No students found" });
    }
    res.status(200).json(students);
};

exports.addstudent = (req,res) =>{
    const data = req.body;
    students.push(data);
    res.status(201).json({message: "Student Record Added Successfully :) "});
};