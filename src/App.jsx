// import RegistrationPage from '@pages/registrationPage.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '@pages/HomePage';
import Layout from '@components/Layout';
import Registration from '@pages/registrationPage';
import Profile from '@pages/UserProfilePage';
import About from '@pages/aboutPage';
import Contacts from '@pages/contactsPage';
import Lawyers from '@pages/lawyersPage';
import Login from '@pages/loginPage';
import PasswordChange from '@pages/registrationPage';
import Services from '@pages/servicesPage';



import '@styles/global.css'
import '@styles/variables.css'



function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/about" element={<About />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/lawyers" element={<Lawyers />} />
          <Route path="/login" element={<Login />} />
          <Route path="/passwordChange" element={<PasswordChange />} />
          <Route path="/services" element={<Services />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
