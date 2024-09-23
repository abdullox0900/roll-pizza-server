const Category = require('../models/Category')

let categories = []
let nextCategoryId = 1

exports.createCategory = (req, res) => {
    const { name } = req.body
    const newCategory = new Category(nextCategoryId++, name)
    categories.push(newCategory)
    res.status(201).json(newCategory)
}

exports.getAllCategories = (req, res) => {
    res.status(200).json(categories)
}

exports.getCategoryById = (id) => {
    return categories.find(c => c.id === id)
}

exports.updateCategory = (req, res) => {
    const categoryIndex = categories.findIndex(c => c.id === parseInt(req.params.id))
    if (categoryIndex === -1) {
        return res.status(404).json({ message: 'Category not found' })
    }
    const { name } = req.body
    categories[categoryIndex] = { ...categories[categoryIndex], name }
    res.status(200).json(categories[categoryIndex])
}

exports.deleteCategory = (req, res) => {
    const categoryIndex = categories.findIndex(c => c.id === parseInt(req.params.id))
    if (categoryIndex === -1) {
        return res.status(404).json({ message: 'Category not found' })
    }
    categories.splice(categoryIndex, 1)
    res.status(200).json({ message: 'Category deleted successfully' })
}
