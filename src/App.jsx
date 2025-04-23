// import RegistrationPage from '@pages/registrationPage.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '@pages/HomePage';
import Layout from '@components/Layout';


import '@styles/global.css'
import '@styles/variables.css'



function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
