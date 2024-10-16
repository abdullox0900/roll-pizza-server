const User = require('../models/User')

exports.getOrCreateUser = async (telegramId) => {
    let user = await User.findOne({ telegramId })
    if (!user) {
        user = new User({ telegramId, bonus: 500, bonusGiven: true })
        await user.save()
    }
    return user
}

exports.updateUserBonus = async (userId, usedBonus) => {
    const user = await User.findById(userId)
    if (user && user.bonus >= usedBonus) {
        user.bonus = 0 // Bonusni ishlatgandan so'ng 0 ga tushiramiz
        await user.save()
    }
}

exports.getUserHistory = async (telegramId) => {
    const user = await User.findOne({ telegramId }).populate({
        path: 'orderHistory',
        populate: { path: 'items.pizzaId' }
    })
    return user ? user.orderHistory : []
}

exports.resetUserBonus = async (userId) => {
    await User.findByIdAndUpdate(userId, { bonus: 0 })
}
