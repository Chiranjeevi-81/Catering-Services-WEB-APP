import React, { useEffect, useRef } from 'react';
import homebg from './img/main course.jpeg';
import overlayImage from '../home/img/overlay2.png'; // path to your overlay PNG image';
import Typed from 'typed.js';

const Homebg = () => {
  const typedElementRef = useRef(null);

  useEffect(() => {
    const options = {
      strings: [
        ' Welcome to Our Catering website, where culinary excellence meets unforgettable experiences.',
        ' Quality is our top priority. We source only the finest ingredients to craft delicious meals that delight your taste buds.',
        'With our seamless ordering process and swift delivery network, we ensure your favorite dishes reach your doorstep in record time.'
      ],
      typeSpeed: 50,
      backSpeed: 20,
      startDelay: 2000, // 1 second delay before starting backspacing
      loop: true,
    };

    const typed = new Typed(typedElementRef.current, options);

    return () => {
      typed.destroy();
    };
  }, []);

  return (
    <div style={{ position: 'relative', width: '100%', height: '99.9vh' }}>
      <img src={homebg} alt="" className="w-full h-full object-cover" id='Homebg' />
      <img src={overlayImage} alt="" className="absolute top-0 left-0 w-full h-full object-cover" id='overlayimage'/>
      <div className="absolute top-1/3 left-1/2 transform -translate-x-1/5 -translate-y-1/5 text-black z-10" id='HomeHead'>
        <p className="text-lg md:text-xl">
          <span className='text-green font-bold text-8xl mb-4' id='Homeheader'>Maha Spice</span>  <br /> <br />
          <span ref={typedElementRef} className='text-2xl' id='Hometyper'></span>
        </p>
      </div>
    </div>
  );
};

export default Homebg;
