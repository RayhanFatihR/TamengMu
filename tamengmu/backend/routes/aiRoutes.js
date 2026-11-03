
const express = require('express')
const router = express.Router()

const { analisisPesan } = require('../services/openaiService')

router.post('/analisis', async (req, res) => {
    try {
        const { pesan } = req.body

        // Memastikan pesan tidak kosong
        if (!pesan || typeof pesan !== 'string' || !pesan.trim()) {
            return res.status(400).json({
                message: 'Pesan tidak boleh kosong.'
            })
        }

        // Mengirim pesan ke layanan OpenAI
        const hasilAnalisis = await analisisPesan(pesan)

        // Mengirim hasil analisis ke frontend
        res.json({
            message: 'Analisis AI berhasil.',
            hasil: hasilAnalisis
        })

    } catch (error) {
        console.error('AI Analysis Error:', error.message)

        res.status(500).json({
            message: 'Maaf, analisis AI gagal dilakukan. Silakan coba lagi.'
        })
    }
})

module.exports = router
