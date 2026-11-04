
const { GoogleGenAI } = require('@google/genai')

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
})

async function analisisPesan(pesan) {
    if (!pesan || !pesan.trim()) {
        throw new Error('Pesan tidak boleh kosong.')
    }

    const response = await ai.models.generateContent({
        model: 'gemini-3.5-flash-lite',

        contents: `
            Kamu adalah TamengKu, asisten AI edukatif
            untuk membantu masyarakat Indonesia mengenali
            potensi penipuan digital.

            Analisis pesan berikut:
            ${pesan}

            Perhatikan:
            1. Janji hadiah atau uang tidak masuk akal.
            2. Permintaan OTP, PIN, password, atau data pribadi.
            3. Tautan mencurigakan.
            4. Tekanan agar korban segera bertindak.
            5. Penyamaran sebagai bank, kurir, atau instansi.

            Tentukan status berdasarkan bukti dalam pesan.
            Jangan menyatakan pesan pasti aman.
            Gunakan bahasa Indonesia sederhana.
            Jika bukti tidak cukup, pilih Belum Terindikasi.
            Jangan mengarang indikator yang tidak ditemukan.
        `,

        config: {
            responseMimeType: 'application/json',

            responseSchema: {
                type: 'OBJECT',
                properties: {
                    status: {
                        type: 'STRING',
                        enum: [
                            'Belum Terindikasi',
                            'Waspada',
                            'Bahaya'
                        ]
                    },
                    alasan: {
                        type: 'ARRAY',
                        items: {
                            type: 'STRING'
                        }
                    },
                    saran: {
                        type: 'ARRAY',
                        items: {
                            type: 'STRING'
                        }
                    },
                    catatan: {
                        type: 'STRING'
                    }
                },
                required: [
                    'status',
                    'alasan',
                    'saran',
                    'catatan'
                ],
                propertyOrdering: [
                    'status',
                    'alasan',
                    'saran',
                    'catatan'
                ]
            }
        }
    })

    // Mengubah hasil JSON dari Gemini menjadi object JavaScript
    return JSON.parse(response.text)
}

module.exports = {
    analisisPesan
}
