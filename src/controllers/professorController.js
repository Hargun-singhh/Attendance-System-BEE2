const Professor = require('../Model/Professor');

exports.allProfessors = async (req, res) => {
    try {
        const professors = await Professor.find({});
        if (professors.length === 0) {
            return res.status(404).json({ message: "No professors found" });
        }
        res.status(200).json(professors);
    } catch (error) {
        res.status(500).json({ message: "Error fetching professors", error: error.message });
    }
};

exports.addProfessor = async (req, res) => {
    const { PName, ID } = req.body;

    if (!PName || !ID) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    try {
        const newProfessor = new Professor({
            PName,
            ID: parseInt(ID)
        });

        const savedProfessor = await newProfessor.save();
        res.status(201).json({ message: "Professor record added successfully :)", professor: savedProfessor });
    } catch (error) {
        res.status(500).json({ message: "Failed to add professor", error: error.message });
    }
};

exports.updateProfessorName = async (req, res) => {
    const { ID, PName } = req.query;

    try {
        const updatedProfessor = await Professor.findOneAndUpdate(
            { ID: parseInt(ID) },
            { PName },
            { new: true }
        );

        if (!updatedProfessor) {
            return res.status(404).json({ message: "Professor not found" });
        }

        res.status(200).json({ message: "Professor name updated successfully", professor: updatedProfessor });
    } catch (error) {
        res.status(500).json({ message: "Failed to update professor", error: error.message });
    }
};
exports.deleteProfessorById = async (req, res) => {
    const { ID } = req.params;

    try {
        const deletedProfessor = await Professor.findOneAndDelete({ ID: parseInt(ID) });

        if (!deletedProfessor) {
            return res.status(404).json({ message: "Professor not found" });
        }

        res.status(200).json({ message: "Professor deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete professor", error: error.message });
    }
};
