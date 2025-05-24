import { Link } from 'react-router-dom';
import styles from './style.module.css';

import { useEffect } from "react";
const LawyerCard = ({ name, specialization, city, photo }) => {

    return (
        <div className={styles.container}>
            <img className={styles.img} src={photo} alt="pohuy" />
            <div className={styles.rightWrapper}>
                <div className={styles.info}>
                    <h3 className={styles.name}>{name}</h3>
                    <p>Город: {city}</p>
                    <div>Специализации: <Link className={styles.specialization}>{specialization}</Link></div>
                </div>
                <div className={styles.cta}>
                    <div className={styles.price}>От 1000 за услугу</div>
                    <button className={styles.button} type="button">Узнать подробнее</button>
                </div>
            </div>
        </div>
    )
}

export default LawyerCard;