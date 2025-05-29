import { useState } from "react";
import styles from '@styles/chat.module.css';
import Chat from "@components/Chat/chat";

export default () => {
    const [sendedMessages, setMessages] = useState([{ name, messages: [] }]);
    const [selectedChat, setSelectedChat] = useState(null);

    return (
        <div className={styles.container}>
            <div className={styles.top}>
                <h2 className={styles.leftSide}>Мои чаты</h2>
            </div>
            <div className={styles.rightSide}>
                {<div><Chat name="Arkady" messages={[{ name: "Arkady", message: 'Привет', date: '10:24'}, { name: 'me', message: "привет", date:'20:00'}]} /></div>}
            </div>
            <div className={styles.input}>
                <form className={styles.inputContainer}>
                    <input
                        type="text"
                        placeholder="Введите сообщение..."
                        className={styles.input}
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
        </div>);
}