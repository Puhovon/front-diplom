import bg from "../assets/registration.svg";
import RegistrationForm from "../components/forms/RegistrationForm";
import '../styles/registration.css'

export default () => {
    return (
        <>
            <img src={bg} />
            <RegistrationForm />
        </>)
}

