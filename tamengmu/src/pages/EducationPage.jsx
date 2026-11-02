
import { useState } from 'react'

function EducationPage({ onKembali }) {
  const [materiAktif, setMateriAktif] = useState('modus')

  const materi = {
    modus: {
      judul: 'Kenali Modus Penipuan Digital',
      deskripsi: 'Beberapa pola penipuan yang sering ditemukan dalam pesan dan komunikasi digital.',
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
    { id: 'modus', nama: 'Modus Penipuan', ikon: '🚨' },
    { id: 'tips', nama: 'Tips Keamanan', ikon: '🛡️' },
    { id: 'kasus', nama: 'Contoh Kasus', ikon: '📱' },
    { id: 'laporan', nama: 'Panduan Tindakan', ikon: '📋' }
  ]

  const konten = materi[materiAktif]

  return (
    <div className="container py-5">
      {/* Judul */}
      <div className="text-center mb-5">
        <span className="badge bg-primary-subtle text-primary px-3 py-2 mb-3">
          Belajar Keamanan Digital
        </span>

        <h2 className="fw-bold">
          Pusat Edukasi TamengKu
        </h2>

        <p className="text-secondary">
          Pelajari cara mengenali dan menghindari penipuan digital.
        </p>
      </div>

      {/* Pilihan Materi */}
      <div className="row g-3 mb-5">
        {pilihan.map(item => (
          <div className="col-6 col-md-3" key={item.id}>
            <button
              className={`btn w-100 h-100 py-3 rounded-4 ${
                materiAktif === item.id
                  ? 'btn-primary'
                  : 'btn-outline-primary'
              }`}
              onClick={() => setMateriAktif(item.id)}
            >
              <div className="fs-3 mb-2">{item.ikon}</div>
              <div className="fw-semibold">{item.nama}</div>
            </button>
          </div>
        ))}
      </div>

      {/* Isi Materi */}
      <div className="mx-auto" style={{ maxWidth: '850px' }}>
        <div className="mb-4">
          <h3 className="fw-bold">{konten.judul}</h3>
          <p className="text-secondary">{konten.deskripsi}</p>
        </div>

        <div className="row g-3">
          {konten.isi.map((item, index) => (
            <div className="col-12" key={index}>
              <div className="card border-0 shadow-sm rounded-4">
                <div className="card-body p-4">
                  <div className="d-flex gap-3">
                    <div className="fs-2">{item.ikon}</div>

                    <div>
                      <h5 className="fw-bold">
                        {item.judul}
                      </h5>

                      <p className="text-secondary mb-0">
                        {item.deskripsi}
                      </p>

                      {item.alasan && (
                        <div className="alert alert-warning mt-3 mb-0">
                          <strong>Mengapa mencurigakan?</strong>
                          <br />
                          {item.alasan}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pengingat */}
        <div className="alert alert-info mt-4 rounded-4">
          <strong>Ingat!</strong>
          <br />
          Jangan mudah percaya pada pesan yang meminta uang,
          password, PIN, atau kode OTP. Selalu periksa informasi
          melalui sumber resmi.
        </div>

        <button
          className="btn btn-outline-primary w-100 mt-3"
          onClick={onKembali}
        >
          ← Kembali ke Beranda
        </button>
      </div>
    </div>
  )
}

export default EducationPage
