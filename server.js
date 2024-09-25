require('dotenv').config()
const express = require('express')
const path = require('path')
const cors = require('cors')
const mongoose = require('mongoose')
const adminRoutes = require('./src/routes/adminRoutes')
const webAppRoutes = require('./src/routes/webAppRoutes')

const app = express()

// MongoDB-ga ulanish
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB-ga muvaffaqiyatli ulandi'))
    .catch((err) => console.error('MongoDB-ga ulanishda xatolik:', err))

// CORS ni yoqish
app.use(cors())

app.use(express.json())

// Statik fayllar uchun papka
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

app.use('/api/admin', adminRoutes)
app.use('/api/webapp', webAppRoutes)

// Rasmni olish uchun route
app.get('/image/:id', async (req, res) => {
    try {
        const pizza = await Pizza.findById(req.params.id)
        if (!pizza || !pizza.image) {
            return res.status(404).send('Image not found')
        }
        res.set('Content-Type', pizza.image.contentType)
        res.send(pizza.image.data)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})