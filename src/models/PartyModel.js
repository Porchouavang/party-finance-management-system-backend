const pool = require('../configs/dbConnection');

const PartyModel = {
    getAllPartiesByCategory: async (categoryId) => {
        const query = "SELECT parties.id, parties.name, categories.name as category, parties.created_at FROM parties INNER JOIN categories ON parties.category_id = categories.id WHERE parties.category_id = $1 ORDER BY parties.id";
        const result = await pool.query(query, [categoryId]);
        return result.rows;
    },

    getPartyByID: async (partyId) => {
        const query = "SELECT * FROM parties WHERE id = $1";
        const result = await pool.query(query, [partyId]);
        return result.rows[0];
    },

    createParty: async (name, categoryId) => {
        const query = "INSERT INTO parties(name, category_id, created_at) VALUES ($1, $2, NOW()) RETURNING*";
        const result = await pool.query(query,[name, categoryId]);
        return result.rows[0];
    },

    updateParty: async (partyId, name) => {
        const query = "UPDATE parties SET name = $1 WHERE id = $2 RETURNING*";
        const result = await pool.query(query,[name, partyId]);
        return result.rows[0];
    },

    deleteParty: async (partyId) => {
        const query = "DELETE FROM parties WHERE id = $1";
        const result = await pool.query(query,[partyId]);
        return result.rowCount;
    }
}

module.exports = PartyModel;