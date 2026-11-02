const API_URL = 'http://localhost:5000/api/riwayat'

// Mengambil semua riwayat
export async function getRiwayat() {
    const response = await fetch(API_URL)

    if (!response.ok) {
        throw new Error('Gagal mengambil riwayat.')
    }

    return await response.json()
}

// Menyimpan riwayat
export async function simpanRiwayat(data) {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })

    if (!response.ok) {
        throw new Error('Gagal menyimpan riwayat.')
    }

    return await response.json()
}

// Menghapus riwayat
export async function hapusRiwayat(id) {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
    })

    if (!response.ok) {
        throw new Error('Gagal menghapus riwayat.')
    }

    return await response.json()
}
