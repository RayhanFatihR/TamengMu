
import { useState } from 'react'
import CheckPage from './pages/CheckPage'
import HistoryPage from './pages/HistoryPage'
import EducationPage from './pages/EducationPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'

import {
  getCurrentUser,
  isLoggedIn,
  logoutUser
} from './services/authService'

import './App.css'

function App() {
  const [halaman, setHalaman] = useState('beranda')

  // Memeriksa sesi login ketika aplikasi dibuka
  const [user, setUser] = useState(() => {
    return isLoggedIn() ? getCurrentUser() : null
  })

  // Berpindah ke halaman riwayat
  function bukaRiwayat() {
    if (user) {
      setHalaman('history')
    } else {
      setHalaman('login')
    }
  }

  // Login berhasil
  function handleLogin(dataUser) {
    setUser(dataUser)
    setHalaman('beranda')
  }

  // Register berhasil
  function handleRegister(dataUser) {
    setUser(dataUser)
    setHalaman('beranda')
  }

  // Menggunakan aplikasi sebagai tamu
  function handleGuest() {
    setUser(null)
    setHalaman('beranda')
  }

  // Logout
  function handleLogout() {
    logoutUser()
    setUser(null)
    setHalaman('beranda')
  }

  // Halaman Login
  if (halaman === 'login') {
    return (
      <LoginPage
        onLogin={handleLogin}
        onGoRegister={() => setHalaman('register')}
        onGuest={handleGuest}
      />
    )
  }

  // Halaman Register
  if (halaman === 'register') {
    return (
      <RegisterPage
        onRegister={handleRegister}
        onGoLogin={() => setHalaman('login')}
        onGuest={handleGuest}
      />
    )
  }

  // Halaman selain beranda
  if (halaman !== 'beranda') {
    return (
      <>
        <nav className="navbar bg-white shadow-sm py-3">
          <div className="container">
            <span className="navbar-brand fw-bold fs-3 text-primary">
              TamengKu
            </span>

            <div className="d-flex gap-2 flex-wrap">
              <button
                className="btn btn-outline-primary rounded-pill"
                onClick={bukaRiwayat}
              >
                Riwayat
              </button>

              <button
                className="btn btn-outline-primary rounded-pill"
                onClick={() => setHalaman('education')}
              >
                Edukasi
              </button>

              <button
                className="btn btn-outline-primary rounded-pill"
                onClick={() => setHalaman('beranda')}
              >
                ← Beranda
              </button>

              {user ? (
                <button
                  className="btn btn-outline-danger rounded-pill"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              ) : (
                <button
                  className="btn btn-primary rounded-pill"
                  onClick={() => setHalaman('login')}
                >
                  Login
                </button>
              )}
            </div>
          </div>
        </nav>

        {halaman === 'check' && <CheckPage />}

        {halaman === 'education' && (
          <EducationPage
            onKembali={() => setHalaman('beranda')}
          />
        )}

        {halaman === 'history' && user && (
          <HistoryPage
            onKembali={() => setHalaman('beranda')}
            onPeriksaLagi={() => setHalaman('check')}
          />
        )}
      </>
    )
  }

  // Halaman utama
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-white shadow-sm py-3">
        <div className="container">
          <a className="navbar-brand fw-bold fs-3 text-primary" href="#beranda">
            TamengKu
          </a>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarMenu"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarMenu">
            <ul className="navbar-nav ms-auto align-items-lg-center gap-lg-3">

              <li className="nav-item">
                <a className="nav-link" href="#beranda">
                  Beranda
                </a>
              </li>

              <li className="nav-item">
                <a className="nav-link" href="#fitur">
                  Fitur
                </a>
              </li>

              <li className="nav-item">
                <a className="nav-link" href="#tentang">
                  Tentang Kami
                </a>
              </li>

              <li className="nav-item">
                <button
                  className="btn btn-outline-primary rounded-pill px-4"
                  onClick={bukaRiwayat}
                >
                  Riwayat
                </button>
              </li>

              <li className="nav-item">
                <button
                  className="btn btn-outline-primary rounded-pill px-4"
                  onClick={() => setHalaman('education')}
                >
                  Edukasi
                </button>
              </li>

              {user ? (
                <>
                  <li className="nav-item">
                    <span className="text-secondary small">
                      Halo, {user.nama}
                    </span>
                  </li>

                  <li className="nav-item">
                    <button
                      className="btn btn-outline-danger rounded-pill px-4"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <button
                      className="btn btn-outline-primary rounded-pill px-4"
                      onClick={() => setHalaman('login')}
                    >
                      Login
                    </button>
                  </li>

                  <li className="nav-item">
                    <button
                      className="btn btn-primary rounded-pill px-4"
                      onClick={() => setHalaman('register')}
                    >
                      Daftar
                    </button>
                  </li>
                </>
              )}

              <li className="nav-item">
                <button
                  className="btn btn-primary rounded-pill px-4"
                  onClick={() => setHalaman('check')}
                >
                  Mulai Periksa
                </button>
              </li>

            </ul>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section" id="beranda">
        <div className="container py-5">
          <div className="row align-items-center py-5">
            <div className="col-lg-7">
              <span className="badge bg-primary-subtle text-primary px-3 py-2 mb-3">
                Asisten Keamanan Digital
              </span>

              <h1 className="display-4 fw-bold mb-4">
                Jangan Mudah Tertipu,
                <span className="text-primary">
                  {' '}Lindungi Diri Bersama TamengKu.
                </span>
              </h1>

              <p className="lead text-secondary mb-4">
                Bingung menerima pesan atau tautan mencurigakan?
                Tenang, TamengKu membantu memeriksa potensi penipuan
                digital dengan penjelasan yang mudah dipahami.
              </p>

              <button
                onClick={() => setHalaman('check')}
                className="btn btn-primary btn-lg rounded-pill px-4"
              >
                Periksa Sekarang
              </button>

              <p className="text-secondary mt-3 small">
                Gratis digunakan dan mudah dipahami oleh siapa saja.
              </p>
            </div>

            <div className="col-lg-5 text-center mt-5 mt-lg-0">
              <div className="hero-illustration">
                <div className="shield-icon">🛡️</div>

                <h3 className="fw-bold text-primary mt-3">
                  Tetap Aman di Dunia Digital
                </h3>

                <p className="text-secondary">
                  Kenali penipuan sebelum menjadi korban.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-5" id="fitur">
        <div className="container py-4">
          <div className="text-center mb-5">
            <h2 className="fw-bold">
              Apa yang Bisa TamengKu Lakukan?
            </h2>

            <p className="text-secondary">
              Beberapa cara sederhana untuk membantu melindungi Anda.
            </p>
          </div>

          <div className="row g-4">
            <div className="col-md-4">
              <div className="card feature-card h-100 border-0 shadow-sm p-4">
                <div className="feature-icon">💬</div>
                <h4 className="fw-bold mt-3">Periksa Pesan</h4>
                <p className="text-secondary mb-0">
                  Periksa isi SMS atau pesan WhatsApp yang terasa mencurigakan.
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card feature-card h-100 border-0 shadow-sm p-4">
                <div className="feature-icon">🔗</div>
                <h4 className="fw-bold mt-3">Periksa Tautan</h4>
                <p className="text-secondary mb-0">
                  Periksa tautan sebelum Anda membuka website yang tidak dikenal.
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card feature-card h-100 border-0 shadow-sm p-4">
                <div className="feature-icon">📷</div>
                <h4 className="fw-bold mt-3">Periksa Screenshot</h4>
                <p className="text-secondary mb-0">
                  Unggah gambar percakapan atau bukti pesan untuk diperiksa.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="how-section py-5" id="tentang">
        <div className="container py-4">
          <div className="text-center mb-5">
            <h2 className="fw-bold">
              Mudah Digunakan, Hanya 3 Langkah
            </h2>

            <p className="text-secondary">
              Tidak perlu menjadi ahli teknologi untuk menggunakan TamengKu.
            </p>
          </div>

          <div className="row g-4 text-center">
            <div className="col-md-4">
              <div className="step-number">1</div>
              <h5 className="fw-bold mt-3">Masukkan Pesan</h5>
              <p className="text-secondary">
                Masukkan pesan, tautan, atau unggah screenshot.
              </p>
            </div>

            <div className="col-md-4">
              <div className="step-number">2</div>
              <h5 className="fw-bold mt-3">Tunggu Pemeriksaan</h5>
              <p className="text-secondary">
                TamengKu akan membantu menganalisis informasi tersebut.
              </p>
            </div>

            <div className="col-md-4">
              <div className="step-number">3</div>
              <h5 className="fw-bold mt-3">Lihat Hasilnya</h5>
              <p className="text-secondary">
                Dapatkan hasil pemeriksaan dan saran tindakan selanjutnya.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-5">
        <div className="container">
          <div className="cta-section text-center p-5 rounded-4">
            <h2 className="fw-bold mb-3">
              Jangan Tunggu Sampai Menjadi Korban!
            </h2>

            <p className="mb-4">
              Periksa pesan mencurigakan sebelum mengambil tindakan.
            </p>

            <button
              onClick={() => setHalaman('check')}
              className="btn btn-light btn-lg rounded-pill px-4"
            >
              Mulai Pemeriksaan
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer-section py-4">
        <div className="container text-center">
          <h4 className="fw-bold text-primary">TamengKu</h4>

          <p className="text-secondary mb-2">
            Asisten AI Edukatif untuk Mendeteksi Penipuan Digital.
          </p>

          <small className="text-secondary">
            © 2026 TamengKu. Lindungi Diri, Kenali Penipuan.
          </small>
        </div>
      </footer>
    </>
  )
}

export default App
