const Order = require('../models/Order')
const User = require('../models/User')
const Pizza = require('../models/Pizza')

exports.createOrder = async (req, res) => {
    try {
        const { telegramId, items, totalPrice, name, phone, address, usedBonus } = req.body

        let user = await User.findOne({ telegramId })
        if (!user) {
            return res.status(404).json({ message: 'User not found' })
        }

        if (usedBonus > user.bonus) {
            return res.status(400).json({ message: 'Not enough bonus' })
        }

        const pizzaItems = await Promise.all(items.map(async (item) => {
            const pizza = await Pizza.findById(item.pizzaId)
            return {
                pizzaId: pizza._id,
                name: pizza.name,
                imageUrl: pizza.imageUrl,
                quantity: item.quantity
            }
        }))

        const newOrder = new Order({
            userId: user._id,
            items: pizzaItems,
            totalPrice,
            name,
            phone,
            address,
            usedBonus
        })

        await newOrder.save()

        // Update user's bonus
        user.bonus = user.bonus - usedBonus + Math.floor(totalPrice * 0.1)  // 10% cashback
        user.orderHistory.push(newOrder._id)
        await user.save()

        res.status(201).json(newOrder)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

exports.getOrdersByUser = async (req, res) => {
    try {
        const { telegramId } = req.params
        const user = await User.findOne({ telegramId })
        if (!user) {
            return res.status(404).json({ message: 'User not found' })
        }
        const orders = await Order.find({ userId: user._id }).populate('items.pizzaId')
        res.status(200).json(orders)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

exports.getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find()
            .populate('userId', 'telegramId')
            .sort({ date: -1 })  // Eng yangi buyurtmalarni birinchi ko'rsatish
        res.status(200).json(orders)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}