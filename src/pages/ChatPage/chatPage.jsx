import { useEffect, useState } from "react";
import styles from '@styles/chat.module.css';
import Chat from "@components/Chat/chat";

export default ({ initialChats }) => {
    const [chats, setChats] = useState(initialChats);
    const [selectedChat, setSelectedChat] = useState(null);

    useEffect(() => {
        console.log(chats);
    }, [])

    const onChatSelected = (id) => {
        setSelectedChat(id);
    }

    const onLastMessageChanged = (id, message) => {
        const newChats = chats.map(el => {
            if(el.id == id)
                el.lastMessage = message.message
            return el;
        });
        setChats(newChats)
        
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <div className={styles.top}>
                    <h2 className={styles.title}>Мои чаты</h2>
                </div>
                <div className={styles.mainContainer}>
                    <div className={styles.chatsList}>
                        {chats.map(el => (
                            <div 
                                key={el.id} 
                                className={`${styles.chatItem} ${selectedChat === el.id ? styles.active : ''}`}
                                onClick={() => onChatSelected(el.id)}
                            >
                                <h3>{el.name}</h3>
                                <p>{el.lastMessage}</p>
                            </div>
                        ))}
                    </div>
                    <div className={styles.chatArea}>
                        {selectedChat == null ? (
                            <div className={styles.noChat}>
                                <p>Выберите чат для начала общения</p>
                            </div>
                        ) : (
                            <Chat 
                                id={1}
                                name="Arkady"
                                initialMessages={[
                                    { name: "Владимир Баранов", message: 'Привет', date: '10:24' },
                                    { name: 'me', message: "привет", date: '20:00' }
                                ]} 
                                callBack ={onLastMessageChanged}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}