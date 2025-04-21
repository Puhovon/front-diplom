import { Outlet } from 'react-router-dom';
import Header from '@components/Header';
import Footer from '@components/Footer';

function Layout() {
  return (
    <div className="layout">
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default Layout;