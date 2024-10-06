// src/stores/chat.ts
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { Channel } from 'phoenix';
import { getSocket } from '@/services/socket';
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
        if (selectedUser.value) {
            const socket = getSocket();
            if (channel.value) {
                channel.value.leave();
            }
            channel.value = socket.channel(`chat:${selectedUser.value.id}`, {});

            channel.value.join()
                .receive('ok', async () => {
                    console.log('Joined chat channel successfully');
                    await fetchMessages();
                })
                .receive('error', (resp) => {
                    console.error('Unable to join chat channel', resp);
                });

            // Handle incoming messages
            channel.value.on('message:new', (payload: Message) => {
                messages.value.push(payload);
            });
        }
    }

    async function fetchMessages() {
        try {
            const response = await api.getMessages(selectedUser.value?.id || 0);
            messages.value = response.data.messages;
        } catch (error) {
            console.error('Failed to fetch messages:', error);
        }
    }

    function sendMessage(content: string) {
        if (channel.value) {
            channel.value.push('message:new', {
                content,
                receiver_id: selectedUser.value?.id,
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

    return {
        messages,
        onlineUsers,
        setOnlineUsers,
        selectedUser,
        setSelectedUser,
        sendMessage,
    };
});
