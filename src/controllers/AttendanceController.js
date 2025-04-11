const Attendance = require('../Model/Attendance');
const Student = require('../Model/Student');
const Course = require('../Model/Course');

exports.makeAttendance = async (req, res) => {
    const { rollNo, courseId, status } = req.query;

    if (!rollNo || !courseId || !status) {
        return res.status(400).json({ message: "Missing required parameters" });
    }

    try {
        const student = await Student.findOne({ RollNumber: rollNo });
        if (!student) {
            return res.status(404).json({ message: "No Student Found in Records" });
        }

        const course = await Course.findOne({ id: parseInt(courseId) });
        if (!course) {
            return res.status(404).json({ message: "No Course Found in Records" });
        }

        const attendanceRecord = new Attendance({
            studentId: student._id,
            courseId: course._id,
            status
        });

        const saved = await attendanceRecord.save();
        res.status(201).json({ message: "Attendance Marked", record: saved });

    } catch (error) {
        res.status(500).json({ message: "Error saving attendance", error: error.message });
    }
};



exports.getAttendanceByCourse = async (req, res) => {
    const { courseId } = req.query;

    if (!courseId) {
        return res.status(400).json({ message: "Missing courseId parameter" });
    }

    try {
        const course = await Course.findOne({ id: parseInt(courseId) });
        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }

        const records = await Attendance.find({ courseId: course._id }).populate('studentId', 'SName RollNumber');

        if (records.length === 0) {
            return res.status(404).json({ message: "No attendance records found for this course" });
        }

        res.status(200).json({ attendance: records });

    } catch (error) {
        res.status(500).json({ message: "Error fetching attendance", error: error.message });
    }
};

exports.updateAttendance = async (req, res) => {
    const { rollNo, courseId, status } = req.query;

    if (!rollNo || !courseId || !status) {
        return res.status(400).json({ message: "Missing required parameters" });
    }

    try {
        const course = await Course.findOne({ id: parseInt(courseId) });
        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }

        const student = await Student.findOne({ RollNumber: rollNo });
        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }

        const updated = await Attendance.findOneAndUpdate(
            { studentId: student._id, courseId: course._id },
            { status },
            { new: true }
        );

        if (!updated) {
            return res.status(404).json({ message: "Attendance record not found" });
        }

        res.status(200).json({ message: "Attendance status updated", record: updated });

    } catch (error) {
        res.status(500).json({ message: "Error updating attendance", error: error.message });
    }
};

exports.delAttendance = async (req, res) => {
    const { rollNo, courseId } = req.query;

    if (!rollNo || !courseId) {
        return res.status(400).json({ message: "Missing required parameters" });
    }

    try {
        const course = await Course.findOne({ id: parseInt(courseId) });
        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }

        const student = await Student.findOne({ RollNumber: rollNo });
        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }

        const deleted = await Attendance.findOneAndDelete({
            studentId: student._id,
            courseId: course._id
        });

        if (!deleted) {
            return res.status(404).json({ message: "Attendance record not found" });
        }

        res.status(200).json({ message: "Attendance deleted", deleted });

    } catch (error) {
        res.status(500).json({ message: "Error deleting attendance", error: error.message });
    }
};
