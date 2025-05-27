import styles from './Modal.module.css';

const Modal = ({ isOpen, errors, onClose }) => {
    if (!isOpen) return null;
    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modal}>
                <h3>Ошибки валидации</h3>
                <ul>
                    {Object.values(errors).map((error, index) => (
                        <li key={index}>{error}</li>
                    ))}
                </ul>
                <button onClick={onClose} className={styles.modalCloseButton}>
                    ✕
                </button>
            </div>
        </div>
    );
};
export default Modal;