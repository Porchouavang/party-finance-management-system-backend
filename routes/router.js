const express = require('express');
const RoleController = require('../src/controllers/RoleController');
const UserController = require('../src/controllers/UserController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/role/select', RoleController.getAllRoles);
router.get('/role/select/:id', RoleController.getRoleByID);
router.post('/role/create', RoleController.createRole);
router.put('/role/update/:id', RoleController.updateRole);
router.delete('/role/delete/:id', RoleController.deleteRole);
router.get("/user/role", authMiddleware.authenticateToken, UserController.getUserRole);
router.get("/user/details", authMiddleware.authenticateToken, UserController.getUserDetails);
router.get("/user/select", UserController.getAllEmployees);
router.post("/user/create", authMiddleware.authenticateToken, UserController.createEmployee);
router.post("/adminlogin", UserController.loginEmployee);


module.exports = router;