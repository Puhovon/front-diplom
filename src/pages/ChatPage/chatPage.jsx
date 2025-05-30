import { useEffect, useState } from "react";
import styles from '@styles/chat.module.css';
import Chat from "@components/Chat/chat";
import useAuth from '@hooks/useAuth';

export default () => {
    const [chats, setChats] = useState([]);
    const [selectedChatId, setSelectedChatId] = useState(null);
    const [selectedChatMessages, setSelectedChatMessages] = useState([]);
    const [isSending, setIsSending] = useState(false);
    const [error, setError] = useState(null);

    const { user, accessToken, fetchWithAuth } = useAuth();

    useEffect(() => {
        async function fetchChats() {
            try {
                const response = await fetchWithAuth('http://localhost:3000/api/v1/chats', {
                    method: 'GET',
                    headers: { 'Authorization': `Bearer ${accessToken}` },
                });

                const text = await response.text();
                const data = text ? JSON.parse(text) : [];

                const formattedChats = data.map(chat => {
                    const companion = chat.Users.find(u => u.id !== user?.id) || chat.Users[0];
                    const lastMessage = chat.Messages[0]?.message || null;

                    return {
                        id: chat.id,
                        chatId: chat.id,
                        userId: companion.id,
                        firstName: companion.firstName,
                        lastName: companion.lastName,
                        avatarPath: companion.avatarPath,
                        lastMessage: lastMessage,
                        createdAt: chat.createdAt,
                    };
                });
                setChats(formattedChats);
            } catch (error) {
                console.error('Error fetching chats:', error);
                setError('Ошибка загрузки чатов');
            }
        }

        if (accessToken) {
            fetchChats();
        }
    }, [accessToken, user?.id]);

    const onChatSelected = async (chatId) => {
        try {
            setSelectedChatId(chatId);
            const messages = await getMessages(chatId);
            setSelectedChatMessages(messages);
        } catch (error) {
            console.error('Error loading messages:', error);
            setError('Ошибка загрузки сообщений');
        }
    }

    const getMessages = async (chatId) => {
        const response = await fetchWithAuth(`http://localhost:3000/api/v1/chats/${chatId}/messages`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            },
        });

        const text = await response.text();
        return text ? JSON.parse(text) : [];
    }

    const onLastMessageChanged = async (chatId, message) => {
        try {
            setIsSending(true);
            setError(null);

            const selectedChat = chats.find(chat => chat.id === chatId);
            if (!selectedChat) return;

            // Отправка сообщения
            const response = await fetchWithAuth(`http://localhost:3000/api/v1/chats/${chatId}/messages`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    'text': message.message
                })
            });

            if (!response.ok) throw new Error('Ошибка при отправке сообщения');

            // Обновление локального состояния
            const newMessage = {
                id: Date.now(),
                message: message.message,
                senderId: user?.id,
                createdAt: new Date().toISOString(),
                isCurrentUser: true
            };

            setSelectedChatMessages(prev => [...prev, newMessage]);
            
            setChats(prevChats => prevChats.map(chat => 
                chat.id === chatId 
                    ? { ...chat, lastMessage: message.message } 
                    : chat
            ));
        } catch (error) {
            console.error('Error sending message:', error);
            setError('Не удалось отправить сообщение');
        } finally {
            setIsSending(false);
        }
    }

    const selectedChat = chats.find(chat => chat.id === selectedChatId);

    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <div className={styles.top}>
                    <h2 className={styles.title}>Мои чаты</h2>
                    {error && <div className={styles.error}>{error}</div>}
                </div>
                <div className={styles.mainContainer}>
                    <div className={styles.chatsList}>
                        {chats.map(chat => (
                            <div
                                key={chat.id}
                                className={`${styles.chatItem} ${selectedChatId === chat.id ? styles.active : ''}`}
                                onClick={() => onChatSelected(chat.id)}
                            >
                                <h3>{chat.firstName} {chat.lastName}</h3>
                                <p>{chat.lastMessage || 'Нет сообщений'}</p>
                            </div>
                        ))}
                    </div>
                    <div className={styles.chatArea}>
                        {!selectedChatId ? (
                            <div className={styles.noChat}>
                                <p>Выберите чат для начала общения</p>
                            </div>
                        ) : selectedChat && (
                            <Chat
                                id={selectedChat.id}
                                myId = {user.id}
                                name={`${selectedChat.firstName} ${selectedChat.lastName}`}
                                initialMessages={selectedChatMessages}
                                callBack={onLastMessageChanged}
                                isSending={isSending}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}