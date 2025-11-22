const pool = require('../configs/dbConnection');

const FinaceModel = {
    getAllIncomesByparty: async (partyId) => {
        const query = "SELECT finances.id, finances.income, finances.income_description, finances.status, parties.name as party, finances.created_at FROM finances INNER JOIN parties ON finances.party_id = parties.id WHERE finances.expenditure IS NULL AND finances.party_id = $1 ORDER BY finances.id DESC LIMIT 20";
        const result = await pool.query(query, [partyId]);
        return result.rows;
    },
    getAllDetailsIncomesByparty: async (partyId) => {
        const query = "SELECT finances.id, finances.income, finances.income_description, finances.status, parties.name as party, finances.created_at FROM finances INNER JOIN parties ON finances.party_id = parties.id WHERE finances.expenditure IS NULL AND finances.party_id = $1 ORDER BY finances.id DESC";
        const result = await pool.query(query, [partyId]);
        return result.rows;
    },
    getAllExpendituresByparty: async (partyId) => {
        const query = "SELECT finances.id, finances.expenditure, finances.expenditure_description, finances.status, parties.name as party, finances.created_at FROM finances INNER JOIN parties ON finances.party_id = parties.id WHERE finances.income IS NULL AND finances.party_id = $1 ORDER BY finances.id DESC LIMIT 20";
        const result = await pool.query(query, [partyId]);
        return result.rows;
    },
    getAllDetailsExpendituresByparty: async (partyId) => {
        const query = "SELECT finances.id, finances.expenditure, finances.expenditure_description, finances.status, parties.name as party, finances.created_at FROM finances INNER JOIN parties ON finances.party_id = parties.id WHERE finances.income IS NULL AND finances.party_id = $1 ORDER BY finances.id DESC";
        const result = await pool.query(query, [partyId]);
        return result.rows;
    },

    getSumIncomesByparty: async (partyId) => {
        const query = "SELECT SUM(finances.income) as sum_income FROM finances WHERE finances.party_id = $1";
        const result = await pool.query(query, [partyId]);
        return result.rows;
    },
    getSumIncomesTodayByparty: async (partyId) => {
        const query = "SELECT SUM(finances.income) as sum_income_today FROM finances WHERE finances.party_id = $1 AND created_at::date = CURRENT_DATE";
        const result = await pool.query(query, [partyId]);
        return result.rows;
    },
    getSumRemainingByparty: async (partyId) => {
        const query = "SELECT SUM(finances.income) - SUM(finances.expenditure) as sum_remaining FROM finances WHERE finances.party_id = $1";
        const result = await pool.query(query, [partyId]);
        return result.rows;
    },
    getSumExpendituresByparty: async (partyId) => {
        const query = "SELECT SUM(finances.expenditure) as sum_expenditure FROM finances WHERE finances.party_id = $1";
        const result = await pool.query(query, [partyId]);
        return result.rows;
    },

    getFinanceByID: async (financeId) => {
        const query = "SELECT * FROM finances WHERE id = $1";
        const result = await pool.query(query, [financeId]);
        return result.rows[0];
    },

    createIncome: async (income, income_description, status, partyId) => {
        const query = "INSERT INTO finances(income, income_description, status, party_id, created_at) VALUES ($1, $2, $3, $4, NOW()) RETURNING*";
        const result = await pool.query(query,[income, income_description, status, partyId]);
        return result.rows[0];
    },

    createExpenditure: async (expenditure, expenditure_description, status, partyId) => {
        const query = "INSERT INTO finances(expenditure, expenditure_description, status, party_id, created_at) VALUES ($1, $2, $3, $4, NOW()) RETURNING*";
        const result = await pool.query(query,[expenditure, expenditure_description, status, partyId]);
        return result.rows[0];
    },

    updateIncome: async (id, income, income_description, status) => {
        const query = "UPDATE finances SET income = $1, income_description = $2, status = $3 WHERE id = $4 RETURNING*";
        const result = await pool.query(query,[income, income_description, status, id]);
        return result.rows[0];
    },
    updateExpenditure: async (financeId, expenditure, expenditure_description, status) => {
        const query = "UPDATE finances SET expenditure = $1, expenditure_description = $2, status = $3 WHERE id = $4 RETURNING*";
        const result = await pool.query(query,[expenditure, expenditure_description, status, financeId]);
        return result.rows[0];
    },

    deleteFinance: async (financeId) => {
        const query = "DELETE FROM finances WHERE id = $1";
        const result = await pool.query(query,[financeId]);
        return result.rowCount;
    },
    getSumIncomeschartByparty: async () => {
        const query = "SELECT SUM(finances.income) AS sum_income, categories.name AS category FROM finances INNER JOIN parties ON finances.party_id = parties.id INNER JOIN categories ON categories.id = parties.category_id GROUP BY categories.name";
        const result = await pool.query(query);
        return result.rows;
    },
    getSumExpenditureschartByparty: async () => {
        const query = "SELECT SUM(finances.expenditure) AS sum_expenditure, categories.name AS category FROM finances INNER JOIN parties ON finances.party_id = parties.id INNER JOIN categories ON categories.id = parties.category_id GROUP BY categories.name";
        const result = await pool.query(query);
        return result.rows;
    },
    getSumIncomechartByCategory: async (categoryId) => {
        const query = "SELECT SUM(finances.income) AS sum_income, parties.name AS category FROM finances INNER JOIN parties ON finances.party_id = parties.id WHERE parties.category_id = $1 GROUP BY parties.name";
        const result = await pool.query(query,[categoryId]);
        return result.rows;
    },
    getSumExpenditurechartByCategory: async (categoryId) => {
        const query = "SELECT SUM(finances.expenditure) AS sum_expenditure, parties.name AS category FROM finances INNER JOIN parties ON finances.party_id = parties.id WHERE parties.category_id = $1 GROUP BY parties.name";
        const result = await pool.query(query,[categoryId]);
        return result.rows;
    },
    getSumIncomechartByPartyId: async (categoryId) => {
        const query = "SELECT SUM(finances.income) AS sum_income_chart, SUM(finances.expenditure) AS sum_expenditure_chart, SUM(finances.income) - SUM(finances.expenditure) AS sum_remaining_chart, parties.name AS party FROM finances INNER JOIN parties ON finances.party_id = parties.id WHERE parties.id = $1 GROUP BY parties.name";
        const result = await pool.query(query,[categoryId]);
        return result.rows;
    },
    getSumExpenditurechartByPartyId: async (categoryId) => {
        const query = "SELECT SUM(finances.expenditure) AS sum_expenditure_chart, parties.name AS party FROM finances INNER JOIN parties ON finances.party_id = parties.id WHERE parties.id = $1 GROUP BY parties.name";
        const result = await pool.query(query,[categoryId]);
        return result.rows;
    },
}

module.exports = FinaceModel;