
const express = require('express')
const router = express.Router()
const pool = require('../db')

// GET: Mengambil semua riwayat
router.get('/', async (req, res) => {
    try {
        const result = await pool.query(
            'SELECT * FROM riwayat_pemeriksaan ORDER BY tanggal DESC'
        )

        res.json(result.rows)
    } catch (error) {
        console.error(error)
        res.status(500).json({
            message: 'Gagal mengambil riwayat pemeriksaan.'
        })
    }
})

// GET: Mengambil riwayat berdasarkan ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params

        const result = await pool.query(
            'SELECT * FROM riwayat_pemeriksaan WHERE id = $1',
            [id]
        )

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: 'Riwayat tidak ditemukan.'
            })
        }

        res.json(result.rows[0])
    } catch (error) {
        console.error(error)
        res.status(500).json({
            message: 'Gagal mengambil data riwayat.'
        })
    }
})

// POST: Menyimpan riwayat baru
router.post('/', async (req, res) => {
    try {
        const { jenis, data, status, alasan } = req.body

        if (!jenis || !data || !status) {
            return res.status(400).json({
                message: 'Jenis, data, dan status wajib diisi.'
            })
        }

        const result = await pool.query(
            `INSERT INTO riwayat_pemeriksaan
            (jenis, data, status, alasan)
            VALUES ($1, $2, $3, $4)
            RETURNING *`,
            [jenis, data, status, alasan || null]
        )

        res.status(201).json({
            message: 'Riwayat berhasil disimpan.',
            data: result.rows[0]
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            message: 'Gagal menyimpan riwayat.'
        })
    }
})

// DELETE: Menghapus riwayat berdasarkan ID
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params

        const result = await pool.query(
            'DELETE FROM riwayat_pemeriksaan WHERE id = $1 RETURNING *',
            [id]
        )

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: 'Riwayat tidak ditemukan.'
            })
        }

        res.json({
            message: 'Riwayat berhasil dihapus.',
            data: result.rows[0]
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            message: 'Gagal menghapus riwayat.'
        })
    }
})

module.exports = router
