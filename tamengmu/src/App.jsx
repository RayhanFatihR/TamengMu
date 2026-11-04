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

// Logo TamengKu
function ShieldLogo() {
  return (
    <svg
      width="38"
      height="42"
      viewBox="0 0 48 52"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M24 3L43 10V23C43 35 35 44 24 49C13 44 5 35 5 23V10L24 3Z"
        fill="#0F766E"
      />
      <path
        d="M16 25L21.5 30.5L33 19"
        stroke="white"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

// Ikon fitur
function FeatureIcon({ type }) {
  const icons = {
    message: (
      <>
        <path d="M20 11.5C20 15.1 16.4 18 12 18C10.8 18 9.7 17.8 8.7 17.4L4 19L5.4 15.4C4.5 14.3 4 13 4 11.5C4 7.9 7.6 5 12 5C16.4 5 20 7.9 20 11.5Z" />
        <path d="M8 11H16M8 14H13" />
      </>
    ),
    link: (
      <>
        <path d="M10 13.5L8.5 15C6.6 16.9 3.5 16.9 1.6 15C-0.3 13.1 -0.3 10 1.6 8.1L6 3.7C7.9 1.8 11 1.8 12.9 3.7" transform="translate(3 3)" />
        <path d="M14 10.5L15.5 9C17.4 7.1 20.5 7.1 22.4 9C24.3 10.9 24.3 14 22.4 15.9L18 20.3C16.1 22.2 13 22.2 11.1 20.3" transform="translate(-2 -2)" />
      </>
    ),
    image: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="3" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <path d="M21 15L16 10L5 21" />
      </>
    )
  }

  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {icons[type]}
    </svg>
  )
}

