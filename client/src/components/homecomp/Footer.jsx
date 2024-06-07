import React from 'react';
import {
  FaDribbbleSquare,
  FaFacebookSquare,
  FaGithubSquare,
  FaInstagram,
  FaTwitterSquare,
} from 'react-icons/fa';

const Footer = () => {
  return (
    <div className='max-w-[1240px] mx-auto py-16 px-4 grid lg:grid-cols-3 gap-8 text-gray-300'>
      <div>
        <h1 className='w-full text-3xl font-bold text-[#00df9a]'>E-Kumpas</h1>
        <p className='py-4'>Providing innovative solutions for communication and accessibility.</p>
      </div>

      <div className='lg:col-span-2 flex justify-end mt-6'>
        <div className='mr-6'>
          <h6 className='font-medium text-gray-400'>About Us</h6>
        </div>
        <div>
          <h6 className='font-medium text-gray-400'>Contact</h6>
        </div>
      </div>
    </div>
  );
};

export default Footer;
