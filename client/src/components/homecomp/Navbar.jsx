import React, { useState } from 'react';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';

const Navbar = () => {
  const [nav, setNav] = useState(false);

  const handleNav = () => {
    setNav(!nav);
  };

  return (
    <div className='fixed top-0 left-0 w-full h-20 px-4 text-white bg-[#000300] z-10'>
      <div className='flex justify-between items-center h-20'>
        <div className='pl-8'>
          <h1 className='text-2xl font-bold text-[#00df9a]'>E-KUMPAS</h1>
        </div>
        <ul className='hidden md:flex'>
          <li className='p-4'>About</li>
          <li className='p-4'>Contact</li>
        </ul>
        <div onClick={handleNav} className='block md:hidden'>
            {nav? <AiOutlineClose size={20}/> : <AiOutlineMenu size={20} />}
        </div>
      </div>
      <ul className={nav? 'fixed left-0 top-0 w-[60%] h-full border-r border-r-gray-900 bg-[#000300] ease-in-out duration-500' : 'ease-in-out duration-500 fixed left-[-100%]'}>
        <h1 className='w-full text-2xl font-bold text-[#00df9a] m-4'>E-KUMPAS</h1>
          <li className='p-4 border-b border-gray-600'>About</li>
          <li className='p-4'>Contact</li>
      </ul>
    </div>
  );
};

export default Navbar;