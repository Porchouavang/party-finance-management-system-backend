const CategoryModel = require('../models/CategoryModel');
const CategoryCntroller = {
    getAllCategories: async (req, res) => {
        try {
            const categories = await CategoryModel.getAllCategories();
            res.status(200).json(categories);
        } catch (error){
            console.error("Error fetching categories", error);
            res.status(500).json({message: "Server Error"});
        }
    },

    getCategoryByID: async (req, res) => {
        const {id} = req.params;
        try {
            const category = await CategoryModel.getCategoryByID(id);
            if (!category) {
                res.status(404).json({message: "Category not found"});
            }
            res.status(200).json(category);
        } catch (error){
            console.error("Error fetching Category", error);
            res.status(500).json({message: "Server Error"});
        }
    },


    createCategory: async (req, res) => {
        const {name} = req.body;
        try {
            const newCategory = await CategoryModel.createCategory(name);
            res.status(201).json({message: "Category created Successfully", category: newCategory});
        } catch (error) {
            console.error("Error create Category", error);
            res.status(500).json({message:"Server Error"});
        }
    },

    updateCategory: async (req, res) => {
        const {id} = req.params;
        const {name} = req.body;
        try {
            const updateCategory = await CategoryModel.updateCategory(id, name);
            if (!updateCategory) {
                res.status(404).json({message: "Category not found"});
            }
            res.status(200).json({message: "Category updated successfully", category: updateCategory});
        } catch (error) {
            console.error("Error Update Category",error);
            res.status(500).json({message: "Server Error"});
        }
    },

    deleteCategory: async (req, res) => {
        const {id} = req.params;

        try{
            const rowDeleted = await CategoryModel.deleteCategory(id);
            if (!rowDeleted){
                res.status(404).json({message: "Category Not found"});
            }
            res.status(200).json({message: "Category has been delete successfully"});
        } catch (error) {
            console.error("Delete Category Error",error);
            res.status(500).json({message: "Server Error"});
        }
    }
}

module.exports = CategoryCntroller;