import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../context/userContext';
import Logo from '@/assets/logoname.svg'

const Navbar = () => {
  const { user, logout } = useContext(UserContext);

  return (
    <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <Link to="/login" className="select-none pointer-events-none">
        <img src={Logo} alt="Logo" className="w-auto h-10 select-none"/>
        </Link>
        {user ? (
          <>
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            
          </>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
