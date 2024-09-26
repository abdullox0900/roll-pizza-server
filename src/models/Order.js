const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [{
        pizzaId: { type: mongoose.Schema.Types.ObjectId, ref: 'Pizza' },
        name: { type: String, required: true },
        imageUrl: { type: String },
        quantity: Number
    }],
    totalPrice: { type: Number, required: true },
    name: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    usedBonus: { type: Number, default: 0 },
    date: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Order', orderSchema)