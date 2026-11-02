
const express = require('express')
const cors = require('cors')
const pool = require('./db')
const riwayatRoutes = require('./routes/riwayatRoutes')

require('dotenv').config()

const app = express()

app.use(cors())
app.use(express.json())

// Halaman utama
app.get('/', (req, res) => {
    res.send('Backend TamengKu Berhasil Berjalan!')
})

// Tes koneksi database
app.get('/test-db', async (req, res) => {
    try {
        const result = await pool.query('SELECT NOW()')

        res.json({
            message: 'Koneksi PostgreSQL berhasil!',
            waktu: result.rows[0].now
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            message: 'Koneksi database gagal.'
        })
    }
})

// Route riwayat pemeriksaan
app.use('/api/riwayat', riwayatRoutes)

// Menjalankan server
const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`Backend berjalan di http://localhost:${PORT}`)
})
