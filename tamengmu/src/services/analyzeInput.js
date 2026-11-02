
function analyzeInput(teks, jenis = 'pesan') {
  const input = teks.toLowerCase().trim()

  // =====================================
  // 1. PEMERIKSAAN TAUTAN
  // =====================================

  if (jenis === 'tautan') {
    let url

    try {
      url = new URL(input)
    } catch {
      return {
        status: 'Waspada',
        alasan: 'Format tautan tidak valid atau tidak dapat dibaca.',
        saran: [
          'Pastikan alamat website ditulis dengan benar.',
          'Jangan membuka tautan yang tidak dikenal.'
        ]
      }
    }

    const hostname = url.hostname.toLowerCase()

    const indikatorURL = []

    // Memeriksa penggunaan HTTP
    if (url.protocol !== 'https:') {
      indikatorURL.push('Website tidak menggunakan HTTPS.')
    }

    // Memeriksa alamat IP sebagai hostname
    if (/^\d{1,3}(\.\d{1,3}){3}$/.test(hostname)) {
      indikatorURL.push('Tautan menggunakan alamat IP langsung.')
    }

    // Memeriksa domain yang menggunakan Punycode
    if (hostname.includes('xn--')) {
      indikatorURL.push('Domain menggunakan karakter Punycode.')
    }

    // Memeriksa layanan pemendek tautan
    const shortener = [
      'bit.ly',
      'tinyurl.com',
      't.co',
      'is.gd',
      'cutt.ly'
    ]

    if (shortener.includes(hostname)) {
      indikatorURL.push('Tautan menggunakan layanan pemendek URL.')
    }

    // Memeriksa kata mencurigakan pada nama domain
    const kataMencurigakan = [
      'login',
      'verify',
      'hadiah',
      'gratis',
      'claim',
      'bank'
    ]

    if (kataMencurigakan.some(kata => hostname.includes(kata))) {
      indikatorURL.push('Domain mengandung kata yang perlu diperiksa lebih lanjut.')
    }

    if (indikatorURL.length > 0) {
      return {
        status: 'Waspada',
        alasan: indikatorURL.join(' '),
        saran: [
          'Jangan memasukkan password atau kode OTP.',
          'Periksa nama domain dengan teliti.',
          'Pastikan alamat website berasal dari sumber resmi.',
          'Periksa reputasi tautan sebelum membukanya.'
        ]
      }
    }

    return {
      status: 'Belum Terindikasi',
      alasan: 'Tidak ditemukan pola URL mencurigakan dari pemeriksaan sederhana TamengMu.',
      saran: [
        'Tetap pastikan website merupakan situs resmi.',
        'Jangan memberikan informasi rahasia.',
        'Periksa reputasi website melalui layanan keamanan.'
      ]
    }
  }

  // =====================================
  // 2. PEMERIKSAAN PESAN
  // =====================================

  const indikatorBahaya = [
    'kode otp',
    'password',
    'pin',
    'transfer sekarang',
    'rekening anda diblokir',
    'klik link berikut',
    'akun anda diblokir',
    'berikan kode verifikasi'
  ]

  const indikatorWaspada = [
    'memenangkan',
    'hadiah',
    'undian',
    'segera klaim',
    'kesempatan terbatas',
    'verifikasi akun',
    'mengatasnamakan bank',
    'info klik',
    'klik:',
    'uang 100jt',
    'uang 100 juta'
  ]

  const ditemukanBahaya = indikatorBahaya.some(kata =>
    input.includes(kata)
  )

  const ditemukanWaspada = indikatorWaspada.some(kata =>
    input.includes(kata)
  )

  if (ditemukanBahaya) {
    return {
      status: 'Bahaya',
      alasan: 'Pesan mengandung indikasi permintaan informasi sensitif atau tindakan berisiko.',
      saran: [
        'Jangan memberikan kode OTP, PIN, atau password.',
        'Jangan melakukan transfer uang.',
        'Hubungi pihak resmi untuk memastikan informasi.'
      ]
    }
  }

  if (ditemukanWaspada) {
    return {
      status: 'Waspada',
      alasan: 'Pesan mengandung pola yang sering digunakan dalam penipuan digital.',
      saran: [
        'Periksa kebenaran informasi melalui sumber resmi.',
        'Jangan terburu-buru mengklik tautan.',
        'Jangan memberikan informasi pribadi.'
      ]
    }
  }

  return {
    status: 'Belum Terindikasi',
    alasan: 'Tidak ditemukan pola mencurigakan dari daftar pemeriksaan sederhana TamengMu.',
    saran: [
      'Tetap periksa identitas pengirim.',
      'Pastikan alamat website benar.',
      'Jangan membagikan informasi rahasia.'
    ]
  }
}

export default analyzeInput
