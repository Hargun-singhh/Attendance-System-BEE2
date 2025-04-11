const Student = require('../Model/Student');

exports.allstudents = async (req, res) => {
    try {
        const students = await Student.find();
        if (students.length === 0) {
            return res.status(404).json({ message: "No students found" });
        }
        res.status(200).json(students);
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

exports.addstudent = async (req, res) => {
    const { SName, RollNumber } = req.body;

    if (!SName || !RollNumber) {
        return res.status(400).json({ message: "Missing required parameters" });
    }

    try {
        const newStudent = new Student({ SName, RollNumber: parseInt(RollNumber) });
        await newStudent.save();
        res.status(201).json({ message: "Student Record Added Successfully :)" });
    } catch (err) {
        res.status(500).json({ message: "Failed to add student", error: err.message });
    }
};

exports.updateStudentName = async (req, res) => {
    const { RollNumber } = req.params;
    const { SName } = req.body;

    try {
        const student = await Student.findOneAndUpdate(
            { RollNumber: parseInt(RollNumber) },
            { SName },
            { new: true }
        );

        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }

        res.status(200).json({ message: "Student name updated successfully", student });
    } catch (err) {
        res.status(500).json({ message: "Update failed", error: err.message });
    }
};

exports.deleteStudentByRollNo = async (req, res) => {
    const { RollNumber } = req.params;

    try {
        const student = await Student.findOneAndDelete({ RollNumber: parseInt(RollNumber) });

        if (!student) {
            return res.status(404).json({ message: "No such student exists" });
        }

        res.status(200).json({ message: "Student Record deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: "Delete failed", error: err.message });
    }
};
