// src/composables/useChat.ts
import { ref } from 'vue';
import { Channel } from 'phoenix';
import { getSocket } from '@/services/socket';
// import { useUserStore } from '@/stores/user';
import api from '@/services/api';

interface Message {
    sender_id: number;
    receiver_id: number;
    content: string;
    timestamp: string;
}

export function useChat(receiverId: number) {
    const messages = ref<Message[]>([]);
    // const userStore = useUserStore();
    const socket = getSocket();
    const channel: Channel = socket.channel(`chat:${receiverId}`, {});

    // Join the channel
    channel.join()
        .receive('ok', async (resp) => {
            console.log('Joined chat channel successfully', resp);
            // Fetch initial messages
            await fetchMessages();
        })
        .receive('error', (resp) => {
            console.error('Unable to join chat channel', resp);
        });

    // Handle incoming messages
    channel.on('message:new', (payload: Message) => {
        messages.value.push(payload);
    });

    // Function to send a message
    function sendMessage(content: string) {
        const message = {
            content,
            receiver_id: receiverId,
        };

        channel.push('message:new', message)
            .receive('ok', (resp) => {
                console.log('Message sent', resp);
            })
            .receive('error', (resp) => {
                console.error('Failed to send message', resp);
            });
    }

    // Fetch messages from the backend
    async function fetchMessages() {
        try {
            const response = await api.getMessages(receiverId);
            messages.value = response.data.data.messages;
        } catch (error) {
            console.error('Failed to fetch messages:', error);
        }
    }

    return {
        messages,
        sendMessage,
    };
}
