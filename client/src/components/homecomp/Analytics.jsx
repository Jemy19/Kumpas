import React from 'react';
import Logo from '@/assets/LOGOKUMPAS.svg'

const Analytics = () => {
  return (
    <section id="about">
    <div className='w-full bg-white py-16 px-4'>
      <div className='max-w-[1240px] mx-auto grid md:grid-cols-2'>
        <img className='w-[500px] mx-auto my-4' src={Logo} alt='/' />
        <div className='flex flex-col justify-center'>
          <p className='text-[#00df9a] font-bold '>ABOUT US</p>
          <h1 className='md:text-4xl sm:text-3xl text-2xl font-bold py-2'>E-kumpas</h1>
          <p>
          Our About Us page aims to shed light on the diversity and challenges faced by individuals with hearing difficulties.
           While terms like "hard-of-hearing" and "deaf" are commonly known, they only scratch the surface. According to the WHO, 
           over 1.5 billion people globally live with some form of hearing loss. In the Philippines alone, there are an estimated 
           1,784,690 individuals with hearing difficulties.
          </p>
          <button className='bg-black text-[#00df9a] w-[200px] rounded-md font-medium my-6 mx-auto md:mx-0 py-3'>Get Started</button>
          <p>Download the App Now!</p>
        </div>
      </div>
    </div>
    </section>
  );
};

export default Analytics;
