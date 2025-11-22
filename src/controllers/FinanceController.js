const FinanceModel = require('../models/FinanceModel');
const FinanceController = {
    getAllIncomesByparty: async (req, res) => {
        const {partyId} = req.params;
        try {
            const parties = await FinanceModel.getAllIncomesByparty(partyId);
            res.status(200).json(parties);
        } catch (error){
            console.error("Error fetching parties", error);
            res.status(500).json({message: "Server Error"});
        }
    },
    getAllExpendituresByparty: async (req, res) => {
        const {partyId} = req.params;
        try {
            const parties = await FinanceModel.getAllExpendituresByparty(partyId);
            res.status(200).json(parties);
        } catch (error){
            console.error("Error fetching parties", error);
            res.status(500).json({message: "Server Error"});
        }
    },
    getAllDetailsIncomesByparty: async (req, res) => {
        const {partyId} = req.params;
        try {
            const parties = await FinanceModel.getAllDetailsIncomesByparty(partyId);
            res.status(200).json(parties);
        } catch (error){
            console.error("Error fetching parties", error);
            res.status(500).json({message: "Server Error"});
        }
    },
    getAllDetailsExpendituresByparty: async (req, res) => {
        const {partyId} = req.params;
        try {
            const parties = await FinanceModel.getAllDetailsExpendituresByparty(partyId);
            res.status(200).json(parties);
        } catch (error){
            console.error("Error fetching parties", error);
            res.status(500).json({message: "Server Error"});
        }
    },
    getSumIncomesByparty: async (req, res) => {
        const {partyId} = req.params;
        try {
            const parties = await FinanceModel.getSumIncomesByparty(partyId);
            res.status(200).json(parties);
        } catch (error){
            console.error("Error fetching parties", error);
            res.status(500).json({message: "Server Error"});
        }
    },
    getSumIncomesTodayByparty: async (req, res) => {
        const {partyId} = req.params;
        try {
            const parties = await FinanceModel.getSumIncomesTodayByparty(partyId);
            res.status(200).json(parties);
        } catch (error){
            console.error("Error fetching parties", error);
            res.status(500).json({message: "Server Error"});
        }
    },
    getSumRemainingByparty: async (req, res) => {
        const {partyId} = req.params;
        try {
            const parties = await FinanceModel.getSumRemainingByparty(partyId);
            res.status(200).json(parties);
        } catch (error){
            console.error("Error fetching parties", error);
            res.status(500).json({message: "Server Error"});
        }
    },
    getSumExpendituresByparty: async (req, res) => {
        const {partyId} = req.params;
        try {
            const parties = await FinanceModel.getSumExpendituresByparty(partyId);
            res.status(200).json(parties);
        } catch (error){
            console.error("Error fetching parties", error);
            res.status(500).json({message: "Server Error"});
        }
    },

    getFinanceByID: async (req, res) => {
        const {id} = req.params;
        try {
            const Finance = await FinanceModel.getFinanceByID(id);
            if (!Finance) {
                res.status(404).json({message: "Finance not found"});
            }
            res.status(200).json(Finance);
        } catch (error){
            console.error("Error fetching Finance", error);
            res.status(500).json({message: "Server Error"});
        }
    },


    createIncome: async (req, res) => {
        const {income, income_description, status, partyId} = req.body;
        try {
            const newIncome = await FinanceModel.createIncome(income, income_description, status, partyId);
            res.status(201).json({message: "Income created Successfully", income: newIncome});
        } catch (error) {
            console.error("Error create income", error);
            res.status(500).json({message:"Server Error"});
        }
    },
    createExpenditure: async (req, res) => {
        const {expenditure, expenditure_description, status, partyId} = req.body;
        try {
            const newExpenditure = await FinanceModel.createExpenditure(expenditure, expenditure_description, status, partyId);
            res.status(201).json({message: "Expenditure created Successfully", expenditure: newExpenditure});
        } catch (error) {
            console.error("Error create expenditure", error);
            res.status(500).json({message:"Server Error"});
        }
    },

    updateIncome: async (req, res) => {
        const {id} = req.params;
        const {income, income_description, status} = req.body;
        try {
            const updateIncome = await FinanceModel.updateIncome(id, income, income_description, status);
            if (!updateIncome) {
                res.status(404).json({message: "Income not found"});
            }
            res.status(200).json({message: "Income updated successfully", income: updateIncome});
        } catch (error) {
            console.error("Error Update Party",error);
            res.status(500).json({message: "Server Error"});
        }
    },
    updateExpenditure: async (req, res) => {
        const {id} = req.params;
        const {expenditure, expenditure_description, status} = req.body;
        try {
            const updateExpenditure = await FinanceModel.updateExpenditure(id, expenditure, expenditure_description, status);
            if (!updateExpenditure) {
                res.status(404).json({message: "expenditure not found"});
            }
            res.status(200).json({message: "expenditure updated successfully", expenditure: updateExpenditure});
        } catch (error) {
            console.error("Error Update Party",error);
            res.status(500).json({message: "Server Error"});
        }
    },

    deleteFinance: async (req, res) => {
        const {id} = req.params;

        try{
            const rowDeleted = await FinanceModel.deleteFinance(id);
            if (!rowDeleted){
                res.status(404).json({message: "Party Not found"});
            }
            res.status(200).json({message: "Party has been delete successfully"});
        } catch (error) {
            console.error("Delete Party Error",error);
            res.status(500).json({message: "Server Error"});
        }
    },

    getSumIncomesChartByparty: async (req, res) => {
        try {
            const parties = await FinanceModel.getSumIncomeschartByparty();
            res.status(200).json(parties);
        } catch (error){
            console.error("Error fetching parties", error);
            res.status(500).json({message: "Server Error"});
        }
    },
    getSumExpendituresChartByparty: async (req, res) => {
        try {
            const parties = await FinanceModel.getSumExpenditureschartByparty();
            res.status(200).json(parties);
        } catch (error){
            console.error("Error fetching parties", error);
            res.status(500).json({message: "Server Error"});
        }
    },
    getSumIncomeChartByCategory: async (req, res) => {
        const {categoryId} = req.params;
        try {
            const parties = await FinanceModel.getSumIncomechartByCategory(categoryId);
            res.status(200).json(parties);
        } catch (error){
            console.error("Error fetching parties", error);
            res.status(500).json({message: "Server Error"});
        }
    },
    getSumExpenditureChartByCategory: async (req, res) => {
        const {categoryId} = req.params;
        try {
            const parties = await FinanceModel.getSumExpenditurechartByCategory(categoryId);
            res.status(200).json(parties);
        } catch (error){
            console.error("Error fetching parties", error);
            res.status(500).json({message: "Server Error"});
        }
    },
    getSumIncomeChartByPartyId: async (req, res) => {
        const {partyId} = req.params;
        try {
            const parties = await FinanceModel.getSumIncomechartByPartyId(partyId);
            res.status(200).json(parties);
        } catch (error){
            console.error("Error fetching parties", error);
            res.status(500).json({message: "Server Error"});
        }
    },
    getSumExpenditureChartByPartyId: async (req, res) => {
        const {partyId} = req.params;
        try {
            const parties = await FinanceModel.getSumExpenditurechartByPartyId(partyId);
            res.status(200).json(parties);
        } catch (error){
            console.error("Error fetching parties", error);
            res.status(500).json({message: "Server Error"});
        }
    },
    
}

module.exports = FinanceController;