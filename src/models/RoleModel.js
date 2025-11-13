const pool = require('../configs/dbConnection');

const RoleModel = {
    getAllRoles: async () => {
        const query = "SELECT * FROM roles";
        const result = await pool.query(query);
        return result.rows;
    },

    getRoleByID: async (roleId) => {
        const query = "SELECT * FROM roles WHERE id = $1";
        const result = await pool.query(query, [roleId]);
        return result.rows[0];
    },

    createRole: async (title) => {
        const query = "INSERT INTO roles(title, created_at) VALUES ($1, NOW()) RETURNING*";
        const result = await pool.query(query,[title]);
        return result.rows[0];
    },

    updateRole: async (roleId, title) => {
        const query = "UPDATE roles SET title = $1, updated_at = NOW() WHERE id = $2 RETURNING*";
        const result = await pool.query(query,[title, roleId]);
        return result.rows[0];
    },

    deleteRole: async (roleId) => {
        const query = "DELETE FROM roles WHERE id = $1";
        const result = await pool.query(query,[roleId]);
        return result.rowCount;
    }
}

module.exports = RoleModel;