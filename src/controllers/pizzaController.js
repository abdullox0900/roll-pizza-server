const Pizza = require('../models/Pizza')
const categoryController = require('./categoryController')
const fs = require('fs')
const path = require('path')

let pizzas = []
let nextPizzaId = 1

exports.createPizza = (req, res) => {
    const { name, description, price, categoryId } = req.body
    let imageUrl = ''

    if (req.file) {
        imageUrl = `/uploads/${req.file.filename}`
    }

    const category = categoryController.getCategoryById(parseInt(categoryId))
    const categoryName = category ? category.name : 'Unknown Category'

    const newPizza = new Pizza(nextPizzaId++, name, description, parseFloat(price), imageUrl, parseInt(categoryId), categoryName)
    pizzas.push(newPizza)
    res.status(201).json(newPizza)
}

exports.getAllPizzas = (req, res) => {
    const pizzasWithCategoryNames = pizzas.map(pizza => {
        const category = categoryController.getCategoryById(pizza.categoryId)
        return { ...pizza, categoryName: category ? category.name : 'Unknown Category' }
    })
    res.status(200).json(pizzasWithCategoryNames)
}

exports.getPizzaById = (req, res) => {
    const pizza = pizzas.find(p => p.id === parseInt(req.params.id))
    if (!pizza) {
        return res.status(404).json({ message: 'Pizza not found' })
    }
    const category = categoryController.getCategoryById(pizza.categoryId)
    const pizzaWithCategoryName = { ...pizza, categoryName: category ? category.name : 'Unknown Category' }
    res.status(200).json(pizzaWithCategoryName)
}

exports.updatePizza = (req, res) => {
    const pizzaIndex = pizzas.findIndex(p => p.id === parseInt(req.params.id))
    if (pizzaIndex === -1) {
        return res.status(404).json({ message: 'Pizza not found' })
    }

    const { name, description, price, categoryId } = req.body
    let imageUrl = pizzas[pizzaIndex].imageUrl

    if (req.file) {
        // Eski rasmni o'chirish
        if (pizzas[pizzaIndex].imageUrl) {
            const oldImagePath = path.join(__dirname, '..', '..', pizzas[pizzaIndex].imageUrl)
            fs.unlink(oldImagePath, (err) => {
                if (err) console.error('Error deleting old image:', err)
            })
        }
        imageUrl = `/uploads/${req.file.filename}`
    }

    const newCategoryId = categoryId ? parseInt(categoryId) : pizzas[pizzaIndex].categoryId
    const category = categoryController.getCategoryById(newCategoryId)
    const categoryName = category ? category.name : 'Unknown Category'

    pizzas[pizzaIndex] = {
        ...pizzas[pizzaIndex],
        name: name || pizzas[pizzaIndex].name,
        description: description || pizzas[pizzaIndex].description,
        price: price ? parseFloat(price) : pizzas[pizzaIndex].price,
        imageUrl,
        categoryId: newCategoryId,
        categoryName
    }
    res.status(200).json(pizzas[pizzaIndex])
}

exports.deletePizza = (req, res) => {
    const pizzaIndex = pizzas.findIndex(p => p.id === parseInt(req.params.id))
    if (pizzaIndex === -1) {
        return res.status(404).json({ message: 'Pizza not found' })
    }

    // Rasmni o'chirish
    if (pizzas[pizzaIndex].imageUrl) {
        const imagePath = path.join(__dirname, '..', '..', pizzas[pizzaIndex].imageUrl)
        fs.unlink(imagePath, (err) => {
            if (err) console.error('Error deleting image:', err)
        })
    }

    pizzas.splice(pizzaIndex, 1)
    res.status(200).json({ message: 'Pizza deleted successfully' })
}