// src/store/chat.ts
import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { useUserStore } from './user';

interface User {
    id: number;
    name: string;
}

interface Message {
    sender: string;
    receiver?: string;
    content: string;
    timestamp: string;
}

export const useChatStore = defineStore('chat', () => {
    const messages = ref<Message[]>([]);
    const onlineUsers = ref<User[]>([]);
    const selectedUser = ref<User | null>(null);

    const userStore = useUserStore();

    const fetchOnlineUsers = () => {
        // Replace with API call to fetch online users
        onlineUsers.value = [
            { id: 1, name: 'Alice' },
            { id: 2, name: 'Bob' },
            { id: 3, name: 'Charlie' },
            // Add more users as needed
        ];
    };

    const setSelectedUser = (user: User) => {
        selectedUser.value = user;
        // Optionally, fetch messages with the selected user
        fetchMessages(user.id);
    };

    const selectedUserId = computed(() => selectedUser.value?.id || null);

    const fetchMessages = (userId?: number) => {
        // Replace with API call to fetch messages
        // For demonstration, we filter messages between the current user and the selected user
        if (userId) {
            messages.value = [
                // Sample messages
                {
                    sender: userStore.user?.name || 'Me',
                    receiver: selectedUser.value?.name,
                    content: 'Hello!',
                    timestamp: new Date().toISOString(),
                },
                {
                    sender: selectedUser.value?.name || 'User',
                    receiver: userStore.user?.name || 'Me',
                    content: 'Hi there!',
                    timestamp: new Date().toISOString(),
                },
            ];
        } else {
            // Fetch group chat messages
        }
    };

    const sendMessage = (content: string) => {
        const message: Message = {
            sender: userStore.user?.name || 'Me',
            receiver: selectedUser.value?.name,
            content,
            timestamp: new Date().toISOString(),
        };
        messages.value.push(message);
        // Send the message to the backend via API or WebSocket
    };

    return {
        messages,
        onlineUsers,
        selectedUser,
        selectedUserId,
        fetchOnlineUsers,
        setSelectedUser,
        fetchMessages,
        sendMessage,
    };
});
