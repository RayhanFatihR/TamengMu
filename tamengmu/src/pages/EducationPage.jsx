
import { useState } from 'react'
import './EducationPage.css'

function EducationPage({ onKembali }) {
  const [materiAktif, setMateriAktif] = useState('modus')

  const materi = {
    modus: {
      judul: 'Kenali Modus Penipuan Digital',
      deskripsi: 'Kenali berbagai pola penipuan yang sering ditemukan dalam pesan dan komunikasi digital.',
      isi: [
        {
          ikon: '🎁',
          judul: 'Hadiah dan Undian Palsu',
          deskripsi: 'Pelaku mengaku bahwa kamu memenangkan hadiah, lalu meminta biaya administrasi atau mengarahkanmu ke tautan tertentu.'
        },
        {
          ikon: '🏦',
          judul: 'Mengatasnamakan Bank',
          deskripsi: 'Pelaku berpura-pura menjadi petugas bank dan meminta PIN, password, atau kode OTP.'
        },
        {
          ikon: '📦',
          judul: 'Penipuan Paket',
          deskripsi: 'Pelaku mengirim pesan tentang paket bermasalah dan meminta kamu membuka tautan atau mengunduh file.'
        },
        {
          ikon: '⚠️',
          judul: 'Akun Terancam Diblokir',
          deskripsi: 'Pelaku membuat korban panik dengan ancaman akun akan diblokir jika tidak segera melakukan verifikasi.'
        }
      ]
    },

    tips: {
      judul: 'Tips Menjaga Keamanan Digital',
      deskripsi: 'Kebiasaan sederhana yang dapat membantu melindungi akun dan informasi pribadi.',
      isi: [
        {
          ikon: '🔐',
          judul: 'Jaga Kerahasiaan OTP dan PIN',
          deskripsi: 'Jangan pernah memberikan kode OTP, PIN, atau password kepada siapa pun.'
        },
        {
          ikon: '🔗',
          judul: 'Periksa Tautan Sebelum Dibuka',
          deskripsi: 'Perhatikan nama domain website dan pastikan alamatnya berasal dari sumber resmi.'
        },
        {
          ikon: '👤',
          judul: 'Periksa Identitas Pengirim',
          deskripsi: 'Jangan langsung percaya kepada seseorang yang mengaku sebagai petugas bank, kurir, atau instansi tertentu.'
        },
        {
          ikon: '⏳',
          judul: 'Jangan Terburu-buru',
          deskripsi: 'Waspadai pesan yang memaksa kamu segera mentransfer uang atau memberikan informasi pribadi.'
        },
        {
          ikon: '🔑',
          judul: 'Gunakan Password yang Kuat',
          deskripsi: 'Gunakan password yang berbeda untuk akun penting dan aktifkan autentikasi dua faktor jika tersedia.'
        }
      ]
    },

    kasus: {
      judul: 'Contoh Kasus Penipuan',
      deskripsi: 'Pelajari contoh pesan mencurigakan dan alasan mengapa pesan tersebut perlu diwaspadai.',
      isi: [
        {
          ikon: '📩',
          judul: 'Contoh Pesan Hadiah',
          deskripsi: '"Selamat! Kamu memenangkan uang Rp100 juta. Klik tautan berikut untuk mengambil hadiah."',
          alasan: 'Menggunakan hadiah besar dan ajakan mengklik tautan untuk menarik perhatian korban.'
        },
        {
          ikon: '🏦',
          judul: 'Contoh Pesan Bank',
          deskripsi: '"Rekening Anda akan diblokir. Kirimkan kode OTP untuk mengaktifkan kembali akun."',
          alasan: 'Meminta kode OTP dan menggunakan ancaman pemblokiran untuk membuat korban panik.'
        },
        {
          ikon: '📦',
          judul: 'Contoh Pesan Paket',
          deskripsi: '"Paket Anda tertahan. Silakan buka tautan untuk memperbarui data pengiriman."',
          alasan: 'Menggunakan informasi pengiriman untuk mendorong korban membuka tautan yang belum terverifikasi.'
        }
      ]
    },

    laporan: {
      judul: 'Apa yang Harus Dilakukan?',
      deskripsi: 'Langkah awal jika kamu menerima pesan mencurigakan atau sudah menjadi korban penipuan.',
      isi: [
        {
          ikon: '🛑',
          judul: 'Jangan Lanjutkan Transaksi',
          deskripsi: 'Jangan mentransfer uang, memberikan OTP, atau memasukkan password pada tautan yang mencurigakan.'
        },
        {
          ikon: '📸',
          judul: 'Simpan Bukti',
          deskripsi: 'Simpan screenshot percakapan, nomor pengirim, tautan, bukti transfer, dan informasi transaksi.'
        },
        {
          ikon: '🏦',
          judul: 'Hubungi Pihak Terkait',
          deskripsi: 'Jika melibatkan rekening atau layanan keuangan, segera hubungi bank atau penyedia layanan melalui kanal resmi.'
        },
        {
          ikon: '📢',
          judul: 'Laporkan Penipuan',
          deskripsi: 'Gunakan kanal pelaporan resmi yang sesuai dengan jenis penipuan. Jangan menggunakan nomor atau tautan pelaporan yang tidak terverifikasi.'
        },
        {
          ikon: '🔒',
          judul: 'Amankan Akun',
          deskripsi: 'Jika data akun sudah terlanjur diberikan, segera ubah password, keluar dari sesi yang tidak dikenal, dan aktifkan perlindungan tambahan.'
        }
      ]
    }
  }

  const pilihan = [
    { id: 'modus', nama: 'Modus Penipuan', ikon: '🚨', nomor: '01' },
    { id: 'tips', nama: 'Tips Keamanan', ikon: '🛡️', nomor: '02' },
    { id: 'kasus', nama: 'Contoh Kasus', ikon: '📱', nomor: '03' },
    { id: 'laporan', nama: 'Panduan Tindakan', ikon: '📋', nomor: '04' }
  ]

  const konten = materi[materiAktif]
  const pilihanAktif = pilihan.find(item => item.id === materiAktif)

  return (
    <div className="education-page">
      <div className="education-hero">
        <div className="container">
          <div className="education-hero-content">
            <div className="education-label">
              <i className="bi bi-mortarboard-fill"></i>
              PUSAT EDUKASI TAMENGKU
            </div>

            <h1>
              Tingkatkan Kesadaran,
              <span> Lindungi Diri dari Penipuan Digital.</span>
            </h1>

            <p>
              Pelajari cara mengenali modus penipuan, menjaga keamanan
              informasi pribadi, dan mengambil tindakan yang tepat.
            </p>

            <div className="education-hero-info">
              <span><i className="bi bi-book-half"></i> 4 kategori materi</span>
              <span><i className="bi bi-shield-check"></i> Belajar lebih aman</span>
            </div>
          </div>

          <div className="education-hero-icon">
            <div className="education-icon-circle">
              <i className="bi bi-shield-lock-fill"></i>
            </div>
            <span className="education-floating-icon education-floating-one">
              <i className="bi bi-check-circle-fill"></i>
            </span>
            <span className="education-floating-icon education-floating-two">
              <i className="bi bi-lock-fill"></i>
            </span>
          </div>
        </div>
      </div>

      <section className="education-content-section">
        <div className="container">

          <div className="education-section-heading">
            <div>
              <span className="education-eyebrow">MULAI BELAJAR</span>
              <h2>Pilih Materi Edukasi</h2>
              <p>Pilih topik yang ingin kamu pelajari terlebih dahulu.</p>
            </div>
          </div>

          <div className="education-category-grid">
            {pilihan.map(item => (
              <button
                key={item.id}
                className={`education-category ${materiAktif === item.id ? 'active' : ''}`}
                onClick={() => setMateriAktif(item.id)}
              >
                <div className="education-category-top">
                  <span className="education-category-icon">{item.ikon}</span>
                  <span className="education-category-number">{item.nomor}</span>
                </div>
                <div className="education-category-name">{item.nama}</div>
                <div className="education-category-bottom">
                  <span>{materi[item.id].isi.length} materi</span>
                  <i className="bi bi-arrow-right"></i>
                </div>
              </button>
            ))}
          </div>

          <div className="education-material-header">
            <div>
              <span className="education-eyebrow">
                KATEGORI {pilihanAktif.nomor}
              </span>
              <h2>{konten.judul}</h2>
              <p>{konten.deskripsi}</p>
            </div>
            <div className="education-material-count">
              <i className="bi bi-journal-text"></i>
              {konten.isi.length} Materi
            </div>
          </div>

          <div className="education-material-list">
            {konten.isi.map((item, index) => (
              <article className="education-material-card" key={index}>
                <div className="education-material-icon">
                  {item.ikon}
                </div>

                <div className="education-material-body">
                  <div className="education-material-number">
                    MATERI {String(index + 1).padStart(2, '0')}
                  </div>

                  <h3>{item.judul}</h3>
                  <p>{item.deskripsi}</p>

                  {item.alasan && (
                    <div className="education-case-warning">
                      <div className="education-case-warning-title">
                        <i className="bi bi-exclamation-triangle-fill"></i>
                        Mengapa mencurigakan?
                      </div>
                      <p>{item.alasan}</p>
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>

          <div className="education-reminder">
            <div className="education-reminder-icon">
              <i className="bi bi-lightbulb-fill"></i>
            </div>
            <div>
              <h3>Ingat, selalu waspada!</h3>
              <p>
                Jangan mudah percaya pada pesan yang meminta uang,
                password, PIN, atau kode OTP. Selalu periksa informasi
                melalui sumber resmi.
              </p>
            </div>
          </div>

          <button className="education-back-button" onClick={onKembali}>
            <i className="bi bi-arrow-left"></i>
            Kembali ke Beranda
          </button>

        </div>
      </section>
    </div>
  )
}

export default EducationPage
