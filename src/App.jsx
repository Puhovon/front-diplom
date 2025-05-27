import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import Home from '@pages/HomePage/HomePage.jsx';
import Layout from '@components/Layout.jsx';
import Registration from '@pages/registrationPage.jsx';
import Profile from '@pages/UserProfilePage.jsx';
import About from '@pages/aboutPage.jsx';
import Contacts from '@pages/contactsPage.jsx';
import Lawyers from '@pages/lawyersPage.jsx';
import Login from '@pages/LoginPage/LoginPage.jsx';
// import PasswordChange from '@pages/PasswordChangePage.jsx';
import Services from '@pages/servicesPage.jsx';
import RefreshPassword from '@pages/RefreshPassword/RefreshPassword.jsx';
import { store } from '../src/store/store.js'; // Импорт store из настроенного файла

import '@styles/global.css';
import '@styles/variables.css';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/about" element={<About />} />
            <Route path="/contacts" element={<Contacts />} />
            <Route path="/lawyers" element={<Lawyers />} />
            {/* <Route path="/passwordChange" element={<PasswordChange />} /> */}
            <Route path="/services" element={<Services />} />
            <Route path="/passwordRefresh" element={<RefreshPassword />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;