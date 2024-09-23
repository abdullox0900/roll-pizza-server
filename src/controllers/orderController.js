const Order = require('../models/Order')
const userController = require('./userController')

let orders = []
let nextOrderId = 1

exports.createOrder = (req, res) => {
    const { telegramId, items, totalPrice, name, phone, address, usedBonus } = req.body

    const user = userController.getOrCreateUser(telegramId)

    if (usedBonus > user.bonus) {
        return res.status(400).json({ message: 'Not enough bonus' })
    }

    const newOrder = new Order(
        nextOrderId++,
        telegramId,
        items,
        totalPrice,
        name,
        phone,
        address,
        usedBonus,
        new Date()
    )

    orders.push(newOrder)

    // Update user's bonus
    user.bonus = user.bonus - usedBonus + Math.floor(totalPrice * 0.1)  // 10% cashback
    userController.updateUserBonus(telegramId, user.bonus)

    res.status(201).json(newOrder)
}

exports.getOrdersByUser = (req, res) => {
    const { telegramId } = req.params
    const userOrders = orders.filter(order => order.userId === telegramId)
    res.status(200).json(userOrders)
}

exports.getAllOrders = (req, res) => {
    res.status(200).json(orders)
}