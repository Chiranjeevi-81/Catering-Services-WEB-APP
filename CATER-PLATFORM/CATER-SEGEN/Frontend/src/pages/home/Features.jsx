import React from 'react';
import './aboutus.css';

import img5 from './img/top-left.jpg';
import img2 from './img/vegees.jpg';
import img3 from './img/staff.jpg';
import img4 from './img/catering.jpg';

export default function Features() {
  return (
    <div>
      {/* First Features Component */}
      <div className="feature text-center my-8"> {/* Centered and decreased margin top and bottom */}
        <div className="container mx-auto">
          <div className=" lg:grid-cols-2 items-center">
            <div className="col-lg-5 mx-auto" id='left-features'>
              <div className="section-header">
                <p className="text-xl lg:text-2xl font-bold text-Green ">Why Choose Us</p>
                 <span id='clippath' >Our Key Features</span>
              </div>
              <div className="feature-text">
                <div className="feature-img">
                  <div className="grid grid-cols-2 gap-4 w-auto h-auto">
                    <div><img src={img5} alt="Image" /></div>
                    <div><img src={img2} alt="Image"/></div>
                    <div><img src={img3} alt="Image"/></div>
                    <div><img src={img4} alt="Image"/></div>
                  </div>
                </div>
                <p className="my-4">
                  We assure you that we will serve fresh and non-contaminated food items, and you will experience a friendly staff.
                </p>
                <a href="/boxgenie" className="btn custom-btn bg-green text-white border-none">BOX - GENIE</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Second Features Component */}
      <div class="feature my-4"> 
  <div class="container mx-auto">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div class="feature-item">
        <i class=""><span class="material-symbols-outlined ">diversity_4</span></i>
        <h3 class="font-bold">Best Staff</h3>
        <p>Our chef crafts culinary masterpieces, while our attentive event planners ensure every detail is perfect.</p>
      </div>
      <div class="feature-item">
        <i class="flaticon-vegetable"><span class="material-symbols-outlined">grocery</span></i>
        <h3 class="font-bold">Natural Ingredients</h3>
        <p>Our catering exclusively features dishes prepared with natural ingredients.</p>
      </div>
      <div class="feature-item">
        <i class=""><span class="material-symbols-outlined">editor_choice</span></i>
        <h3 class="font-bold">Best Quality Products</h3>
        <p> Our commitment to excellence ensures that every bite reflects our dedication to providing the best products for your event</p>
      </div>
      <div class="feature-item">
        <i class=""><span class="material-symbols-outlined">set_meal</span></i>
        <h3 class="font-bold">Fresh Vegetables & Meat</h3>
        <p>We pride ourselves on hand-selecting the freshest vegetables and finest cuts of meat, ensuring our dishes are bursting with flavor and quality ingredients</p>
      </div>
      <div class="feature-item">
        <i class=""><span class="material-symbols-outlined">room_service</span></i>
        <h3 class="font-bold">Fastest Door Delivery</h3>
        <p>We ensure swift Door delivery to enhance your catering experience.</p>
      </div>
      <div class="feature-item">
        <i class=""><span class="material-symbols-outlined">support_agent</span></i>
        <h3 class="font-bold">24/7 Customer Service</h3>
        <p>We guarantee round-the-clock customer support services.</p>
      </div>
    </div>
  </div>
</div>

    </div>
  );
}
