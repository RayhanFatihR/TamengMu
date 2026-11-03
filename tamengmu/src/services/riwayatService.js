
const API_URL = 'http://localhost:5000/api/riwayat'

// Mengambil token login dari sessionStorage
function getToken() {
    return sessionStorage.getItem('tamengku_token')
}

// Membuat header untuk setiap permintaan API
function getHeaders() {
    const token = getToken()

    return {
        'Content-Type': 'application/json',
        ...(token && {
            Authorization: `Bearer ${token}`
        })
    }
}

// GET: Mengambil seluruh riwayat
export async function getRiwayat() {
    const response = await fetch(API_URL, {
        headers: getHeaders()
    })

    if (!response.ok) {
        throw new Error('Gagal mengambil riwayat.')
    }

    return await response.json()
}

// POST: Menyimpan riwayat baru
export async function simpanRiwayat(data) {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(data)
    })

    if (!response.ok) {
        throw new Error('Gagal menyimpan riwayat.')
    }

    return await response.json()
}

// DELETE: Menghapus satu riwayat
export async function hapusRiwayat(id) {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
        headers: getHeaders()
    })

    if (!response.ok) {
        throw new Error('Gagal menghapus riwayat.')
    }

    return await response.json()
}

// DELETE: Menghapus seluruh riwayat
export async function hapusSemuaRiwayat() {
    const response = await fetch(`${API_URL}/all`, {
        method: 'DELETE',
        headers: getHeaders()
    })

    if (!response.ok) {
        throw new Error('Gagal menghapus seluruh riwayat.')
    }

    return await response.json()
}
