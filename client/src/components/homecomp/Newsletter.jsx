import React from 'react';

const Newsletter = () => {
  return (
    <section id="contact">
    <div className='w-full py-16 text-white px-4'>
      <div className='max-w-[1240px] mx-auto grid lg:grid-cols-3'>
        <div className='lg:col-span-2 my-4'>
          <h1 className='md:text-4xl sm:text-3xl text-2xl font-bold py-2'>
            Contact:
          </h1>
          
        </div>
        <div className='my-4'>
          <h2>
            <p>Email: Ekumpas@gmail.com</p>
            <p>facebook: fb.com/ekumpas</p>
          </h2>
        </div>
      </div>
    </div>
    </section>
  );
};

export default Newsletter;
