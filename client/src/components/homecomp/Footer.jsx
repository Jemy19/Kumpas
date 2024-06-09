import React from 'react';

const Footer = () => {
  return (
    <div className='max-w-[1240px] mx-auto py-16 px-4 grid lg:grid-cols-3 gap-8 text-gray-300'>
      <div>
        <h1 className='w-full text-3xl font-bold text-[#00df9a]'>E-Kumpas</h1>
        <p className='py-4'>Providing innovative solutions for communication and accessibility.</p>
      </div>

      <div className='lg:col-span-2 flex justify-end mt-6'>
        <div className='mr-6'>
          <a href='#about'>
            <h6 className='font-medium text-gray-400'>About Us</h6>
          </a>
        </div>
        <div>
          <a href='#contact'>
            <h6 className='font-medium text-gray-400'>Contact</h6>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;