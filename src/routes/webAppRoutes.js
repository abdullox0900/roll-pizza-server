const express = require('express')
const router = express.Router()
const orderController = require('../controllers/orderController')
const userController = require('../controllers/userController')

router.post('/order', orderController.createOrder)
router.get('/orders/:telegramId', orderController.getOrdersByUser)
router.get('/user/:telegramId', (req, res) => {
    const user = userController.getOrCreateUser(req.params.telegramId)
    res.status(200).json(user)
})

module.exports = router