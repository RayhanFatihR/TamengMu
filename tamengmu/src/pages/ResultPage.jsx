import './ResultPage.css'

function ResultPage({
    jenis,
    data,
    hasil,
    pesanPenyimpanan,
    onKembali
}) {
    // Menentukan tampilan berdasarkan status
    let statusClass = 'safe'
    let ikon = 'bi-shield-check'
    let judul = 'Belum Terindikasi'
    let deskripsi = 'Belum ditemukan indikasi mencurigakan dari informasi yang diperiksa.'

    if (hasil.status === 'Bahaya') {
        statusClass = 'danger'
        ikon = 'bi-shield-exclamation'
        judul = 'Berpotensi Berbahaya!'
        deskripsi = 'Ditemukan indikasi yang perlu kamu waspadai. Jangan melakukan tindakan sebelum memastikan kebenarannya.'
    } else if (hasil.status === 'Waspada') {
        statusClass = 'warning'
        ikon = 'bi-exclamation-triangle'
        judul = 'Tetap Berhati-hati!'
        deskripsi = 'Terdapat beberapa hal yang perlu diperhatikan dari informasi yang kamu periksa.'
    }

    const alasan = Array.isArray(hasil.alasan)
        ? hasil.alasan
        : hasil.alasan
            ? [hasil.alasan]
            : []

    const saran = Array.isArray(hasil.saran)
        ? hasil.saran
        : hasil.saran
            ? [hasil.saran]
            : []

    return (
        <div className="result-page">

            {/* Header */}
            <div className="result-header text-center">
                <span className="result-eyebrow">
                    TAMENGKU SECURITY REPORT
                </span>

                <h2>Hasil Pemeriksaan</h2>

                <p>
                    Berikut hasil analisis awal berdasarkan informasi
                    yang kamu berikan.
                </p>
            </div>

            {/* Status */}
            <div className={`result-card result-${statusClass}`}>

                <div className="result-status-section">

                    <div className="result-status-icon">
                        <i className={`bi ${ikon}`}></i>
                    </div>

                    <span className="result-status-label">
                        HASIL ANALISIS
                    </span>

                    <div className="result-status-badge">
                        {hasil.status?.toUpperCase()}
                    </div>

                    <h3>{judul}</h3>

                    <p>{deskripsi}</p>

                </div>

                {/* Alasan */}
                <div className="result-section">

                    <div className="result-section-heading">
                        <span className="result-section-icon">
                            <i className="bi bi-search"></i>
                        </span>

                        <div>
                            <h4>Mengapa mendapatkan hasil ini?</h4>
                            <p>Hal-hal yang ditemukan dalam analisis.</p>
                        </div>
                    </div>

                    {alasan.length > 0 ? (
                        <ul className="result-list">
                            {alasan.map((item, index) => (
                                <li key={index}>
                                    <i className="bi bi-check2-circle"></i>
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="result-empty">
                            Tidak ada alasan tambahan yang diberikan.
                        </p>
                    )}

                </div>

                <div className="result-divider"></div>

                {/* Informasi yang diperiksa */}
                <div className="result-section">

                    <div className="result-section-heading">
                        <span className="result-section-icon">
                            <i className="bi bi-file-earmark-text"></i>
                        </span>

                        <div>
                            <h4>Informasi yang Diperiksa</h4>
                            <p>Detail informasi yang kamu masukkan.</p>
                        </div>
                    </div>

                    <div className="result-info-type">
                        <span>Jenis pemeriksaan</span>
                        <strong>{jenis}</strong>
                    </div>

                    <div className="result-data-box">
                        <p>{data}</p>
                    </div>

                </div>

                <div className="result-divider"></div>

                {/* Saran */}
                <div className="result-section">

                    <div className="result-section-heading">
                        <span className="result-section-icon">
                            <i className="bi bi-lightbulb"></i>
                        </span>

                        <div>
                            <h4>Apa yang Harus Dilakukan?</h4>
                            <p>Ikuti saran berikut untuk menjaga keamananmu.</p>
                        </div>
                    </div>

                    {saran.length > 0 ? (
                        <div className="result-advice-list">
                            {saran.map((item, index) => (
                                <div className="result-advice-item" key={index}>
                                    <span>{index + 1}</span>
                                    <p>{item}</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="result-empty">
                            Tidak ada saran tambahan yang diberikan.
                        </p>
                    )}

                </div>

                {/* Penyimpanan riwayat */}
                {pesanPenyimpanan && (
                    <div className={`result-save-message ${
                        pesanPenyimpanan.includes('berhasil disimpan')
                            ? 'success'
                            : 'warning'
                    }`}>
                        <i className={`bi ${
                            pesanPenyimpanan.includes('berhasil disimpan')
                                ? 'bi-check-circle-fill'
                                : 'bi-exclamation-circle-fill'
                        }`}></i>

                        <span>{pesanPenyimpanan}</span>
                    </div>
                )}

                {/* Catatan penting */}
                <div className="result-disclaimer">
                    <div className="result-disclaimer-icon">
                        <i className="bi bi-info-circle-fill"></i>
                    </div>

                    <div>
                        <strong>Catatan Penting</strong>

                        <p>
                            Hasil ini merupakan analisis awal menggunakan
                            AI berdasarkan informasi yang diberikan.
                            Analisis AI tidak menjamin keamanan suatu
                            pesan atau website secara menyeluruh.
                            Status Belum Terindikasi bukan berarti
                            informasi tersebut pasti aman.
                        </p>
                    </div>
                </div>

                {/* Tombol kembali */}
                <button
                    type="button"
                    className="result-back-button"
                    onClick={onKembali}
                >
                    <i className="bi bi-arrow-left"></i>
                    Periksa Informasi Lain
                </button>

            </div>
        </div>
    )
}

export default ResultPage
