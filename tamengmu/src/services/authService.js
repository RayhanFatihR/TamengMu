
const API_URL = 'http://localhost:5000/api/auth'

// REGISTER
export async function registerUser(data) {
    const response = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })

    const hasil = await response.json()

    if (!response.ok) {
        throw new Error(hasil.message || 'Registrasi gagal.')
    }

    // Menyimpan token setelah registrasi berhasil
    sessionStorage.setItem('tamengku_token', hasil.token)

    // Menyimpan informasi pengguna
    sessionStorage.setItem(
        'tamengku_user',
        JSON.stringify(hasil.user)
    )

    return hasil
}

// LOGIN
export async function loginUser(data) {
    const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })

    const hasil = await response.json()

    if (!response.ok) {
        throw new Error(hasil.message || 'Login gagal.')
    }

    // Menyimpan token setelah login berhasil
    sessionStorage.setItem('tamengku_token', hasil.token)

    // Menyimpan informasi pengguna
    sessionStorage.setItem(
        'tamengku_user',
        JSON.stringify(hasil.user)
    )

    return hasil
}

// LOGOUT
export function logoutUser() {
    sessionStorage.removeItem('tamengku_token')
    sessionStorage.removeItem('tamengku_user')
}

// MENGAMBIL INFORMASI PENGGUNA
export function getCurrentUser() {
    const user = sessionStorage.getItem('tamengku_user')

    return user ? JSON.parse(user) : null
}

// MEMERIKSA STATUS LOGIN
export function isLoggedIn() {
    return !!sessionStorage.getItem('tamengku_token')
}
