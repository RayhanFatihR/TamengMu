
const jwt = require('jsonwebtoken')

function authMiddleware(req, res, next) {
    // Mengambil token dari header Authorization
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({
            message: 'Silakan login terlebih dahulu.'
        })
    }

    // Memisahkan token dari kata Bearer
    const token = authHeader.split(' ')[1]

    try {
        // Memeriksa apakah token valid
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        )

        // Menyimpan identitas pengguna
        req.user = decoded

        // Melanjutkan ke route berikutnya
        next()

    } catch (error) {
        return res.status(401).json({
            message: 'Token tidak valid atau sudah kedaluwarsa.'
        })
    }
}

module.exports = authMiddleware
