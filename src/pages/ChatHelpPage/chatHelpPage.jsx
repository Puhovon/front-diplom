import { useState, useRef, useEffect } from 'react';
import styles from '@styles/chatHelpPage.module.css';

const ChatPage = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: 'Здравствуйте! Чем могу помочь?', sender: 'other' },
  ]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
  }, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const message = {
      id: Date.now(),
      text: newMessage,
      sender: 'user'
    };

    setMessages(prev => [...prev, message]);
    setNewMessage('');

    setTimeout(() => {
      const botResponse = {
        id: Date.now() + 1,
        text: 'Мы ответим вам в ближайшее время на почту!',
        sender: 'other'
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h2>Чат с поддержкой</h2>
      </header>

      <div className={styles.messagesContainer}>
        {messages.map((message) => (
          <div
            key={message.id}
            className={`${styles.messageBubble} ${message.sender === 'user'
                ? styles.userBubble
                : styles.otherBubble
              }`}
          >
            {message.text}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSend} className={styles.inputContainer}>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Введите сообщение..."
          className={styles.input}
          autoFocus
        />
        <button
          type="submit"
          className={styles.sendButton}
          disabled={!newMessage.trim()}
        >
          Отправить
        </button>
      </form>
    </div>
  );
};

export default ChatPage;