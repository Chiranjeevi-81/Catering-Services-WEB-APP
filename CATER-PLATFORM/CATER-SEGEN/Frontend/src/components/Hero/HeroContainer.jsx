import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-creative'
import Hero from '../Hero/Hero';
import Hero2 from '../Hero/Hero2';
import Hero3 from '../Hero/Hero3';
// import { EffectCreative } from 'swiper'


const HeroContainer = () => {
  return (
    <section>
      <Swiper 
      modules={[Autoplay]}
      spaceBetween={30}
      slidesPerView={1}
      centeredSlides={true}
      grabCursor={false}
      effect={'creative'}
      creativeEffect={{
        prev: {
            shadow: true,
            translate:['-120%' , 0 , -500]
        },
        next: {
            shadow : true,
            translate: ['-120%' , 0 , -500]
        }
      }}
      // modules={[EffectCreative]}
      className='mySwiper'
      loop = {true}
      autoplay = {
        {
            delay: 3000,
            disableOnInteraction: false,

        }
      }
      >
        <swiper-wrapper>
        <SwiperSlide> <Hero/> </SwiperSlide>
        <SwiperSlide> <Hero2/> </SwiperSlide>
        <SwiperSlide> <Hero3/> </SwiperSlide>
        </swiper-wrapper>
      
      </Swiper>
    </section>
  )
}

export default HeroContainer