// Ilustrasi keamanan digital
function SecurityIllustration() {
  return (
    <div className="security-visual">
      <div className="visual-circle"></div>

      <div className="visual-decoration decoration-one"></div>
      <div className="visual-decoration decoration-two"></div>

      <div className="security-card">
        <div className="security-card-top">
          <div className="security-card-label">
            <span className="online-dot"></span>
            Pemeriksaan Digital
          </div>

          <span className="visual-dots">•••</span>
        </div>

        <div className="big-shield">
          <ShieldLogo />
        </div>

        <h3>Perlindungan Digital</h3>

        <p>
          Kenali potensi penipuan sebelum mengambil tindakan.
        </p>

        <div className="visual-status">
          <span className="status-check">✓</span>
          <span>Lebih waspada, lebih aman</span>
        </div>
      </div>

      <div className="floating-card floating-top">
        <span className="floating-icon">✓</span>
        <div>
          <strong>Periksa dahulu</strong>
          <small>Jangan terburu-buru</small>
        </div>
      </div>

      <div className="floating-card floating-bottom">
        <span className="floating-icon">🛡️</span>
        <div>
          <strong>Kenali penipuan</strong>
          <small>Lindungi data pribadi</small>
        </div>
      </div>
    </div>
  )
}

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

  // Navigasi halaman Login
  if (halaman === 'login') {
    return (
      <LoginPage
        onLogin={handleLogin}
        onGoRegister={() => setHalaman('register')}
        onGuest={handleGuest}
      />
    )
  }

  // Navigasi halaman Register
  if (halaman === 'register') {
    return (
      <RegisterPage
        onRegister={handleRegister}
        onGoLogin={() => setHalaman('login')}
        onGuest={handleGuest}
      />
    )
  }

  // Navbar untuk halaman selain beranda
  if (halaman !== 'beranda') {
    return (
      <>
        <nav className="navbar navbar-expand-lg app-navbar">
          <div className="container">
            <button
              className="navbar-brand brand-logo border-0 bg-transparent"
              onClick={() => setHalaman('beranda')}
            >
              <ShieldLogo />
              <span>Tameng<span>Ku</span></span>
            </button>

            <div className="d-flex flex-wrap gap-2">
              <button
                className="btn btn-nav"
                onClick={bukaRiwayat}
              >
                Riwayat
              </button>

              <button
                className="btn btn-nav"
                onClick={() => setHalaman('education')}
              >
                Edukasi
              </button>

              <button
                className="btn btn-primary-custom"
                onClick={() => setHalaman('beranda')}
              >
                ← Beranda
              </button>

              {user ? (
                <button
                  className="btn btn-logout"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              ) : (
                <button
                  className="btn btn-primary-custom"
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
    <div className="tamengku-app">

      {/* NAVBAR */}
      <nav className="navbar navbar-expand-lg app-navbar sticky-top">
        <div className="container">

          <button
            className="navbar-brand brand-logo border-0 bg-transparent"
            onClick={() => setHalaman('beranda')}
          >
            <ShieldLogo />
            <span>Tameng<span>Ku</span></span>
          </button>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarMenu"
            aria-controls="navbarMenu"
            aria-expanded="false"
            aria-label="Buka navigasi"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarMenu">
            <ul className="navbar-nav ms-auto align-items-lg-center gap-lg-3">

              <li className="nav-item">
                <a className="nav-link active" href="#beranda">
                  Beranda
                </a>
              </li>

              <li className="nav-item">
                <a className="nav-link" href="#fitur">
                  Fitur
                </a>
              </li>

              <li className="nav-item">
                <a className="nav-link" href="#cara-kerja">
                  Cara Kerja
                </a>
              </li>

              <li className="nav-item">
                <button
                  className="btn btn-nav"
                  onClick={() => setHalaman('education')}
                >
                  Edukasi
                </button>
              </li>

              <li className="nav-item">
                <button
                  className="btn btn-nav"
                  onClick={bukaRiwayat}
                >
                  Riwayat
                </button>
              </li>

              {user ? (
                <>
                  <li className="nav-item user-greeting">
                    Halo, {user.nama}
                  </li>

                  <li className="nav-item">
                    <button
                      className="btn btn-logout"
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
                      className="btn btn-nav"
                      onClick={() => setHalaman('login')}
                    >
                      Login
                    </button>
                  </li>

                  <li className="nav-item">
                    <button
                      className="btn btn-primary-custom"
                      onClick={() => setHalaman('register')}
                    >
                      Daftar
                    </button>
                  </li>
                </>
              )}

            </ul>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="hero-section" id="beranda">
        <div className="container">
          <div className="row align-items-center hero-row">

            <div className="col-lg-6 hero-content">

              <div className="hero-label">
                <span className="hero-label-dot"></span>
                ASISTEN KEAMANAN DIGITAL
              </div>

              <h1>
                Jangan Mudah Tertipu,
                <span> Kenali Sebelum Terjadi.</span>
              </h1>

              <p className="hero-description">
                Pesan mencurigakan? Tautan tidak dikenal?
                Jangan langsung percaya. TamengKu membantu
                mengenali potensi penipuan digital dengan
                penjelasan yang mudah dipahami.
              </p>

              <div className="hero-actions">
                <button
                  className="btn btn-primary-custom btn-lg"
                  onClick={() => setHalaman('check')}
                >
                  Mulai Pemeriksaan
                  <span className="button-arrow">→</span>
                </button>

                <a
                  href="#cara-kerja"
                  className="btn btn-secondary-custom btn-lg"
                >
                  Pelajari Cara Kerja
                </a>
              </div>

              <div className="hero-trust">
                <span className="trust-check">✓</span>
                <span>Mudah digunakan</span>

                <span className="trust-divider">•</span>

                <span className="trust-check">✓</span>
                <span>Gratis digunakan</span>
              </div>

            </div>

            <div className="col-lg-6">
              <SecurityIllustration />
            </div>

          </div>
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="trust-section">
        <div className="container">
          <div className="row g-3 text-center">

            <div className="col-md-4">
              <div className="trust-item">
                <span className="trust-item-icon">💬</span>
                <div>
                  <strong>Periksa Pesan</strong>
                  <small>Kenali pesan mencurigakan</small>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="trust-item">
                <span className="trust-item-icon">🔗</span>
                <div>
                  <strong>Periksa Tautan</strong>
                  <small>Lebih waspada sebelum membuka</small>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="trust-item">
                <span className="trust-item-icon">📷</span>
                <div>
                  <strong>Periksa Gambar</strong>
                  <small>Analisis teks dari screenshot</small>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="features-section" id="fitur">
        <div className="container">

          <div className="section-heading">
            <span className="section-label">FITUR TAMENGKU</span>

            <h2>
              Satu Langkah Kecil untuk
              <span> Keamanan Digital</span>
            </h2>

            <p>
              Gunakan TamengKu untuk membantu mengenali
              berbagai bentuk potensi penipuan digital.
            </p>
          </div>

          <div className="row g-4">

            <div className="col-lg-4 col-md-6">
              <div className="feature-card">
                <div className="feature-icon feature-teal">
                  <FeatureIcon type="message" />
                </div>

                <span className="feature-number">01 / PESAN</span>

                <h3>Periksa Pesan</h3>

                <p>
                  Masukkan isi SMS atau percakapan WhatsApp
                  yang mencurigakan untuk mendapatkan analisis.
                </p>

                <button
                  className="feature-link"
                  onClick={() => setHalaman('check')}
                >
                  Coba fitur ini <span>→</span>
                </button>
              </div>
            </div>

            <div className="col-lg-4 col-md-6">
              <div className="feature-card">
                <div className="feature-icon feature-blue">
                  <FeatureIcon type="link" />
                </div>

                <span className="feature-number">02 / TAUTAN</span>

                <h3>Periksa Tautan</h3>

                <p>
                  Periksa teks tautan yang tidak dikenal
                  untuk mengetahui indikasi potensi penipuan.
                </p>

                <button
                  className="feature-link"
                  onClick={() => setHalaman('check')}
                >
                  Coba fitur ini <span>→</span>
                </button>
              </div>
            </div>

            <div className="col-lg-4 col-md-6">
              <div className="feature-card">
                <div className="feature-icon feature-orange">
                  <FeatureIcon type="image" />
                </div>

                <span className="feature-number">03 / GAMBAR</span>

                <h3>Periksa Screenshot</h3>

                <p>
                  Unggah screenshot percakapan atau pesan.
                  Sistem membantu membaca teks untuk dianalisis.
                </p>

                <button
                  className="feature-link"
                  onClick={() => setHalaman('check')}
                >
                  Coba fitur ini <span>→</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="how-section" id="cara-kerja">
        <div className="container">

          <div className="section-heading">
            <span className="section-label">CARA KERJA</span>

            <h2>
              Mudah Digunakan,
              <span> Hanya 3 Langkah</span>
            </h2>

            <p>
              Tidak perlu menjadi ahli teknologi.
              Ikuti langkah sederhana berikut.
            </p>
          </div>

          <div className="row g-4 steps-row">

            <div className="col-md-4">
              <div className="step-card">
                <div className="step-number">01</div>
                <div className="step-symbol">📝</div>

                <h3>Masukkan Informasi</h3>

                <p>
                  Masukkan pesan, tautan, atau unggah
                  screenshot yang ingin diperiksa.
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="step-card">
                <div className="step-number">02</div>
                <div className="step-symbol">🔍</div>

                <h3>Proses Pemeriksaan</h3>

                <p>
                  TamengKu menggunakan AI untuk membantu
                  menganalisis informasi yang diberikan.
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="step-card">
                <div className="step-number">03</div>
                <div className="step-symbol">🛡️</div>

                <h3>Pahami Hasilnya</h3>

                <p>
                  Pelajari hasil analisis, alasan,
                  dan saran tindakan selanjutnya.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* EDUCATION SECTION */}
      <section className="education-promo">
        <div className="container">
          <div className="education-box">

            <div className="education-content">
              <span className="section-label">BELAJAR KEAMANAN DIGITAL</span>

              <h2>
                Lebih Mengenal Penipuan,
                <span> Lebih Siap Melindungi Diri.</span>
              </h2>

              <p>
                Tingkatkan pengetahuan tentang berbagai modus
                penipuan digital dan pelajari cara menghindarinya.
              </p>

              <button
                className="btn btn-primary-custom"
                onClick={() => setHalaman('education')}
              >
                Pelajari Edukasi <span>→</span>
              </button>
            </div>

            <div className="education-visual">
              <div className="education-shield">
                <ShieldLogo />
              </div>
              <div className="education-circle"></div>
            </div>

          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div className="container">

          <div className="cta-box">
            <div className="cta-decoration"></div>

            <div className="cta-content">
              <span className="cta-label">JAGA DIRI DI DUNIA DIGITAL</span>

              <h2>
                Jangan Tunggu Sampai
                Menjadi Korban.
              </h2>

              <p>
                Periksa pesan mencurigakan sebelum
                mengambil keputusan.
              </p>

              <button
                className="btn btn-cta"
                onClick={() => setHalaman('check')}
              >
                Mulai Pemeriksaan <span>→</span>
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer-section">
        <div className="container">

          <div className="row g-4">

            <div className="col-lg-6">
              <div className="footer-brand">
                <ShieldLogo />
                <span>Tameng<span>Ku</span></span>
              </div>

              <p className="footer-description">
                Asisten AI edukatif untuk membantu masyarakat
                mengenali potensi penipuan digital.
              </p>
            </div>

            <div className="col-lg-3 col-6">
              <h5>Navigasi</h5>
              <a href="#beranda">Beranda</a>
              <a href="#fitur">Fitur</a>
              <a href="#cara-kerja">Cara Kerja</a>
            </div>

            <div className="col-lg-3 col-6">
              <h5>Layanan</h5>

              <button onClick={() => setHalaman('check')}>
                Pemeriksaan
              </button>

              <button onClick={() => setHalaman('education')}>
                Edukasi
              </button>

              <button onClick={bukaRiwayat}>
                Riwayat
              </button>
            </div>

          </div>

          <div className="footer-bottom">
            <span>© 2026 TamengKu. Semua hak dilindungi.</span>
            <span>Lindungi Diri, Kenali Penipuan.</span>
          </div>

        </div>
      </footer>

    </div>
  )
}

export default App