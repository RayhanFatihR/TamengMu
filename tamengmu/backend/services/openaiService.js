const { GoogleGenAI } = require('@google/genai')

let ai

async function analisisPesan(pesan) {
    if (!pesan || !pesan.trim()) {
        throw new Error('Pesan tidak boleh kosong.')
    }

    // Membuat koneksi ke Gemini
    if (!ai) {
        ai = new GoogleGenAI({
            apiKey: process.env.GEMINI_API_KEY
        })
    }

    const response = await ai.models.generateContent({
        model: 'gemini-flash-latest',

        contents: `
            Kamu adalah TamengKu, asisten AI edukatif
            yang membantu masyarakat Indonesia mengenali
            potensi penipuan digital.

            Analisis pesan berikut berdasarkan:
            1. Janji hadiah atau uang yang tidak masuk akal.
            2. Permintaan OTP, PIN, password, atau data pribadi.
            3. Tautan yang mencurigakan.
            4. Tekanan agar korban segera bertindak.
            5. Penyamaran sebagai bank, kurir, atau instansi.

            Gunakan bahasa Indonesia yang sederhana
            dan mudah dipahami masyarakat umum.

            Berikan hasil dengan susunan:
            - Status: Belum Terindikasi, Waspada, atau Bahaya.
            - Alasan: Jelaskan indikator yang ditemukan.
            - Saran: Berikan tindakan yang sebaiknya dilakukan.

            Jangan menyatakan pesan pasti aman hanya karena
            tidak menemukan tanda penipuan.

            Hasil analisis adalah indikasi, bukan kepastian.

            Pesan yang harus dianalisis:
            ${pesan}
        `
    })

    return response.text
}

module.exports = {
    analisisPesan
}