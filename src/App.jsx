import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../src/store/index.js';

import Home from '@pages/HomePage/HomePage.jsx';
import Layout from '@components/Layout.jsx';
import Registration from '@pages/registrationPage.jsx';
import Profile from '@pages/ProfilePage/ProfilePage.jsx';
import Lawyers from '@pages/LawyerPage/lawyersPage.jsx';
import Login from '@pages/LoginPage/LoginPage.jsx';
import RefreshPassword from '@pages/RefreshPassword/RefreshPassword.jsx';
import ChatPage from '@pages/ChatPage/chatPage.jsx';
import EditProfile from './pages/ProfilePage/EditProfile.jsx';
import Team from './pages/TeamPage.jsx/TeamPage.jsx';

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
            <Route path="/profile/:userId" element={<Profile />} /> {/* Динамический маршрут для чужого профиля */}
            <Route path="/profile/edit" element={<EditProfile />} />
            <Route path="/lawyers" element={<Lawyers />} />
            <Route path="/team" element={<Team />} />
            <Route path="/passwordRefresh" element={<RefreshPassword />} />
            <Route path='/chat' element={<ChatPage/>} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;