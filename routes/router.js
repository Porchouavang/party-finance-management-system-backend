const express = require("express");
const UserController = require("../src/controllers/UserController");
const authMiddleware = require("../middleware/authMiddleware");
const CategoryController = require("../src/controllers/CategoryController");
const PartyController = require("../src/controllers/PartyController");
const FinanceController = require("../src/controllers/FinanceController");
const NoteController = require("../src/controllers/NoteComponent");
const router = express.Router();

// LOGIN (NO AUTH)
router.post("/adminlogin", UserController.loginEmployee);


router.get("/user/role", authMiddleware.authenticateToken, UserController.getUserRole);
router.get("/user/details", authMiddleware.authenticateToken, UserController.getUserDetails);
router.get("/user/select", authMiddleware.authenticateToken,UserController.getAllEmployees);
router.post("/user/create", authMiddleware.authenticateToken, UserController.createEmployee);


router.get("/category/select", authMiddleware.authenticateToken, CategoryController.getAllCategories);
router.get("/category/select-by-id/:id", CategoryController.getCategoryByID);
router.post("/category/create", authMiddleware.authenticateToken, CategoryController.createCategory);
router.put("/category/update/:id", authMiddleware.authenticateToken, CategoryController.updateCategory);
router.delete("/category/delete/:id", authMiddleware.authenticateToken, CategoryController.deleteCategory);


router.get("/party/select-by-category/:categoryId", authMiddleware.authenticateToken, PartyController.getAllPartiesByCategory);
router.get("/party/select-by-id/:id", authMiddleware.authenticateToken, PartyController.getPartyByID);
router.post("/party/create", authMiddleware.authenticateToken, PartyController.createParty);
router.put("/party/update/:id" , authMiddleware.authenticateToken, PartyController.updateParty);
router.delete("/party/delete/:id", authMiddleware.authenticateToken, PartyController.deleteParty);


router.get("/finance/select-income-by-party/:partyId", authMiddleware.authenticateToken, FinanceController.getAllIncomesByparty);
router.get("/finance/select-expenditure-by-party/:partyId", authMiddleware.authenticateToken, FinanceController.getAllExpendituresByparty);
router.get("/finance/select-details-income-by-party/:partyId", authMiddleware.authenticateToken, FinanceController.getAllDetailsIncomesByparty);
router.get("/finance/select-details-expenditure-by-party/:partyId", authMiddleware.authenticateToken, FinanceController.getAllDetailsExpendituresByparty);
router.get("/finance/select-by-id/:id", authMiddleware.authenticateToken, FinanceController.getFinanceByID);
router.post("/finance/create-income", authMiddleware.authenticateToken, FinanceController.createIncome);
router.post("/finance/create-expenditure", authMiddleware.authenticateToken, FinanceController.createExpenditure);
router.get("/finance/sum-income-by-party/:partyId", authMiddleware.authenticateToken, FinanceController.getSumIncomesByparty);
router.get("/finance/sum-income-today-by-party/:partyId", authMiddleware.authenticateToken, FinanceController.getSumIncomesTodayByparty);
router.get("/finance/sum-expenditure-by-party/:partyId", authMiddleware.authenticateToken, FinanceController.getSumExpendituresByparty);
router.get("/finance/sum-remaining-by-party/:partyId", authMiddleware.authenticateToken, FinanceController.getSumRemainingByparty);
// router.post("/finance/create", authMiddleware.authenticateToken, FinanceController.createFinance);
router.put("/finance/update-income/:id", authMiddleware.authenticateToken, FinanceController.updateIncome);
router.put("/finance/update-expenditure/:id", authMiddleware.authenticateToken, FinanceController.updateExpenditure);
router.delete("/finance/delete/:id", authMiddleware.authenticateToken, FinanceController.deleteFinance);

router.get("/finance/sum-income-chart", FinanceController.getSumIncomesChartByparty);
router.get("/finance/sum-expenditure-chart", FinanceController.getSumExpendituresChartByparty);
router.get("/finance/sum-income-chart-by-category/:categoryId", FinanceController.getSumIncomeChartByCategory);
router.get("/finance/sum-expenditure-chart-by-category/:categoryId", FinanceController.getSumExpenditureChartByCategory);
router.get("/finance/sum-income-chart-by-party-id/:partyId", FinanceController.getSumIncomeChartByPartyId);
router.get("/finance/sum-expenditure-chart-by-party-id/:partyId", FinanceController.getSumExpenditureChartByPartyId);

router.get("/note/select-by-party/:partyId", authMiddleware.authenticateToken, NoteController.getAllNotesByparty);
router.get("/note/select-details-by-party/:partyId", authMiddleware.authenticateToken, NoteController.getAllDetailsNotesByparty);
router.get("/note/select-by-id/:id", authMiddleware.authenticateToken, NoteController.getNoteByID);
router.post("/note/create", authMiddleware.authenticateToken, NoteController.createNote);
router.put("/note/update/:id", authMiddleware.authenticateToken, NoteController.updateNote);
router.delete("/note/delete/:id", authMiddleware.authenticateToken, NoteController.deleteNote);

module.exports = router;
