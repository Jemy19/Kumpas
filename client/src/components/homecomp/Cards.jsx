import React from 'react';
import Single from '../../assets/single.png';
import Double from '../../assets/double.png';
import Triple from '../../assets/triple.png';

const Cards = () => {
  return (
    <div className='w-full py-[10rem] px-4 bg-white'>
      <div className='max-w-[1240px] mx-auto'>
        <h1 className='text-3xl font-bold text-center mb-12'>Phrases</h1>
        <div className='grid md:grid-cols-3 gap-8'>
          <div className='w-full shadow-xl flex flex-col p-4 rounded-lg hover:scale-105 duration-300'>
            <img className='w-20 mx-auto mt-[3rem] bg-white' src={Single} alt="/" />
            <h2 className='text-2xl font-bold text-center py-8'>Basic Greetings</h2>
            <div className='text-center font-medium'>
              <p className='py-2 border-b mx-8 mt-8'>Good morning</p>
              <p className='py-2 border-b mx-8'>Good afternoon</p>
              <p className='py-2 border-b mx-8'>Good evening</p>
            </div>
          </div>
          <div className='w-full shadow-xl bg-gray-100 flex flex-col p-4 rounded-lg hover:scale-105 duration-300'>
            <img className='w-20 mx-auto mt-[3rem] bg-transparent' src={Double} alt="/" />
            <h2 className='text-2xl font-bold text-center py-8'>Questions</h2>
            <div className='text-center font-medium'>
              <p className='py-2 border-b mx-8 mt-8'>How are you?</p>
              <p className='py-2 border-b mx-8'>What's your name?</p>
              <p className='py-2 border-b mx-8'>Where?</p>
            </div>
          </div>
          <div className='w-full shadow-xl flex flex-col p-4 rounded-lg hover:scale-105 duration-300'>
            <img className='w-20 mx-auto mt-[3rem] bg-white' src={Triple} alt="/" />
            <h2 className='text-2xl font-bold text-center py-8'>Common Words</h2>
            <div className='text-center font-medium'>
              <p className='py-2 border-b mx-8 mt-8'>Play</p>
              <p className='py-2 border-b mx-8'>Friend</p>
              <p className='py-2 border-b mx-8'>Food</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cards;
