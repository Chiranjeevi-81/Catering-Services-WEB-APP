import React from 'react'
import SpecialDishes from './SpecialDishes'
// import Hero from '../../components/Hero/HeroContainer'
import Homebg from './Homebg'
import Aboutus from './Aboutus'
import Features from './Features'
const Home = () => {
  return (
    <div >
      <Homebg/>
       {/* <Hero/> */}
      {/* <SpecialDishes/> */}
      <Aboutus/>
      <Features/>
    </div>
  )
}

export default Home