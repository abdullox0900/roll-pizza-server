const express = require('express')
const router = express.Router()
const orderController = require('../controllers/orderController')
const userController = require('../controllers/userController')

router.post('/order', orderController.createOrder)
router.get('/orders/:telegramId', orderController.getOrdersByUser)
router.get('/user/:telegramId', async (req, res) => {
    try {
        const user = await userController.getOrCreateUser(req.params.telegramId)
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})
router.get('/user/history/:telegramId', async (req, res) => {
    try {
        const history = await userController.getUserHistory(req.params.telegramId)
        res.status(200).json(history)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

module.exports = router