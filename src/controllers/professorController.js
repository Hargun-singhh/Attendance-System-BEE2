const professors = require('../data/professor');


exports.allProfessors = (req, res) => {
    if (professors.length === 0) {
        return res.status(404).json({ message: "No professors found" });
    }
    res.status(200).json(professors);
};

exports.addProfessor = (req, res) => {
    const { PName, Id_ } = req.body;

    const professorDetails = {
        id: professors.length + 1,
        professorName: PName,
        ID: parseInt(Id_)
    };

    professors.push(professorDetails);
    res.status(201).json({ message: "Professor record added successfully :)", professor: professorDetails });
};


exports.updateProfessorName = (req, res) => {
    const { id } = req.params;
    const { PName } = req.body;

    const professor = professors.find(p => p.ID === parseInt(id));

    if (!professor) {
        return res.status(404).json({ message: "Professor not found" });
    }

    professor.professorName = PName;
    res.status(200).json({ message: "Professor name updated successfully", professor });
};


exports.deleteProfessorById = (req, res) => {
    const { id } = req.params;
    const index = professors.findIndex(p => p.ID === parseInt(id));

    if (index === -1) {
        return res.status(404).json({ message: "Professor not found" });
    }

    professors.splice(index, 1);
    res.status(200).json({ message: "Professor deleted successfully" });
};
