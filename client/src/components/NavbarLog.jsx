import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../context/userContext';
import Logo from '@/assets/lOGOKUMPAS.svg'

const Navbar = () => {
  const { user, logout } = useContext(UserContext);

  return (
    <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <Link to="/login">
          <img src={Logo} alt="Logo" className="w-auto" style={{ height: '150px' }}/>
        </Link>
        {user ? (
          <>
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <h1 className="text-2xl font-bold">E-KUMPAS</h1>
          </>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
