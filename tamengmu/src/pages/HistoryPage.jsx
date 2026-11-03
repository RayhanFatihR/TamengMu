
import { useState, useEffect } from 'react'
import {
  getRiwayat,
  hapusRiwayat as hapusRiwayatAPI
} from '../services/riwayatService'

function HistoryPage({ onKembali, onPeriksaLagi }) {
  const [riwayat, setRiwayat] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // Mengambil riwayat dari backend
  async function ambilRiwayat() {
    try {
      setLoading(true)
      setError('')

      const hasil = await getRiwayat()
      setRiwayat(hasil)
    } catch (error) {
      console.error(error)
      setError('Gagal mengambil riwayat pemeriksaan.')
    } finally {
      setLoading(false)
    }
  }

  // Mengambil data saat halaman dibuka
  useEffect(() => {
    ambilRiwayat()
  }, [])

  // Menghapus satu riwayat
  async function hapusRiwayat(id) {
    try {
      await hapusRiwayatAPI(id)

      setRiwayat(
        riwayat.filter(item => item.id !== id)
      )
    } catch (error) {
      console.error(error)
      alert('Gagal menghapus riwayat.')
    }
  }

  // Menghapus semua riwayat
  async function hapusSemuaRiwayat() {
    const konfirmasi = window.confirm(
      'Apakah kamu yakin ingin menghapus semua riwayat?'
    )

    if (!konfirmasi) return

    try {
      await Promise.all(
        riwayat.map(item => hapusRiwayatAPI(item.id))
      )

      setRiwayat([])
    } catch (error) {
      console.error(error)
      alert('Sebagian atau seluruh riwayat gagal dihapus.')

      // Memuat ulang data dari database
      ambilRiwayat()
    }
  }

  // Mengatur warna status
  function warnaStatus(status) {
    if (status === 'Bahaya') return 'danger'
    if (status === 'Waspada') return 'warning'
    return 'secondary'
  }

  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <h2 className="fw-bold">Riwayat Pemeriksaan</h2>
        <p className="text-secondary">
          Lihat kembali informasi yang pernah diperiksa.
        </p>
      </div>

      <div className="mx-auto" style={{ maxWidth: '850px' }}>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <span className="text-secondary">
            Total pemeriksaan: {riwayat.length}
          </span>

          {riwayat.length > 0 && (
            <button
              className="btn btn-outline-danger btn-sm"
              onClick={hapusSemuaRiwayat}
            >
              Hapus Semua
            </button>
          )}
        </div>

        {/* Tampilan loading */}
        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="text-secondary mt-3">
              Memuat riwayat pemeriksaan...
            </p>
          </div>

        ) : error ? (
          /* Tampilan error */
          <div className="alert alert-danger text-center">
            {error}

            <button
              className="btn btn-outline-danger btn-sm d-block mx-auto mt-3"
              onClick={ambilRiwayat}
            >
              Coba Lagi
            </button>
          </div>

        ) : riwayat.length === 0 ? (
          /* Tampilan jika belum ada riwayat */
          <div className="card border-0 shadow-sm rounded-4 text-center p-5">
            <div className="display-3">📋</div>

            <h5 className="fw-bold mt-3">
              Belum Ada Riwayat
            </h5>

            <p className="text-secondary">
              Pemeriksaan yang kamu lakukan akan muncul di sini.
            </p>

            <button
              className="btn btn-primary rounded-pill mt-2"
              onClick={onPeriksaLagi}
            >
              Mulai Pemeriksaan
            </button>
          </div>

        ) : (
          /* Menampilkan daftar riwayat */
          riwayat.map(item => (
            <div
              className="card border-0 shadow-sm rounded-4 mb-3"
              key={item.id}
            >
              <div className="card-body p-4">
                <div className="d-flex justify-content-between align-items-start gap-3">
                  <div>
                    <span className="badge bg-light text-dark mb-2">
                      {item.jenis}
                    </span>

                    <span
                      className={`badge bg-${warnaStatus(item.status)} ms-2 mb-2 ${
                        item.status === 'Waspada' ? 'text-dark' : ''
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>

                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => hapusRiwayat(item.id)}
                  >
                    Hapus
                  </button>
                </div>

                <p className="text-secondary small mb-2">
                  {new Date(item.tanggal).toLocaleString('id-ID')}
                </p>

                <div className="bg-light rounded-3 p-3 mb-3">
                  <p className="mb-0 text-break">
                    {item.data.length > 250
                      ? item.data.substring(0, 250) + '...'
                      : item.data}
                  </p>
                </div>

                <p className="mb-0">
                  <strong>Hasil:</strong> {item.alasan}
                </p>
              </div>
            </div>
          ))
        )}

        <button
          className="btn btn-outline-primary w-100 mt-3"
          onClick={onKembali}
        >
          ← Kembali
        </button>
      </div>

      <div className="alert alert-info mt-4 mx-auto" style={{ maxWidth: '850px' }}>
        <strong>Privasi:</strong> Riwayat pemeriksaan disimpan di database
        server TamengKu, bukan hanya di penyimpanan lokal browser.
      </div>
    </div>
  )
}

export default HistoryPage
