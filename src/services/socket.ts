// src/services/socket.ts
import { Socket } from 'phoenix';
import { useUserStore } from '@/stores/user';

let socket: Socket | null = null;

export function getSocket(): Socket {
    if (!socket) {
        const userStore = useUserStore();
        const token = userStore.token;

        socket = new Socket('ws://localhost:4000/socket', {
            params: { token },
        });

        socket.connect();
    }

    return socket;
}
