// src/stores/chat.ts
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { Channel } from 'phoenix';
import { getSocket } from '@/services/socket';
import { useUserStore } from './user';
import api from '@/services/api';

interface User {
    id: number;
    username: string;
    email: string;
}

interface Message {
    sender_id: number;
    receiver_id: number;
    content: string;
    timestamp: string;
}

export const useChatStore = defineStore('chat', () => {
    const messages = ref<Message[]>([]);
    const onlineUsers = ref<User[]>([]);
    const selectedUser = ref<User | null>(null);
    const channel = ref<Channel | null>(null);

    // Function to initialize the chat channel
    function initChannel() {
        const userStore = useUserStore();
        const socket = getSocket();

        if (channel.value) {
            channel.value.leave();
        }

        channel.value = socket.channel(`chat:user:${userStore.user?.id}`, {});

        channel.value.join()
            .receive('ok', async () => {
                console.log('Joined personal chat channel successfully');
            })
            .receive('error', (resp) => {
                console.error('Unable to join personal chat channel', resp);
            });

        // Handle incoming messages
        channel.value.on('message:new', (payload: Message) => {
            // Check if the message is from or to the selected user
            if (
                payload.sender_id === selectedUser.value?.id ||
                payload.receiver_id === selectedUser.value?.id
            ) {
                messages.value.push(payload);
            }
        });
    }

    function sendMessage(content: string) {
        if (selectedUser.value && channel.value) {
            channel.value.push('message:new', {
                content,
                receiver_id: selectedUser.value.id.toString(),
            })
                .receive('ok', (resp) => {
                    console.log('Message sent', resp);
                })
                .receive('error', (resp) => {
                    console.error('Failed to send message', resp);
                });
        }
    }

    function setSelectedUser(user: User) {
        selectedUser.value = user;
        messages.value = [];
        initChannel();
    }

    function setOnlineUsers(users: User[]) {
        onlineUsers.value = users
    }

    async function fetchMessages(receiverId: number) {
        try {
            const response = await api.getMessages(receiverId);
            messages.value = response.data.messages;
        } catch (error) {
            console.error('Failed to fetch messages:', error);
        }
    }

    return {
        messages,
        onlineUsers,
        setOnlineUsers,
        selectedUser,
        setSelectedUser,
        sendMessage,
        fetchMessages
    };
});
