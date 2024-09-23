const express = require('express')
const path = require('path')
const cors = require('cors')
const adminRoutes = require('./src/routes/adminRoutes')
const webAppRoutes = require('./src/routes/webAppRoutes')

const app = express()

// CORS ni yoqish
app.use(cors())

app.use(express.json())

// Statik fayllar uchun yo'l
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

app.use('/api/admin', adminRoutes)
app.use('/api/webapp', webAppRoutes)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})