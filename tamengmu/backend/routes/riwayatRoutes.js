
const express = require('express')
const router = express.Router()
const pool = require('../db')
const authMiddleware = require('../middleware/authMiddleware')

// Semua endpoint riwayat wajib login
router.use(authMiddleware)

// GET: Mengambil semua riwayat milik pengguna
router.get('/', async (req, res) => {
    try {
        const result = await pool.query(
            `SELECT * FROM riwayat_pemeriksaan
             WHERE user_id = $1
             ORDER BY tanggal DESC`,
            [req.user.id]
        )

        res.json(result.rows)

    } catch (error) {
        console.error(error)
        res.status(500).json({
            message: 'Gagal mengambil riwayat pemeriksaan.'
        })
    }
})

// GET: Mengambil satu riwayat berdasarkan ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params

        const result = await pool.query(
            `SELECT * FROM riwayat_pemeriksaan
             WHERE id = $1 AND user_id = $2`,
            [id, req.user.id]
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

// POST: Menyimpan riwayat milik pengguna
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
             (jenis, data, status, alasan, user_id)
             VALUES ($1, $2, $3, $4, $5)
             RETURNING *`,
            [
                jenis,
                data,
                status,
                alasan || null,
                req.user.id
            ]
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

// DELETE: Menghapus seluruh riwayat milik pengguna
router.delete('/all', async (req, res) => {
    try {
        const result = await pool.query(
            `DELETE FROM riwayat_pemeriksaan
             WHERE user_id = $1`,
            [req.user.id]
        )

        res.json({
            message: 'Seluruh riwayat berhasil dihapus.',
            jumlahDihapus: result.rowCount
        })

    } catch (error) {
        console.error(error)
        res.status(500).json({
            message: 'Gagal menghapus seluruh riwayat.'
        })
    }
})

// DELETE: Menghapus satu riwayat berdasarkan ID
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params

        const result = await pool.query(
            `DELETE FROM riwayat_pemeriksaan
             WHERE id = $1 AND user_id = $2
             RETURNING *`,
            [id, req.user.id]
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
