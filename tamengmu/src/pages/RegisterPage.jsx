
import { useState } from 'react'
import { registerUser } from '../services/authService'

function RegisterPage({ onRegister, onGoLogin, onGuest }) {
    const [nama, setNama] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [konfirmasiPassword, setKonfirmasiPassword] = useState('')

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    async function handleRegister(e) {
        e.preventDefault()
        setError('')

        if (password !== konfirmasiPassword) {
            setError('Konfirmasi password tidak sama.')
            return
        }

        if (password.length < 8) {
            setError('Password minimal 8 karakter.')
            return
        }

        setLoading(true)

        try {
            const hasil = await registerUser({
                nama,
                email,
                password
            })

            onRegister(hasil.user)

        } catch (error) {
            setError(error.message)

        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="container py-5">
            <div className="row justify-content-center">
                <div className="col-md-7 col-lg-5">

                    <div className="card shadow-sm border-0">
                        <div className="card-body p-4">

                            <div className="text-center mb-4">
                                <h2 className="fw-bold">
                                    Daftar TamengKu
                                </h2>

                                <p className="text-muted">
                                    Buat akun untuk menyimpan riwayat pemeriksaan.
                                </p>
                            </div>

                            {error && (
                                <div className="alert alert-danger">
                                    {error}
                                </div>
                            )}

                            <form onSubmit={handleRegister}>

                                <div className="mb-3">
                                    <label className="form-label">
                                        Nama Lengkap
                                    </label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Masukkan nama lengkap"
                                        value={nama}
                                        onChange={(e) => setNama(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">
                                        Email
                                    </label>

                                    <input
                                        type="email"
                                        className="form-control"
                                        placeholder="Masukkan email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">
                                        Password
                                    </label>

                                    <input
                                        type="password"
                                        className="form-control"
                                        placeholder="Minimal 8 karakter"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        minLength={8}
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">
                                        Konfirmasi Password
                                    </label>

                                    <input
                                        type="password"
                                        className="form-control"
                                        placeholder="Ulangi password"
                                        value={konfirmasiPassword}
                                        onChange={(e) => setKonfirmasiPassword(e.target.value)}
                                        required
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-primary w-100"
                                    disabled={loading}
                                >
                                    {loading ? 'Mendaftarkan...' : 'Daftar Sekarang'}
                                </button>

                            </form>

                            <div className="text-center mt-3">
                                <p className="mb-1">
                                    Sudah punya akun?
                                </p>

                                <button
                                    className="btn btn-link"
                                    onClick={onGoLogin}
                                >
                                    Login di sini
                                </button>
                            </div>

                            <hr />

                            <button
                                className="btn btn-outline-secondary w-100"
                                onClick={onGuest}
                            >
                                Gunakan sebagai Tamu
                            </button>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default RegisterPage
