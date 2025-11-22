const pool = require('../configs/dbConnection');

const CategoryModel = {
    getAllCategories: async () => {
        const query = "SELECT * FROM categories ORDER BY id DESC";
        const result = await pool.query(query);
        return result.rows;
    },

    getCategoryByID: async (categoryId) => {
        const query = "SELECT * FROM categories WHERE id = $1";
        const result = await pool.query(query, [categoryId]);
        return result.rows[0];
    },

    createCategory: async (name) => {
        const query = "INSERT INTO categories(name, created_at) VALUES ($1, NOW()) RETURNING*";
        const result = await pool.query(query,[name]);
        return result.rows[0];
    },

    updateCategory: async (categoryId, name) => {
        const query = "UPDATE categories SET name = $1, updated_at = NOW() WHERE id = $2 RETURNING*";
        const result = await pool.query(query,[name, categoryId]);
        return result.rows[0];
    },

    deleteCategory: async (categoryId) => {
        const query = "DELETE FROM categories WHERE id = $1";
        const result = await pool.query(query,[categoryId]);
        return result.rowCount;
    }
}

module.exports = CategoryModel;