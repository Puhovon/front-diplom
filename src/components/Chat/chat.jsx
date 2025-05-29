import styles from '@styles/chatComponent.module.css';
import { useState } from 'react';

export default ({ name, initialMessages }) => {
    const [messages, setMessages] = useState(initialMessages);
    const [inputValue, setInputValue] = useState('');

    const onSubmit = (e) => {
        e.preventDefault();
        if (!inputValue.trim()) return;
        const newMessage = {
            name: 'me',
            message: inputValue,
            date: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setInputValue("");
        setMessages([...messages, newMessage]);
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                {name}
                <div className={styles.statusIndicator}></div>
            </div>
            
            <div className={styles.messagesContainer}>
                {messages.map((el, id) => (
                    <div 
                        key={id} 
                        className={`${styles.messageBubble} ${
                            el.name === 'me' ? styles.userBubble : styles.otherBubble
                        }`}
                    >
                        <div className={styles.messageContent}>
                            <p className={styles.messageText}>{el.message}</p>
                            <p className={styles.messageTime}>{el.date}</p>
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
                />
                <button
                    type="submit"
                    className={styles.sendButton}
                    disabled={!inputValue.trim()}
                >
                    Отправить
                </button>
            </form>
        </div>
    )
}