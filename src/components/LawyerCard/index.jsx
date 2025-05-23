import styles from './style.module.css';

import { useEffect } from "react";

const LawyerCard = ({ name, specialization, city, photo }) => {

    return (
        <div className={styles.container}>
            <div className={styles.title}>
                <img className={styles.img} src={photo} alt="pohuy" />
                <h3>{name}</h3>
            </div>
            <div>
                <p>City: {city}</p>
                <p>specialization: {specialization}</p>
            </div>
        </div>
    )
}

export default LawyerCard;