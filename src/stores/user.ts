import { defineStore } from 'pinia'

interface User {
    name: string;
}

export const useUserStore = defineStore('user', {
    state: (): { user: User | null } => ({
        user: null,
    }),

    actions: {
        setUser(userData: User) {
            this.user = userData
        }
    }
})