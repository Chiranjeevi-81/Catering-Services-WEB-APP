import React from 'react'
import './aboutus.css'
// import 'bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';
import '../../components/Mq.css'
import img4 from './img/about2.jpg'
export default function Aboutus() {
    
  return (
    <div className='text-black text-justify '>
 <div className="about">
    <div class="container mx-auto">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-0 items-center">
            <div class="about-img">
                <img src={img4} alt="Image"/> 
                {/* <!-- <button type="button" class="btn-play" data-toggle="modal" data-src="https://www.youtube.com/embed/DWRcNpR6Kdc" data-target="#videoModal">
                    <span></span>
                </button> --> */}
            </div>
            <div class="about-content">
                <div class="section-header">
                    <p class="text-xl lg:text-2xl font-bold text-green">About Us</p>
                    <h2 class="text-3xl lg:text-4xl font-bold">Maha Spice Caterers</h2>
                </div>
                <div class="about-text text-sm">
                    <p class=" ">
                    Maha Spice Catering delivers culinary and hospitality excellence to thousands of events each year, and has been Telangana & Andhrapradesh’ trusted event catering partner for more than half a century. Maha Spice Catering brings a passion for creative cuisine and gracious catering service to any venue or destination setting, for every occasion and every taste, and has since the 2000’s. Maha Spice Catering has grown to serve thousands of special events annually by making each one truly extraordinary. Every gala, party, wedding, and catering event is as special to our team as it is to our clients. Today we cater to the special events and special needs of serving customized and delectable culinary creations and cocktails.
                    </p>
                    <br />
                   
                    {/* <a href="/boxgenie" className="btn custom-btn bg-green text-white outline-none border-none " id='abtbtn'>BOX - GINIE</a> */}
                </div>
            </div>
        </div>
    </div>
</div>

  
    </div>
  )
}
