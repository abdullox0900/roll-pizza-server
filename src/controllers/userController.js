const User = require('../models/User')

exports.getOrCreateUser = async (telegramId) => {
    let user = await User.findOne({ telegramId })
    if (!user) {
        user = new User({ telegramId, bonusGiven: true })
        await user.save()
    }
    return user
}

exports.updateUserBonus = async (userId, bonus) => {
    await User.findByIdAndUpdate(userId, { bonus })
}

exports.getUserHistory = async (telegramId) => {
    const user = await User.findOne({ telegramId }).populate({
        path: 'orderHistory',
        populate: { path: 'items.pizzaId' }
    })
    return user ? user.orderHistory : []
}
