const express = require('express')
const router = express.Router()
const multer = require('multer')
const pizzaController = require('../controllers/pizzaController')
const categoryController = require('../controllers/categoryController')
const orderController = require('../controllers/orderController')

// Multer konfiguratsiyasi
const upload = multer({ storage: multer.memoryStorage() })

router.get('/orders', orderController.getAllOrders)

// Pizza routes
router.post('/pizzas', upload.single('image'), pizzaController.createPizza)
router.get('/pizzas', pizzaController.getAllPizzas)
router.get('/pizzas/:id', pizzaController.getPizzaById)
router.put('/pizzas/:id', upload.single('image'), pizzaController.updatePizza)
router.delete('/pizzas/:id', pizzaController.deletePizza)

// Category routes
router.post('/categories', categoryController.createCategory)
router.get('/categories', categoryController.getAllCategories)
router.get('/categories/:id', categoryController.getCategoryById)
router.put('/categories/:id', categoryController.updateCategory)
router.delete('/categories/:id', categoryController.deleteCategory)

module.exports = router