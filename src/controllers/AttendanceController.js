const attendances = require('../data/attendance')
const students = require('../data/students');
const courses = require('../data/Course');

exports.makeAttendance = (req, res) => {
    
    const { id, courseId, status } = req.query;
    console.log("Input courseId:", courseId);

    if (!id || !courseId || !status) {
        return res.status(400).json({ message: "Missing required parameters" });
    }

    const student = students.find(student => student.id === parseInt(id));
   

    if (!student) {
        return res.status(404).json({ message: "No Student Found in Records" });
    }

    const attendanceRecord = {
        sno: attendances.length + 1,
        id: student.id,
        name: student.StudentName, 
        courseId: parseInt(courseId),
        status
    };

    attendances.push(attendanceRecord);
    res.status(201).json({ message: "Attendance Marked", "Student Details": attendanceRecord });
};



exports.getAttendanceByCourse = (req, res) => {
    const { courseId } = req.query;

    if (!courseId) {
        return res.status(400).json({ message: "Missing courseId parameter" });
    }

    const filteredAttendance = attendances.filter(a => a.courseId === parseInt(courseId));

    if (filteredAttendance.length === 0) {
        return res.status(404).json({ message: "No attendance records found for this course" });
    }

    res.status(200).json({ attendance: filteredAttendance });
};


// Update Karne ke Liye
exports.updateAttendance = (req, res) => {
    const { id, courseId, status } = req.query;

    if (!id || !courseId || !status) {
        return res.status(400).json({ message: "Missing required parameters" });
    }

    const attendance = attendances.find(a => a.id === parseInt(id) && a.courseId === parseInt(courseId));

    if (!attendance) {
        return res.status(404).json({ message: "Attendance record not found" });
    }

    attendance.status = status;
    res.status(200).json({ message: "Attendance status updated successfully", "Updated Attendance": attendance });
};


// Delete Attendance Records 
exports.delAttendance = (req, res) => {
    const { id, courseId } = req.query;

    if (!id || !courseId) {
        return res.status(400).json({ message: "Missing required parameters" });
    }

    const index = attendances.findIndex(a => a.id === parseInt(id) && a.courseId === parseInt(courseId));

    if (index === -1) {
        return res.status(404).json({ message: "Attendance record not found" });
    }

    attendances.splice(index, 1);
    res.status(200).json({ message: "Attendance record deleted successfully" });
};