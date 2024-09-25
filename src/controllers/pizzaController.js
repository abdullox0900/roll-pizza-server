const Pizza = require('../models/Pizza')
const Category = require('../models/Category')
const path = require('path')
const fs = require('fs')

exports.createPizza = async (req, res) => {
    try {
        const { name, description, price, categoryId } = req.body

        // Kategoriya mavjudligini tekshirish
        const category = await Category.findById(categoryId)
        if (!category) {
            return res.status(400).json({ message: 'Invalid category' })
        }

        let imageUrl = ''
        if (req.file) {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
            const filename = uniqueSuffix + path.extname(req.file.originalname)
            const filepath = path.join('uploads', filename)
            fs.writeFileSync(filepath, req.file.buffer)
            imageUrl = `/uploads/${filename}`
        }

        const newPizza = new Pizza({
            name,
            description,
            price: parseFloat(price),
            imageUrl,
            categoryId
        })

        const savedPizza = await newPizza.save()
        res.status(201).json(savedPizza)
    } catch (error) {
        console.error('Error creating pizza:', error)
        res.status(500).json({ message: error.message })
    }
}

exports.getAllPizzas = async (req, res) => {
    try {
        const pizzas = await Pizza.find().populate('categoryId', 'name')
        res.status(200).json(pizzas)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// ... boshqa metodlarni ham shunga o'xshash tarzda yangilang ...

exports.getPizzaById = async (req, res) => {
    try {
        const pizza = await Pizza.findById(req.params.id).populate('categoryId', 'name')
        if (!pizza) {
            return res.status(404).json({ message: 'Pizza not found' })
        }
        res.status(200).json(pizza)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// ... boshqa funksiyalar ...

exports.updatePizza = async (req, res) => {
    try {
        const { name, description, price, categoryId } = req.body
        const updateData = { name, description, price: parseFloat(price), categoryId }

        if (req.file) {
            updateData.image = {
                data: req.file.buffer,
                contentType: req.file.mimetype
            }
        }

        const updatedPizza = await Pizza.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true }
        ).populate('categoryId', 'name')

        if (!updatedPizza) {
            return res.status(404).json({ message: 'Pizza not found' })
        }

        res.status(200).json(updatedPizza)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

exports.deletePizza = async (req, res) => {
    try {
        const deletedPizza = await Pizza.findByIdAndDelete(req.params.id)
        if (!deletedPizza) {
            return res.status(404).json({ message: 'Pizza not found' })
        }
        res.status(200).json({ message: 'Pizza deleted successfully' })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}