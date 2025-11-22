const pool = require('../configs/dbConnection');

const NoteModel = {
    getAllNotesByparty: async (partyId) => {
        const query = "SELECT notes.id, notes.content, parties.name as party, notes.created_at FROM notes INNER JOIN parties ON notes.party_id = parties.id WHERE notes.party_id = $1 ORDER BY notes.id DESC LIMIT 20";
        const result = await pool.query(query, [partyId]);
        return result.rows;
    },
    getAllDetailsNotesByparty: async (partyId) => {
        const query = "SELECT notes.id, notes.content, parties.name as party, notes.created_at FROM notes INNER JOIN parties ON notes.party_id = parties.id WHERE notes.party_id = $1 ORDER BY notes.id DESC";
        const result = await pool.query(query, [partyId]);
        return result.rows;
    },
    getNoteByID: async (noteId) => {
        const query = "SELECT * FROM notes WHERE id = $1";
        const result = await pool.query(query, [noteId]);
        return result.rows[0];
    },

    createNote: async (content, partyId) => {
        const query = "INSERT INTO notes(content, party_id, created_at) VALUES ($1, $2, NOW()) RETURNING*";
        const result = await pool.query(query,[content, partyId]);
        return result.rows[0];
    },
    updateNote: async (id, content) => {
        const query = "UPDATE notes SET content = $1 WHERE id = $2 RETURNING*";
        const result = await pool.query(query,[content, id]);
        return result.rows[0];
    },

    deleteNote: async (noteId) => {
        const query = "DELETE FROM notes WHERE id = $1";
        const result = await pool.query(query,[noteId]);
        return result.rowCount;
    }
}

module.exports = NoteModel;