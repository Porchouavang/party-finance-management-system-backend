const pool = require('../configs/dbConnection');

const UserModel = {
    getUserById: async (userId) => {
        try {
          const query = `
            SELECT users.user_id, users.first_name, users.last_name, roles.title AS role
            FROM users 
            JOIN roles ON users.role_id = roles.id
            WHERE users.user_id = $1
          `;
          const result = await pool.query(query, [userId]);
    
          // Check if a user was found, otherwise return null
          return result.rows[0] || null; 
        } catch (error) {
          console.error("Error fetching user details", error);
          throw new Error('Error fetching user details');
        }
      },

// All Employees
getAllEmployees: async (limit = 10, offset = 0) => {
    const query = `SELECT users.user_id,
    users.first_name, 
    users.last_name, 
    users.email, 
    users.password, 
    users.phone,
    roles.title, 
    users.created_at 
    FROM users 
    JOIN roles ON users.role_id = roles.id 
    LIMIT $1 OFFSET $2`;
    
    const result = await pool.query(query, [limit, offset]);
    return result.rows;
},

getEmployeeByPhone: async (phone) => {
    const query = `SELECT users.user_id,
    users.first_name, 
    users.last_name, 
    users.email, 
    users.password, 
    users.phone,
    roles.title AS role, 
    users.created_at FROM users JOIN roles on users.role_id = roles.id WHERE users.phone = $1`;
    const result = await pool.query(query, [phone]);
    return result.rows[0];
},
getUserRole: async (userId) => {
    try {
        const query = `
            SELECT roles.title, users.user_id
            FROM users
            JOIN roles ON users.role_id = roles.id
            WHERE users.user_id = $1
        `;

        const result = await pool.query(query, [userId]);

        if (result.rows.length > 0) {
            return result.rows[0].title;
        } else {
            return null; // Or throw an error, depending on your error handling strategy
        }
    } catch (error) {
        console.error('Error fetching user role from database:', error);
        throw error; // Re-throw the error to be handled in the controller
    }
},
getEmployeeByID: async (User_Id) => {
    const query = `SELECT users.user_id,
    users.first_name, 
    users.last_name, 
    users.email, 
    users.password, 
    users.phone,
    roles.title, 
    users.created_at FROM users JOIN roles on users.role_id = roles.id WHERE user_id = $1`;
    const result = await pool.query(query, [User_Id]);
    return result.rows[0];
},

    createEmployee: async (
        first_name, last_name, email, HashPassword, phone,
                role_id
    ) => {
        const query = `
            INSERT INTO users (
                first_name, last_name, email, password, phone,
                 role_id, created_at
            ) 
            VALUES (
                $1, $2, $3, $4, $5, $6, NOW()
            ) RETURNING *;
        `;
        
        const result = await pool.query(query, [
            first_name, last_name, email, HashPassword, phone,
            role_id
        ]);
        
        return result.rows[0];
    },    

    updateEmployee: async (
    User_Id, first_name, last_name, HashPassword, phone, position
) => {
    const query = `
        UPDATE users
SET 
  first_name = $1,
  last_name = $2,
  password = $3,
  phone = $4,
  updated_at = NOW()
WHERE user_id = $5
RETURNING *
    `;
    
    const result = await pool.query(query, [first_name, last_name, HashPassword, phone, User_Id]
);
    
    return result.rows[0];
},

    deleteEmployee: async (User_Id) => {
        const query = "DELETE FROM users WHERE user_id = $1";
        const result = await pool.query(query, [User_Id]);
        return result.rowCount;
    },
    searchEmployeeByPhone: async (phone) => {
        const query = `SELECT users.user_id, 
        users.
        users.first_name, 
        users.last_name, 
        users.email, 
        users.password, 
        users.phone,
        roles.title, 
        users.created_at FROM users JOIN roles on users.role_id = roles.id WHERE users.phone ILIKE $1`;
        const result = await pool.query(query, [`%${phone}%`]); // Use wildcards for partial matching
        return result.rows;
    },
    ReportEmployee: async () => {
        const query = `SELECT users.user_id,
        users.first_name, 
        users.last_name, 
        users.email, 
        users.password, 
        users.phone,
        roles.title,
        users.created_at 
        FROM users
        JOIN roles ON users.role_id = roles.id`;
        
        const result = await pool.query(query);
        return result.rows;
    },
    getCountEmployee: async () => {
        const query = "SELECT COUNT(*) FROM users";
        const result = await pool.query(query);
        return result.rows[0].count;
    },
    
};

module.exports = UserModel;
