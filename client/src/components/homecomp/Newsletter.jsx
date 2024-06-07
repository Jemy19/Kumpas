import React from 'react';

const Newsletter = () => {
  return (
    <div className='w-full py-16 text-white px-4'>
      <div className='max-w-[1240px] mx-auto grid lg:grid-cols-3'>
        <div className='lg:col-span-2 my-4'>
          <h1 className='md:text-4xl sm:text-3xl text-2xl font-bold py-2'>
            Contact:
          </h1>
          <p>Email: Ekumpas@gmail.com</p>
          <p>facebook: fb.com/ekumpas</p>
        </div>
        <div className='my-4'>
          <h2 className='md:text-4xl sm:text-3xl text-2xl font-bold py-2'>
            Already Used The app?
          </h2>
          <p>Give us a feedback for us to keep improving the app</p>
          <div className='flex flex-col sm:flex-row items-center justify-between w-full'>
            <input
              className='p-3 flex w-full rounded-md text-black'
              type='email'
              placeholder='Enter feedback...'
            />
            <button className='bg-[#00df9a] text-black rounded-md font-medium w-[200px] ml-4 my-6 px-6 py-3'>
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
