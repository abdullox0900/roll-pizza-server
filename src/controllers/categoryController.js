const Category = require('../models/Category')

let categories = []
let nextCategoryId = 1

exports.createCategory = async (req, res) => {
    try {
        const { name } = req.body
        const newCategory = new Category({ name })
        const savedCategory = await newCategory.save()
        res.status(201).json(savedCategory)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

exports.getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find()
        res.status(200).json(categories)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

exports.getCategoryById = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id)
        if (!category) {
            return res.status(404).json({ message: 'Category not found' })
        }
        res.status(200).json(category)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

exports.updateCategory = async (req, res) => {
    try {
        const { name } = req.body
        const updatedCategory = await Category.findByIdAndUpdate(
            req.params.id,
            { name },
            { new: true }
        )
        if (!updatedCategory) {
            return res.status(404).json({ message: 'Category not found' })
        }
        res.status(200).json(updatedCategory)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

exports.deleteCategory = async (req, res) => {
    try {
        const deletedCategory = await Category.findByIdAndDelete(req.params.id)
        if (!deletedCategory) {
            return res.status(404).json({ message: 'Category not found' })
        }
        res.status(200).json({ message: 'Category deleted successfully' })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
