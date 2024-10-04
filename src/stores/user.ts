import { defineStore } from 'pinia'

interface User {
    id: number;
    username: string;
    email: string;
}

interface UserState {
    user: User | null;
    token: string | null
}

export const useUserStore = defineStore('user', {
    state: (): UserState => ({
        user: null,
        token: null,
    }),

    actions: {
        setUser(userData: User, token: string) {
            this.user = userData
            this.token = token;
            localStorage.setItem('user', JSON.stringify(this.user));
            localStorage.setItem('token', token);
        },
        logout() {
            this.user = null
            this.token = null
            localStorage.removeItem('user');
            localStorage.removeItem('token');
        },
        loadUserFromStorage() {
            const user = localStorage.getItem('user');
            const token = localStorage.getItem('token');
            if (user && token) {
                this.user = JSON.parse(user);
                this.token = token
            }
        }
    }
})