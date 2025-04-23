import RegistrationForm from "@components/forms/RegistrationForm";
import styles from '@styles/registrationPage.module.css'

const Registration = () => {
    return (<>
        <div >Registration</div>
        <div className={styles.container}>
            <div className={styles.left_side}></div>
            <RegistrationForm className={styles.right_side} />
        </div>
    </>)
};
export default Registration;

