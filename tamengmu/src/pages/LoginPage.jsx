
import { useState } from 'react'
import { loginUser } from '../services/authService'

function LoginPage({ onLogin, onGoRegister, onGuest }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    async function handleLogin(e) {
        e.preventDefault()

        setError('')
        setLoading(true)

        try {
            const hasil = await loginUser({
                email,
                password
            })

            onLogin(hasil.user)

        } catch (error) {
            setError(error.message)

        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="container py-5">
            <div className="row justify-content-center">
                <div className="col-md-6 col-lg-5">

                    <div className="card shadow-sm border-0">
                        <div className="card-body p-4">

                            <div className="text-center mb-4">
                                <h2 className="fw-bold">
                                    Masuk ke TamengKu
                                </h2>

                                <p className="text-muted">
                                    Lindungi diri dari penipuan digital.
                                </p>
                            </div>

                            {error && (
                                <div className="alert alert-danger">
                                    {error}
                                </div>
                            )}

                            <form onSubmit={handleLogin}>

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
                                        placeholder="Masukkan password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-primary w-100"
                                    disabled={loading}
                                >
                                    {loading ? 'Memproses...' : 'Login'}
                                </button>

                            </form>

                            <div className="text-center mt-3">
                                <p className="mb-1">
                                    Belum punya akun?
                                </p>

                                <button
                                    className="btn btn-link"
                                    onClick={onGoRegister}
                                >
                                    Daftar sekarang
                                </button>
                            </div>

                            <hr />

                            <div className="text-center">
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
        </div>
    )
}

export default LoginPage
