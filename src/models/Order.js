class Order {
    constructor(id, userId, items, totalPrice, name, phone, address, usedBonus, date) {
        this.id = id
        this.userId = userId
        this.items = items
        this.totalPrice = totalPrice
        this.name = name
        this.phone = phone
        this.address = address
        this.usedBonus = usedBonus
        this.date = date
    }
}

module.exports = Order