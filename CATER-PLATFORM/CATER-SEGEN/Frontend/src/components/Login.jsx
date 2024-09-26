import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();

  // Automatically navigate to home page after 2-3 seconds
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      navigate('/');
    }, 200);

    // Clean up the timeout on unmount or if the user interacts with the page
    return () => clearTimeout(timeoutId);
  }, [navigate]);

  // Alternatively, navigate to home page when any part of the page is clicked
  const handleClick = () => {
    navigate('/');
  };

  return (
    <div className='w-screen h-screen flex justify-center items-center text-center text-3xl'>
      <div onClick={handleClick} className='text-black text-7xl font-bold'>
        LOGIN IN HOME PAGE
      </div>
    </div>
  );
}
