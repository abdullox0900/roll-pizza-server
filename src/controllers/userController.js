const User = require('../models/User')

let users = []

exports.getOrCreateUser = (telegramId) => {
    let user = users.find(u => u.telegramId === telegramId)
    if (!user) {
        user = new User(telegramId)
        users.push(user)
    }
    return user
}

exports.updateUserBonus = (telegramId, bonus) => {
    const user = users.find(u => u.telegramId === telegramId)
    if (user) {
        user.bonus = bonus
    }
}
