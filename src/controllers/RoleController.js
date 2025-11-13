const RoleModel = require('../models/RoleModel');
const RoleController = {
    getAllRoles: async (req, res) => {
        try {
            const roles = await RoleModel.getAllRoles();
            res.status(200).json(roles);
        } catch (error){
            console.error("Error fetching roles", error);
            res.status(500).json({message: "Server Error"});
        }
    },

    getRoleByID: async (req, res) => {
        const {id} = req.params;
        try {
            const role = await RoleModel.getRoleByID(id);
            if (!role) {
                res.status(404).json({message: "Role not found"});
            }
            res.status(200).json(role);
        } catch (error){
            console.error("Error fetching role", error);
            res.status(500).json({message: "Server Error"});
        }
    },


    createRole: async (req, res) => {
        const {title} = req.body;
        try {
            const newRole = await RoleModel.createRole(title);
            res.status(201).json({message: "Role created Successfully", role: newRole});
        } catch (error) {
            console.error("Error create role", error);
            res.status(500).json({message:"Server Error"});
        }
    },

    updateRole: async (req, res) => {
        const {id} = req.params;
        const {title} = req.body;
        try {
            const updateRole = await RoleModel.updateRole(id, title);
            if (!updateRole) {
                res.status(404).json({message: "Role not found"});
            }
            res.status(200).json({message: "Role updated successfully", role: updateRole});
        } catch (error) {
            console.error("Error Update role",error);
            res.status(500).json({message: "Server Error"});
        }
    },

    deleteRole: async (req, res) => {
        const {id} = req.params;

        try{
            const rowDeleted = await RoleModel.deleteRole(id);
            if (!rowDeleted){
                res.status(404).json({message: "Role Not found"});
            }
            res.status(200).json({message: "Role has been delete successfully"});
        } catch (error) {
            console.error("Delete Role Error",error);
            res.status(500).json({message: "Server Error"});
        }
    }
}

module.exports = RoleController;