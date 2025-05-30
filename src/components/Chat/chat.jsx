import styles from '@styles/chatComponent.module.css';
import { useState, useEffect } from 'react';

export default ({ id, myId, name, callBack, initialMessages, isSending }) => {
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');

    // Обновляем сообщения при изменении initialMessages
    useEffect(() => {
        console.log(initialMessages)
        setMessages(initialMessages);
    }, [initialMessages]);

    const onSubmit = (e) => {
        e.preventDefault();
        if (!inputValue.trim() || isSending) return;

        const newMessage = {
            id: Date.now(),
            message: inputValue,
            senderId: 'me',
            createdAt: new Date().toISOString(),
            date: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        setInputValue("");
        setMessages(prev => [...prev, newMessage]);
        callBack(id, newMessage);
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                {name}
                <div className={styles.statusIndicator}></div>
            </div>

            <div className={styles.messagesContainer}>
                {messages.length === 0 ? (
                    <div className={styles.noMessages}>Сообщений пока нет</div>
                ) : messages.map((message) => (
                    <div
                        key={message.id}
                        className={`${styles.messageBubble} ${message.senderId === myId || message.isCurrentUser
                                ? styles.userBubble
                                : styles.otherBubble
                            }`}
                    >
                        <div className={styles.messageContent}>
                            <p className={styles.messageText}>{message.text || message.message}</p>
                            <p className={styles.messageTime}>
                                {message.date || new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            <form className={styles.inputContainer} onSubmit={onSubmit}>
                <input
                    type="text"
                    placeholder="Введите сообщение..."
                    className={styles.input}
                    onChange={(e) => setInputValue(e.target.value)}
                    value={inputValue}
                    autoFocus
                    disabled={isSending}
                />
                <button
                    type="submit"
                    className={styles.sendButton}
                    disabled={!inputValue.trim() || isSending}
                >
                    {isSending ? 'Отправка...' : 'Отправить'}
                </button>
            </form>
        </div>
    )
}   