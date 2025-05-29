import styles from '@styles/chatComponent.module.css'

export default ({name, messages}) => {
    return(
        <div className={styles.container}>
            <div className={styles.top}>
                {name}
            </div>
            <div className={styles.chat}>
                {messages.map(el => {
                    return <div className={el.name == name ? styles.leftSide : styles.rightSide}>
                        <p>{el.message}</p>
                        <p>{el.date}</p>
                    </div>
                })}
            </div>
        </div>
    )
}