class User {
    constructor(telegramId, bonus = 500) {
        this.telegramId = telegramId
        this.bonus = bonus
    }
}

module.exports = User;
