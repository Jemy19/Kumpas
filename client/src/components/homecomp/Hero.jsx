import React from 'react';

const Hero = () => {
  return (
    <div className='text-white' style={{ marginTop: '1rem' }}> {/* Add margin top here */}
      <div className='max-w-[800px] w-full h-screen mx-auto text-center flex flex-col justify-center'>
        <p className='text-[#00df9a] font-bold p-2'>
          Empowering the Hearing Community
        </p>
        <h1 className='md:text-7xl sm:text-6xl text-4xl font-bold md:py-6'>
          E-KUMPAS
        </h1>
        <div className='flex justify-center items-center'>
          <p className='md:text-5xl sm:text-4xl text-xl font-bold py-4'>
            Providing innovative solutions for communication and accessibility.
          </p>
        </div>
        <p className='md:text-2xl text-xl font-bold text-gray-500'>Join us in creating a more inclusive world for individuals with diverse hearing abilities.</p>
        <button className='bg-[#00df9a] w-[200px] rounded-md font-medium my-6 mx-auto py-3 text-black'>About Us</button>
      </div>
    </div>
  );
};

export default Hero;