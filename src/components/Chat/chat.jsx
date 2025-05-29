import styles from '@styles/chatComponent.module.css'
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
            date: new Date().toLocaleTimeString()
        };
        setInputValue("")
        setMessages([...messages, newMessage]);
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                {name}
            </div>
                <div className={styles.messagesContainer}>
                    {messages.map((el, id) => {
                        return <div key={id} className={`${styles.messageBubble} ${el.name === 'me'
                            ? styles.userBubble
                            : styles.otherBubble
                            }`}>
                            <p>{el.message}</p>
                            <p>{el.date}</p>
                        </div>
                    })}
                    
                </div>
                <form className={styles.inputContainer} onSubmit={(e) => onSubmit(e)}>
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
                        >
                            Отправить
                        </button>
                    </form>
        </div>
    )
}