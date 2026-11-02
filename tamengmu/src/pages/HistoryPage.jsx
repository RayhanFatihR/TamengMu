
import { useState } from 'react'

const STORAGE_KEY = 'tamengmu_riwayat'

function HistoryPage({ onKembali, onPeriksaLagi }) {
  const [riwayat, setRiwayat] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []
    } catch {
      return []
    }
  })

  // Menghapus satu riwayat
  function hapusRiwayat(id) {
    const riwayatBaru = riwayat.filter(item => item.id !== id)

    localStorage.setItem(STORAGE_KEY, JSON.stringify(riwayatBaru))
    setRiwayat(riwayatBaru)
  }

  // Menghapus semua riwayat
  function hapusSemuaRiwayat() {
    localStorage.removeItem(STORAGE_KEY)
    setRiwayat([])
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

        {riwayat.length === 0 ? (
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
        <strong>Privasi:</strong> Riwayat disimpan di penyimpanan lokal
        browser ini. Menghapus data browser dapat menghilangkan riwayat.
      </div>
    </div>
  )
}

export default HistoryPage
