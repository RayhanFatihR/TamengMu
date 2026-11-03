
const express = require('express')
const router = express.Router()
const pool = require('../db')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

// REGISTER
router.post('/register', async (req, res) => {
    try {
        const { nama, email, password } = req.body

        // Memeriksa data yang dikirim
        if (!nama || !email || !password) {
            return res.status(400).json({
                message: 'Nama, email, dan password wajib diisi.'
            })
        }

        // Memeriksa panjang password
        if (password.length < 8) {
            return res.status(400).json({
                message: 'Password minimal 8 karakter.'
            })
        }

        const emailBersih = email.trim().toLowerCase()

        // Memeriksa apakah email sudah terdaftar
        const cekEmail = await pool.query(
            'SELECT id FROM users WHERE email = $1',
            [emailBersih]
        )

        if (cekEmail.rows.length > 0) {
            return res.status(409).json({
                message: 'Email sudah terdaftar.'
            })
        }

        // Mengubah password menjadi hash
        const passwordHash = await bcrypt.hash(password, 10)

        // Menyimpan akun ke database
        const result = await pool.query(
            `INSERT INTO users (nama, email, password_hash)
             VALUES ($1, $2, $3)
             RETURNING id, nama, email, created_at`,
            [nama.trim(), emailBersih, passwordHash]
        )

        const user = result.rows[0]

        // Membuat token JWT
        const token = jwt.sign(
            {
                id: user.id,
                email: user.email
            },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        )

        res.status(201).json({
            message: 'Registrasi berhasil.',
            token,
            user
        })

    } catch (error) {
        console.error(error)
        res.status(500).json({
            message: 'Terjadi kesalahan saat registrasi.'
        })
    }
})

// LOGIN
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({
                message: 'Email dan password wajib diisi.'
            })
        }

        const emailBersih = email.trim().toLowerCase()

        // Mencari akun berdasarkan email
        const result = await pool.query(
            'SELECT * FROM users WHERE email = $1',
            [emailBersih]
        )

        if (result.rows.length === 0) {
            return res.status(401).json({
                message: 'Email atau password salah.'
            })
        }

        const user = result.rows[0]

        // Membandingkan password dengan hash
        const passwordCocok = await bcrypt.compare(
            password,
            user.password_hash
        )

        if (!passwordCocok) {
            return res.status(401).json({
                message: 'Email atau password salah.'
            })
        }

        // Membuat token JWT
        const token = jwt.sign(
            {
                id: user.id,
                email: user.email
            },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        )

        res.json({
            message: 'Login berhasil.',
            token,
            user: {
                id: user.id,
                nama: user.nama,
                email: user.email
            }
        })

    } catch (error) {
        console.error(error)
        res.status(500).json({
            message: 'Terjadi kesalahan saat login.'
        })
    }
})

module.exports = router
