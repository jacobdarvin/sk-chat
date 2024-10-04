// src/services/api.ts

const API_URL = 'http://localhost:4000/api'

function getToken(): string | null {
    return localStorage.getItem('token')
}

async function apiRequest(
    endpoint: string,
    method: string = 'GET',
    data?: any,
    requiresAuth: boolean = false
): Promise<any> {
    const headers: HeadersInit = {
        'Content-Type': 'application/json'
    }

    if (requiresAuth) {
        const token = getToken();
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        } else {
            throw new Error('Authentication required')
        }
    }

    const response = await fetch(`${API_URL}${endpoint}`, {
        method,
        headers,
        body: data ? JSON.stringify(data) : undefined
    })

    return response.json()
}

export default {
    register(userData: { username: string; email: string; password: string; }) {
        return apiRequest('/register', 'POST', { user: userData })
    },

    login(userData: { username: string; password: string; }) {
        return apiRequest('/login', 'POST', { user: userData })
    },

    getOnlineUsers() {
        return apiRequest('/users/online', 'GET', undefined, true)
    }
}