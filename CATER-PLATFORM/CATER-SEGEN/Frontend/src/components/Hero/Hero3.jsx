import React from 'react';
import bgImg from '../Hero/d-1.jpg';

const Hero3 = () => {
  return (
    <div className='min-h-screen relative overflow-hidden'>
      <div
        className='absolute inset-0 bg-cover bg-center'
        style={{
          backgroundImage: `url(${bgImg})`,
          filter: 'blur(8px) brightness(40%)',// Apply blur effect to the background image
        
        }}
      ></div>
      <div className='min-h-screen flex justify-center items-center text-white relative z-10'>
        <div>
          <div className='space-y-4 p-3'>
            {/* <p className='md:text-4xl text-2xl'>We Serve</p> */}
            <h1 className='md:text-7xl txt-4xl font-bold'>
             <span className='text-green'>Maha Spice</span> Caterers
            </h1>
            <p className='md:text-xl text-xl'>
              Quality is our top priority. We source only the finest ingredients to craft delicious meals that delight your taste buds.
            </p>
          </div>
          <div className='flex flex-wrap items-center gap-5'>
            <a href='/boxgenie'>
              <button className='px-7 py-3 rounded-lg bg-green font-bold uppercase'>Need a Box - Genie ?</button>
            </a>
            <a href='/wedding-catering'>
              <button className='px-7 py-3 rounded-lg border font-bold uppercase'>Any Wedding Catering ?</button>
            </a>
            <a href='/event-catering'>
              <button className='px-7 py-3 rounded-lg border font-bold uppercase'>Any Event ?</button>
            </a>
            <a href='/corporate-catering'>
              <button className='px-7 py-3 rounded-lg border font-bold uppercase'>Any corporate Catering ?</button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero3;