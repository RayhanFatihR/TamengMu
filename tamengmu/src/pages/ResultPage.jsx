
function ResultPage({ jenis, data, hasil, onKembali }) {
  // Menentukan warna berdasarkan status
  let warna = 'secondary'
  let ikon = '🔎'

  if (hasil.status === 'Bahaya') {
    warna = 'danger'
    ikon = '🚨'
  } else if (hasil.status === 'Waspada') {
    warna = 'warning'
    ikon = '⚠️'
  }

  return (
    <div className="container py-5">
      <div className="text-center mb-4">
        <h2 className="fw-bold">Hasil Pemeriksaan</h2>

        <p className="text-secondary">
          Berikut hasil analisis awal TamengMu.
        </p>
      </div>

      <div
        className="card border-0 shadow-sm rounded-4 mx-auto"
        style={{ maxWidth: '750px' }}
      >
        <div className="card-body p-4 p-md-5">

          {/* Status Hasil */}
          <div className="text-center mb-4">
            <div className="display-1">{ikon}</div>

            <span className={`badge bg-${warna} text-${warna === 'warning' ? 'dark' : 'white'} fs-6 px-4 py-2`}>
              {hasil.status.toUpperCase()}
            </span>

            <h4 className="fw-bold mt-3">
              {hasil.status === 'Bahaya'
                ? 'Berpotensi berbahaya!'
                : hasil.status === 'Waspada'
                  ? 'Tetap berhati-hati!'
                  : 'Belum ditemukan indikasi mencurigakan'}
            </h4>

            <p className="text-secondary">
              {hasil.alasan}
            </p>
          </div>

          <hr />

          {/* Informasi yang Diperiksa */}
          <h5 className="fw-bold">Informasi yang Diperiksa</h5>

          <p>
            <strong>Jenis pemeriksaan:</strong> {jenis}
          </p>

          <div className="bg-light rounded-3 p-3 mb-4">
            <p className="mb-0 text-break">{data}</p>
          </div>

          {/* Saran */}
          <h5 className="fw-bold">Apa yang Harus Dilakukan?</h5>

          <ul className="text-secondary">
            {hasil.saran.map((item, index) => (
              <li key={index} className="mb-2">
                {item}
              </li>
            ))}
          </ul>

          {/* Peringatan */}
          <div className="alert alert-warning mt-4">
            <strong>Catatan penting:</strong>
            <br />
            Hasil ini berasal dari pemeriksaan pola kata sederhana,
            bukan analisis AI atau verifikasi keamanan menyeluruh.
            Status Belum Terindikasi tidak menjamin informasi aman.
          </div>

          <button
            className="btn btn-primary w-100 py-3"
            onClick={onKembali}
          >
            ← Periksa Informasi Lain
          </button>

        </div>
      </div>
    </div>
  )
}

export default ResultPage
