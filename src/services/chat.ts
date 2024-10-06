// src/services/chat.ts
import { Socket, Presence } from 'phoenix';
import { useUserStore } from '@/stores/user';
import { useChatStore } from '@/stores/chat';

export function initializeChatService() {
    const userStore = useUserStore();
    const chatStore = useChatStore();

    const socket = new Socket('ws://localhost:4000/socket', {
        params: { token: userStore.token },
    });

    socket.connect();

    // Join the lobby channel for presence tracking
    const lobbyChannel = socket.channel('chat:lobby', {});
    const presence = new Presence(lobbyChannel);

    lobbyChannel.join()
        .receive('ok', () => {
            console.log('Joined chat:lobby successfully');
        })
        .receive('error', (resp) => {
            console.error('Unable to join chat:lobby', resp);
        });

    // Synchronize presence data
    presence.onSync(() => {
        const onlineUsers = presence.list((id, { metas }) => {
            return {
                id: parseInt(id, 10),
                username: metas[0].username,
                email: metas[0].email, // Include email if available
            };
        });

        // Update the onlineUsers in the store
        chatStore.setOnlineUsers(onlineUsers);
    });

    // Export the socket and presence if needed elsewhere
    return { socket, presence };
}
