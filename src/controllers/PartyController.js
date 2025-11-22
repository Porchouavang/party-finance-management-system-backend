const PartyModel = require('../models/PartyModel');
const PartyController = {
    getAllPartiesByCategory: async (req, res) => {
        const {categoryId} = req.params;
        try {
            const parties = await PartyModel.getAllPartiesByCategory(categoryId);
            res.status(200).json(parties);
        } catch (error){
            console.error("Error fetching parties", error);
            res.status(500).json({message: "Server Error"});
        }
    },

    getPartyByID: async (req, res) => {
        const {id} = req.params;
        try {
            const party = await PartyModel.getPartyByID(id);
            if (!party) {
                res.status(404).json({message: "Party not found"});
            }
            res.status(200).json(party);
        } catch (error){
            console.error("Error fetching Party", error);
            res.status(500).json({message: "Server Error"});
        }
    },


    createParty: async (req, res) => {
        const {name, categoryId} = req.body;
        try {
            const newParty = await PartyModel.createParty(name, categoryId);
            res.status(201).json({message: "Party created Successfully", party: newParty});
        } catch (error) {
            console.error("Error create Party", error);
            res.status(500).json({message:"Server Error"});
        }
    },

    updateParty: async (req, res) => {
        const {id} = req.params;
        const {name} = req.body;
        try {
            const updateParty = await PartyModel.updateParty(id, name);
            if (!updateParty) {
                res.status(404).json({message: "Party not found"});
            }
            res.status(200).json({message: "Party updated successfully", party: updateParty});
        } catch (error) {
            console.error("Error Update Party",error);
            res.status(500).json({message: "Server Error"});
        }
    },

    deleteParty: async (req, res) => {
        const {id} = req.params;

        try{
            const rowDeleted = await PartyModel.deleteParty(id);
            if (!rowDeleted){
                res.status(404).json({message: "Party Not found"});
            }
            res.status(200).json({message: "Party has been delete successfully"});
        } catch (error) {
            console.error("Delete Party Error",error);
            res.status(500).json({message: "Server Error"});
        }
    }
}

module.exports = PartyController;