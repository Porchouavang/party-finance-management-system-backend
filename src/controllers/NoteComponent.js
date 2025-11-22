const NoteModel = require('../models/NoteModel');
const NoteController = {
    getAllNotesByparty: async (req, res) => {
        const {partyId} = req.params;
        try {
            const parties = await NoteModel.getAllNotesByparty(partyId);
            res.status(200).json(parties);
        } catch (error){
            console.error("Error fetching parties", error);
            res.status(500).json({message: "Server Error"});
        }
    },
    getAllDetailsNotesByparty: async (req, res) => {
        const {partyId} = req.params;
        try {
            const parties = await NoteModel.getAllDetailsNotesByparty(partyId);
            res.status(200).json(parties);
        } catch (error){
            console.error("Error fetching parties", error);
            res.status(500).json({message: "Server Error"});
        }
    },
    getNoteByID: async (req, res) => {
        const {id} = req.params;
        try {
            const Note = await NoteModel.getNoteByID(id);
            if (!Note) {
                res.status(404).json({message: "Note not found"});
            }
            res.status(200).json(Note);
        } catch (error){
            console.error("Error fetching Note", error);
            res.status(500).json({message: "Server Error"});
        }
    },

    createNote: async (req, res) => {
        const {content, partyId} = req.body;
        try {
            const newNote = await NoteModel.createNote(content, partyId);
            res.status(201).json({message: "Note created Successfully", note: newNote});
        } catch (error) {
            console.error("Error create Note", error);
            res.status(500).json({message:"Server Error"});
        }
    },
    updateNote: async (req, res) => {
        const {id} = req.params;
        const {content} = req.body;
        try {
            const updateNote = await NoteModel.updateNote(id, content);
            if (!updateNote) {
                res.status(404).json({message: "Note not found"});
            }
            res.status(200).json({message: "Note updated successfully", note: updateNote});
        } catch (error) {
            console.error("Error Update Party",error);
            res.status(500).json({message: "Server Error"});
        }
    },
    deleteNote: async (req, res) => {
        const {id} = req.params;

        try{
            const rowDeleted = await NoteModel.deleteNote(id);
            if (!rowDeleted){
                res.status(404).json({message: "Party Not found"});
            }
            res.status(200).json({message: "Party has been delete successfully"});
        } catch (error) {
            console.error("Delete Party Error",error);
            res.status(500).json({message: "Server Error"});
        }
    },
    
}

module.exports = NoteController;