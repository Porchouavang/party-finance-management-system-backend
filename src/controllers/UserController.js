const UserModel = require('../models/UserModel');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const UserController = {
   
    getUserDetails: async (req, res) => {
        try {
          // Make sure user_id is present in the JWT token
          if (!req.user || !req.user.user_id) {
            return res.status(401).json({ message: "Unauthorized: No user_id in token" });
          }
    
          const user = await UserModel.getUserById(req.user.user_id);
          
          if (!user) {
            return res.status(404).json({ message: "User not found" });
          }
    
          // Send the user details back in the response
          res.json({
            user_id: user.user_id,
            first_name: user.first_name,
            last_name: user.last_name,
            role: user.role,
          });
        } catch (error) {
            console.error("Error in getUserDetails:", error);
            res.status(500).json({ message: "Server error", error: error.message });
          }
      },
    getUserRole: async (req, res) => {
        try {
            console.log("User from token:", req.user);  // Debug user data
            if (!req.user || !req.user.user_id) {
                return res.status(401).json({ message: "Unauthorized: No user_id in token" });
            }
    
            const userId = req.user.user_id;
            console.log("Fetching role for user_id:", userId);
    
            const role = await UserModel.getUserRole(userId);
            if (role) {
                res.json({ role });
            } else {
                res.status(404).json({ message: "User role not found" });
            }
        } catch (error) {
            console.error("Error in getUserRole:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    },
    
    


    getAllEmployees: async (req, res) => {
        try {
            const { limit = 10, offset = 0 } = req.query; // Get limit and offset from query parameters
            const employees = await UserModel.getAllEmployees(parseInt(limit), parseInt(offset));
            res.status(200).json(employees);
        } catch (error) {
            console.error("Error fetching employee", error);
            res.status(500).json({ message: "Server Error" });
        }
    },

    getEmployeeByID: async (req, res) => {
        const { id } = req.params;
        try {
            const employee = await UserModel.getEmployeeByID(id);
            if (!employee) {
                return res.status(404).json({ message: "Employee not found" });
            }
            res.status(200).json(employee);
        } catch (error) {
            console.error("Error fetching employee", error);
            res.status(500).json({ message: "Server Error" });
        }
    },

    createEmployee: async (req, res) => {
    
        const {
            first_name,
            last_name,
            email,
            password,
            phone,
            role_id
        } = req.body;
    
        try {
            // Hash password before saving (assumes bcrypt is used)
            const bcrypt = require('bcryptjs');
            const existingUser = await UserModel.getEmployeeByPhone(phone);
                if(existingUser){
                    return res.status(400).json({message: "Phone already exist"});
                }
            const saltRounds = 10;
            const HashPassword = await bcrypt.hash(password, saltRounds);
    
            const newEmployee = await UserModel.createEmployee(
                first_name,
                last_name,
                email,
                HashPassword,
                phone,
                role_id
            );
    
            res.status(201).json({
                message: "Employee created successfully",
                employee: newEmployee
            });
        } catch (error) {
            console.error("Error creating Employee", error);
            res.status(500).json({ message: "Server error" });
        }
    },    
    updateEmployee: async (req, res) => {
        const { id } = req.params;
        const {
            
            first_name,
            last_name,
            password,
            phone,
            position,
            // time_work_id,
            
        } = req.body;
    
        // Handle file upload for profile picture
       
        try {
            
            let hashedPassword = null;
            if (password) {
                hashedPassword = await bcrypt.hash(password, 10);
            }
    
            const updateEmployee = await UserModel.updateEmployee(
                id,
                first_name,
                last_name,
                hashedPassword || null, // Use hashed password if provided
                phone,
                position,
                // time_work_id,
                
            );
    
            if (!updateEmployee) {
                return res.status(404).json({ message: "Employee not found" });
            }
    
            res.status(200).json({ message: "Employee updated successfully", employee: updateEmployee });
        } catch (error) {
            console.error("Error updating Employee", error);
            res.status(500).json({ message: "Server Error" });
        }
    },

    
    deleteEmployee: async (req, res) => {
        const { id } = req.params;
        try {
            const rowDeleted = await UserModel.deleteEmployee(id);
            if (rowDeleted === 0) {
                return res.status(404).json({ message: "Employee not found" });
            }
            res.status(200).json({ message: "Employee has been deleted successfully" });
        } catch (error) {
            console.error("Delete Employee Error", error);
            res.status(500).json({ message: "Server Error" });
        }
    },
    loginEmployee: async (req, res) => {
        const { phone, password } = req.body;

        const bcrypt = require('bcryptjs');
        try {
            console.log("Received phone:", phone); // Log the received phone number
            const user = await UserModel.getEmployeeByPhone(phone);
    
            if (!user) {
                return res.status(401).json({ message: "Invalid phone number or password" });
            }
    
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(401).json({ message: "Invalid phone number or password" });
            }
    
            console.log("JWT Secret Key:", process.env.JWT_KEY); // Log the JWT secret key
            const token = jwt.sign({ user_id: user.user_id, role: user.role }, process.env.JWT_KEY, { expiresIn: "3h" });

    
            res.status(200).json({
                message: "Login successful",
                user: {
                    id: user.user_id,
                    first_name: user.first_name,
                    last_name: user.last_name,
                    email: user.email,
                    role: user.role
                },
                token,
            });
        } catch (error) {
            console.error("Error logging in:", error);
            res.status(500).json({ message: "Server error" });
        }
    },
    searchEmployeeByPhone: async (req, res) => {
        const { phone } = req.query; // Get the phone from query parameters
        try {
            const employees = await UserModel.searchEmployeeByPhone(phone);
            if (employees.length === 0) {
                return res.status(404).json({ message: "No bank accounts found with that name" });
            }
            res.status(200).json(employees);
        } catch (error) {
            console.error("Error searching bank accounts", error);
            res.status(500).json({ message: "Server error" });
        }
    },
    ReportEmployee: async (req, res) => {
        try {
            const reportemployee = await UserModel.ReportEmployee();
            res.status(200).json(reportemployee);
        } catch (error) {
            console.error("Error fetching employee", error);
            res.status(500).json({ message: "Server Error" });
        }
    },
    getCountEmployee: async (req, res) => {
        try {
            const countemployee = await UserModel.getCountEmployee();
            res.status(200).json(countemployee);
        } catch (error) {
            console.error("Error fetching employee", error);
            res.status(500).json({ message: "Server Error" });
        }
    },
};

module.exports = UserController;
