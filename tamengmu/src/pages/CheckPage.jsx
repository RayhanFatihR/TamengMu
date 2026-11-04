
import { useState } from 'react'
import ResultPage from './ResultPage'
import recognizeImage from '../services/ocrService'
import { simpanRiwayat } from '../services/riwayatService'
import { isLoggedIn } from '../services/authService'
import './CheckPage.css'

function CheckPage() {
    const [jenisPemeriksaan, setJenisPemeriksaan] = useState('pesan')
    const [pesan, setPesan] = useState('')
    const [hasil, setHasil] = useState(null)

    const [loadingOCR, setLoadingOCR] = useState(false)
    const [loadingPeriksa, setLoadingPeriksa] = useState(false)
    const [error, setError] = useState('')
    const [pesanPenyimpanan, setPesanPenyimpanan] = useState('')

    function handleJenisChange(jenis) {
        setJenisPemeriksaan(jenis)
        setPesan('')
        setHasil(null)
        setError('')
        setPesanPenyimpanan('')
    }

    // Membaca gambar menggunakan OCR
    async function handleImageChange(e) {
        const file = e.target.files[0]

        if (!file) return

        if (!file.type.startsWith('image/')) {
            setError('File harus berupa gambar.')
            e.target.value = ''
            return
        }

        if (file.size > 5 * 1024 * 1024) {
            setError('Ukuran gambar maksimal 5 MB.')
            e.target.value = ''
            return
        }

        setPesan('')
        setHasil(null)
        setError('')
        setPesanPenyimpanan('')
        setLoadingOCR(true)

        try {
            const hasilTeks = await recognizeImage(file)

            if (!hasilTeks.trim()) {
                setError('Tulisan tidak ditemukan. Coba gambar lain.')
            } else {
                setPesan(hasilTeks)
            }
        } catch (error) {
            setError('Gagal membaca gambar. Silakan coba kembali.')
            console.error(error)
        } finally {
            setLoadingOCR(false)
        }
    }

    // Menjalankan pemeriksaan menggunakan Gemini AI
    async function handlePeriksa(e) {
        e.preventDefault()

        setError('')
        setHasil(null)
        setPesanPenyimpanan('')

        if (!pesan.trim()) {
            setError('Masukkan informasi yang ingin diperiksa.')
            return
        }

        setLoadingPeriksa(true)

        try {
            const namaJenis =
                jenisPemeriksaan === 'pesan'
                    ? 'Pesan'
                    : jenisPemeriksaan === 'tautan'
                        ? 'Tautan'
                        : 'Screenshot'

            const response = await fetch(
                'http://localhost:5000/api/ai/analisis',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        pesan: pesan
                    })
                }
            )

            const data = await response.json()

            if (!response.ok) {
                throw new Error(
                    data.message || 'Gagal melakukan analisis AI.'
                )
            }

            const hasilAnalisis = data.hasil

            setHasil(hasilAnalisis)

            // Simpan riwayat jika pengguna sudah login
            if (isLoggedIn()) {
                try {
                    await simpanRiwayat({
                        jenis: namaJenis,
                        data: pesan,
                        status: hasilAnalisis.status,
                        alasan: hasilAnalisis.alasan.join('\n')
                    })

                    setPesanPenyimpanan(
                        'Hasil pemeriksaan berhasil disimpan ke riwayat.'
                    )
                } catch (error) {
                    console.error('Gagal menyimpan riwayat:', error)

                    setPesanPenyimpanan(
                        'Hasil pemeriksaan berhasil dibuat, tetapi gagal disimpan ke riwayat.'
                    )
                }
            }
        } catch (error) {
            console.error('AI Analysis Error:', error)

            setError(
                error.message ||
                'Terjadi kesalahan saat melakukan pemeriksaan.'
            )
        } finally {
            setLoadingPeriksa(false)
        }
    }

    return (
        <div className="check-page">

            {/* Header halaman */}
            <div className="check-header text-center">
                <div className="check-header-icon">
                    <i className="bi bi-shield-check"></i>
                </div>

                <span className="check-eyebrow">
                    TAMENGKU SECURITY CHECK
                </span>

                <h2>
                    Periksa Sebelum <span>Percaya.</span>
                </h2>

                <p>
                    Bantu kenali potensi penipuan digital dengan
                    memeriksa pesan, tautan, atau screenshot mencurigakan.
                </p>
            </div>

            {/* Form pemeriksaan */}
            <div className="check-card">

                <div className="check-card-heading">
                    <div>
                        <span className="check-step">LANGKAH 01</span>
                        <h4>Pilih jenis pemeriksaan</h4>
                        <p>Pilih informasi yang ingin kamu periksa.</p>
                    </div>

                    <div className="check-heading-icon">
                        <i className="bi bi-search"></i>
                    </div>
                </div>

                {/* Pilihan pemeriksaan */}
                <div className="check-type-list">

                    <button
                        type="button"
                        className={`check-type ${
                            jenisPemeriksaan === 'pesan' ? 'active' : ''
                        }`}
                        onClick={() => handleJenisChange('pesan')}
                    >
                        <span className="check-type-icon">
                            <i className="bi bi-chat-left-text"></i>
                        </span>

                        <span className="check-type-text">
                            <strong>Pesan</strong>
                            <small>SMS atau chat</small>
                        </span>

                        {jenisPemeriksaan === 'pesan' && (
                            <i className="bi bi-check-circle-fill check-selected"></i>
                        )}
                    </button>

                    <button
                        type="button"
                        className={`check-type ${
                            jenisPemeriksaan === 'tautan' ? 'active' : ''
                        }`}
                        onClick={() => handleJenisChange('tautan')}
                    >
                        <span className="check-type-icon">
                            <i className="bi bi-link-45deg"></i>
                        </span>

                        <span className="check-type-text">
                            <strong>Tautan</strong>
                            <small>URL website</small>
                        </span>

                        {jenisPemeriksaan === 'tautan' && (
                            <i className="bi bi-check-circle-fill check-selected"></i>
                        )}
                    </button>

                    <button
                        type="button"
                        className={`check-type ${
                            jenisPemeriksaan === 'gambar' ? 'active' : ''
                        }`}
                        onClick={() => handleJenisChange('gambar')}
                    >
                        <span className="check-type-icon">
                            <i className="bi bi-image"></i>
                        </span>

                        <span className="check-type-text">
                            <strong>Screenshot</strong>
                            <small>Gambar percakapan</small>
                        </span>

                        {jenisPemeriksaan === 'gambar' && (
                            <i className="bi bi-check-circle-fill check-selected"></i>
                        )}
                    </button>

                </div>

                <div className="check-divider"></div>

                <form onSubmit={handlePeriksa}>

                    <div className="check-input-heading">
                        <span className="check-step">LANGKAH 02</span>
                        <h4>
                            {jenisPemeriksaan === 'pesan'
                                ? 'Masukkan pesan'
                                : jenisPemeriksaan === 'tautan'
                                    ? 'Masukkan tautan website'
                                    : 'Unggah screenshot'}
                        </h4>
                    </div>

                    {/* Input pesan */}
                    {jenisPemeriksaan === 'pesan' && (
                        <div className="check-field">
                            <textarea
                                className="form-control check-textarea"
                                rows="6"
                                placeholder="Tempelkan pesan yang ingin kamu periksa di sini..."
                                value={pesan}
                                onChange={(e) => {
                                    setPesan(e.target.value)
                                    setHasil(null)
                                    setError('')
                                }}
                                required
                            />

                            <div className="check-field-footer">
                                <span>
                                    <i className="bi bi-info-circle me-1"></i>
                                    Masukkan isi pesan secara lengkap.
                                </span>
                                <span>{pesan.length} karakter</span>
                            </div>
                        </div>
                    )}

                    {/* Input tautan */}
                    {jenisPemeriksaan === 'tautan' && (
                        <div className="check-field">
                            <div className="check-url-input">
                                <i className="bi bi-link-45deg"></i>

                                <input
                                    type="url"
                                    className="form-control"
                                    placeholder="https://contoh-website.com"
                                    value={pesan}
                                    onChange={(e) => {
                                        setPesan(e.target.value)
                                        setHasil(null)
                                        setError('')
                                    }}
                                    required
                                />
                            </div>

                            <div className="check-field-footer">
                                <span>
                                    <i className="bi bi-info-circle me-1"></i>
                                    Jangan membuka tautan mencurigakan.
                                </span>
                            </div>
                        </div>
                    )}

                    {/* Input screenshot */}
                    {jenisPemeriksaan === 'gambar' && (
                        <div className="check-field">

                            <label className="check-upload-area">
                                <input
                                    type="file"
                                    accept="image/png, image/jpeg, image/webp"
                                    onChange={handleImageChange}
                                />

                                <div className="check-upload-icon">
                                    <i className="bi bi-cloud-arrow-up"></i>
                                </div>

                                <strong>
                                    Klik untuk mengunggah gambar
                                </strong>

                                <span>
                                    Pilih screenshot percakapan yang ingin diperiksa.
                                </span>

                                <small>JPG, PNG, atau WEBP · Maksimal 5 MB</small>
                            </label>

                            {loadingOCR && (
                                <div className="check-loading">
                                    <div className="spinner-border spinner-border-sm"></div>
                                    <span>Sedang membaca tulisan dari gambar...</span>
                                </div>
                            )}

                            {pesan && !loadingOCR && (
                                <div className="check-ocr-result">
                                    <div className="check-ocr-heading">
                                        <i className="bi bi-file-earmark-text"></i>
                                        <strong>Hasil Pembacaan OCR</strong>
                                    </div>

                                    <textarea
                                        className="form-control check-textarea"
                                        rows="6"
                                        value={pesan}
                                        onChange={(e) => {
                                            setPesan(e.target.value)
                                            setHasil(null)
                                            setError('')
                                        }}
                                    />

                                    <small>
                                        Periksa kembali teks hasil pembacaan
                                        sebelum melanjutkan.
                                    </small>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Pesan error */}
                    {error && (
                        <div className="check-error">
                            <i className="bi bi-exclamation-circle-fill"></i>
                            {error}
                        </div>
                    )}

                    {/* Tips keamanan */}
                    <div className="check-security-tip">
                        <div className="check-tip-icon">
                            <i className="bi bi-shield-lock"></i>
                        </div>

                        <div>
                            <strong>Jaga keamanan data pribadimu</strong>
                            <p>
                                Jangan pernah membagikan password, PIN,
                                atau kode OTP kepada siapa pun.
                            </p>
                        </div>
                    </div>

                    {/* Tombol pemeriksaan */}
                    <button
                        type="submit"
                        className="check-submit"
                        disabled={loadingOCR || loadingPeriksa}
                    >
                        {loadingPeriksa ? (
                            <>
                                <span className="spinner-border spinner-border-sm me-2"></span>
                                Sedang menganalisis...
                            </>
                        ) : loadingOCR ? (
                            'Sedang membaca gambar...'
                        ) : (
                            <>
                                Periksa Sekarang
                                <i className="bi bi-arrow-right"></i>
                            </>
                        )}
                    </button>

                    <p className="check-disclaimer">
                        <i className="bi bi-info-circle me-1"></i>
                        Hasil analisis AI merupakan informasi edukatif,
                        bukan jaminan keamanan mutlak.
                    </p>

                </form>
            </div>

            {/* Hasil analisis Gemini */}
            {hasil && (
                <ResultPage
                    jenis={jenisPemeriksaan}
                    data={pesan}
                    hasil={hasil}
                    pesanPenyimpanan={pesanPenyimpanan}
                    onKembali={() => setHasil(null)}
                />
            )}

        </div>
    )
}

export default CheckPage
