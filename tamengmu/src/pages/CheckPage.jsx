
import { useState } from 'react'
import ResultPage from './ResultPage'
import analyzeInput from '../services/analyzeInput'
import recognizeImage from '../services/ocrService'
import { simpanRiwayat } from '../services/riwayatService'
import { isLoggedIn } from '../services/authService'

function CheckPage() {
    const [jenisPemeriksaan, setJenisPemeriksaan] = useState('pesan')
    const [pesan, setPesan] = useState('')
    const [hasil, setHasil] = useState(null)

    const [loadingOCR, setLoadingOCR] = useState(false)
    const [loadingPeriksa, setLoadingPeriksa] = useState(false)
    const [error, setError] = useState('')
    const [pesanPenyimpanan, setPesanPenyimpanan] = useState('')

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

    // Mengganti jenis pemeriksaan
    function handleJenisChange(jenis) {
        setJenisPemeriksaan(jenis)
        setPesan('')
        setHasil(null)
        setError('')
        setPesanPenyimpanan('')
    }

    // Menjalankan pemeriksaan
    async function handlePeriksa(e) {
        e.preventDefault()

        setError('')
        setPesanPenyimpanan('')

        if (!pesan.trim()) {
            setError('Masukkan informasi yang ingin diperiksa.')
            return
        }

        setLoadingPeriksa(true)

        try {
            const jenisAnalisis =
                jenisPemeriksaan === 'tautan' ? 'tautan' : 'pesan'

            const hasilAnalisis = analyzeInput(pesan, jenisAnalisis)

            const namaJenis =
                jenisPemeriksaan === 'pesan'
                    ? 'Pesan'
                    : jenisPemeriksaan === 'tautan'
                        ? 'Tautan'
                        : 'Screenshot'

            // Menampilkan hasil pemeriksaan
            setHasil(hasilAnalisis)

            // Jika pengguna sudah login, simpan ke PostgreSQL
            if (isLoggedIn()) {
                try {
                    await simpanRiwayat({
                        jenis: namaJenis,
                        data: pesan,
                        status: hasilAnalisis.status,
                        alasan: hasilAnalisis.alasan
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
            console.error(error)
            setError('Terjadi kesalahan saat melakukan pemeriksaan.')

        } finally {
            setLoadingPeriksa(false)
        }
    }

    // Menampilkan hasil pemeriksaan
    if (hasil) {
        const namaJenis =
            jenisPemeriksaan === 'pesan'
                ? 'Pesan'
                : jenisPemeriksaan === 'tautan'
                    ? 'Tautan'
                    : 'Screenshot'

        return (
            <ResultPage
                jenis={namaJenis}
                data={pesan}
                hasil={hasil}
                pesanPenyimpanan={pesanPenyimpanan}
                onKembali={() => {
                    setHasil(null)
                    setPesan('')
                    setError('')
                    setPesanPenyimpanan('')
                }}
            />
        )
    }

    return (
        <div className="container py-5">
            <div className="text-center mb-5">
                <h2 className="fw-bold">
                    Periksa Pesan Mencurigakan
                </h2>

                <p className="text-secondary">
                    Masukkan informasi yang ingin kamu periksa.
                </p>
            </div>

            <div
                className="card shadow-sm border-0 rounded-4 mx-auto"
                style={{ maxWidth: '750px' }}
            >
                <div className="card-body p-4 p-md-5">
                    <h5 className="fw-bold mb-3">
                        Pilih Jenis Pemeriksaan
                    </h5>

                    <div className="d-flex flex-wrap gap-2 mb-4">
                        <button
                            type="button"
                            className={`btn ${
                                jenisPemeriksaan === 'pesan'
                                    ? 'btn-primary'
                                    : 'btn-outline-primary'
                            }`}
                            onClick={() => handleJenisChange('pesan')}
                        >
                            💬 Pesan
                        </button>

                        <button
                            type="button"
                            className={`btn ${
                                jenisPemeriksaan === 'tautan'
                                    ? 'btn-primary'
                                    : 'btn-outline-primary'
                            }`}
                            onClick={() => handleJenisChange('tautan')}
                        >
                            🔗 Tautan
                        </button>

                        <button
                            type="button"
                            className={`btn ${
                                jenisPemeriksaan === 'gambar'
                                    ? 'btn-primary'
                                    : 'btn-outline-primary'
                            }`}
                            onClick={() => handleJenisChange('gambar')}
                        >
                            📷 Screenshot
                        </button>
                    </div>

                    <form onSubmit={handlePeriksa}>
                        {/* Pemeriksaan pesan */}
                        {jenisPemeriksaan === 'pesan' && (
                            <div className="mb-3">
                                <label className="form-label fw-semibold">
                                    Masukkan pesan yang mencurigakan
                                </label>

                                <textarea
                                    className="form-control"
                                    rows="6"
                                    placeholder="Contoh: Selamat! Anda memenangkan hadiah..."
                                    value={pesan}
                                    onChange={(e) => setPesan(e.target.value)}
                                    required
                                />
                            </div>
                        )}

                        {/* Pemeriksaan tautan */}
                        {jenisPemeriksaan === 'tautan' && (
                            <div className="mb-3">
                                <label className="form-label fw-semibold">
                                    Masukkan tautan website
                                </label>

                                <input
                                    type="url"
                                    className="form-control"
                                    placeholder="https://contoh-website.com"
                                    value={pesan}
                                    onChange={(e) => setPesan(e.target.value)}
                                    required
                                />
                            </div>
                        )}

                        {/* Pemeriksaan screenshot */}
                        {jenisPemeriksaan === 'gambar' && (
                            <div className="mb-3">
                                <label className="form-label fw-semibold">
                                    Unggah screenshot percakapan
                                </label>

                                <input
                                    type="file"
                                    className="form-control"
                                    accept="image/png, image/jpeg, image/webp"
                                    onChange={handleImageChange}
                                />

                                <small className="text-secondary">
                                    Format gambar: JPG, PNG, atau WEBP.
                                    Maksimal 5 MB.
                                </small>

                                {loadingOCR && (
                                    <div className="alert alert-info mt-3">
                                        <div className="spinner-border spinner-border-sm me-2" />
                                        Sedang membaca tulisan dari gambar...
                                    </div>
                                )}

                                {pesan && !loadingOCR && (
                                    <div className="mt-4">
                                        <label className="form-label fw-semibold">
                                            Hasil Pembacaan OCR
                                        </label>

                                        <textarea
                                            className="form-control"
                                            rows="6"
                                            value={pesan}
                                            onChange={(e) => setPesan(e.target.value)}
                                        />

                                        <small className="text-secondary">
                                            Periksa dan perbaiki teks jika ada kesalahan
                                            sebelum melanjutkan.
                                        </small>
                                    </div>
                                )}
                            </div>
                        )}

                        {error && (
                            <div className="alert alert-danger">
                                {error}
                            </div>
                        )}

                        <div className="alert alert-info mt-3">
                            <strong>Tips keamanan:</strong>
                            <br />
                            Jangan pernah membagikan password, PIN,
                            atau kode OTP.
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary w-100 py-3"
                            disabled={loadingOCR || loadingPeriksa}
                        >
                            {loadingPeriksa
                                ? 'Sedang Memeriksa...'
                                : loadingOCR
                                    ? 'Sedang Membaca Gambar...'
                                    : 'Periksa Sekarang'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CheckPage
