const students = require('../data/students');


exports.allstudents = (req,res) =>{
    res.status(200).json(students);
};

exports.addstudent = (req,res) =>{
    const data = req.body;
    students.push(data);
    res.status(201).json({"Status":"Student Record Added Successfully :) "});
};