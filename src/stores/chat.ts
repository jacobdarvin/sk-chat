// src/stores/chat.ts
import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { useUserStore } from './user';

interface User {
    id: number;
    username: string;
    email: string;
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
            { id: 1, username: 'Alice', email: 'alice@mail.com' },
            { id: 2, username: 'Bob', email: 'bob@mail.com' },
            { id: 3, username: 'Charlie', email: 'charlie@mail.com' },
            // Add more users as needed
        ];
    };

    const setSelectedUser = (user: User) => {
        selectedUser.value = user;
        // Fetch messages with the selected user
        fetchMessages(user.id);
    };

    const selectedUserId = computed(() => selectedUser.value?.id || null);

    const fetchMessages = (userId?: number) => {
        // Clear existing messages
        messages.value = [];

        // Replace with API call to fetch messages
        if (userId) {
            // Fetch messages with the selected user
            messages.value = [
                // Sample messages
                {
                    sender: selectedUser.value?.username || 'User',
                    receiver: userStore.user?.username || 'Me',
                    content: 'Hi there!',
                    timestamp: new Date().toISOString(),
                },
                {
                    sender: userStore.user?.username || 'Me',
                    receiver: selectedUser.value?.username,
                    content: 'Hello!',
                    timestamp: new Date().toISOString(),
                },
            ];
        } else {
            // Fetch group chat messages
            messages.value = [
                {
                    sender: 'System',
                    content: 'Welcome to the group chat!',
                    timestamp: new Date().toISOString(),
                },
            ];
        }
    };

    const sendMessage = (content: string) => {
        const message: Message = {
            sender: userStore.user?.username || 'Me',
            receiver: selectedUser.value?.username,
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
