const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    telegramId: { type: String, required: true, unique: true },
    bonus: { type: Number, default: 500 },
    bonusGiven: { type: Boolean, default: false },
    orderHistory: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }]
})

module.exports = mongoose.model('User', userSchema)
