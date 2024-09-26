import React from 'react'
import emailjs from '@emailjs/browser';
import  { useRef } from 'react';
import '../Contact/Contact.css'

export default function Contact() {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm('service_ws8vzj8', 
                'template_d22c3pf', 
                form.current, {
        publicKey: 'cjMjQfemmbdcPF5mY',
      })
      .then(
        () => {
            console.log('SUCCESS!');
            form.current.reset();
            alert('Message sent successfully!');
        },
        (error) => {
          console.log('FAILED...', error.text);
        },
      );
  };
  return (
   <div>

   
    <div className="page-header1 mb-0">
    <div className="container">
      <div className="row mx-auto text-center justify-center">
        <div className="col-12">
          {/* <h2 className="font-extrabold  text-6xl text-green  pt-10">Contact US</h2> */}
        </div>

        {/* <!-- <div className="col-12">
          <a href="">Home</a>
          <a href="">Menu</a>
        </div> --> */}
      </div>
    </div>
  </div>
 
<div className="contact  py-16">
  <div className="container">
    <div className="section-header text-center">
      {/* <p className='text-Green font-bold text-3xl'>Contact Us</p> */}
      <h2 className='text-black font-extrabold text-5xl my-4 '>Contact For Any Query</h2>
    </div>
    <div className="flex flex-wrap justify-around contact-information my-10">
      <div className="md:w-1/4">
        <div className="contact-info">
          <div className="contact-icon">
            <i className="fas fa-map-marker-alt"></i>
          </div>
          <div className="contact-text">
            <h3>Address</h3>
            <p>Plot No: 332, & 333, Diamond hills, OPP. Care Hospitals, Hitech City, Old Mumbai Highway, Hyderabad-500 032</p>
          </div>
        </div>
      </div>
      <div className="md:w-1/4">
        <div className="contact-info">
          <div className="contact-icon">
            <i className="fas fa-phone-alt"></i>
          </div>
          <div className="contact-text">
            <h3>Call Us</h3>
            <p>040-2222 8888 / 969779 8888</p>
          </div>
        </div>
      </div>
      <div className="md:w-1/4">
        <div className="contact-info">
          <div className="contact-icon">
            <i className="fas fa-envelope"></i>
          </div>
          <div className="contact-text">
            <h3>Email Us</h3>
            <p> info@gsrhospitality.com</p>
          </div>
        </div>
      </div>
    </div>
    <div className='mt-20 justify-center  mx-auto my-auto' id='FormMap'>
    <div className="flex flex-wrap mx-10  ">
      <div className="Map ">
        <iframe className='map1'
          title="My Google Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.526826213774!2d78.36938547375131!3d17.4344811014495!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb93ef09ed90b7%3A0x894bf16f752d763f!2sMaha%20Spice%20Caterers-best%20caterers%20in%20Hyderabad%2Cbest%20catering%20services%20in%20Hyderabad!5e0!3m2!1sen!2sin!4v1711966914709!5m2!1sen!2sin" 
          width="450"
          height="400"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
        
        ></iframe>
      </div>
      <div className="row contact-form  ">
      <form className="form1 text-black" ref={form} onSubmit={sendEmail}>
        <input type="text" name="user_name" placeholder='Name' className="mr-2 " />
        <input type="email" name="user_email" placeholder='Email' className="mr-2 -my-1 " />
        <textarea name="message" placeholder='Message' rows="7" cols="40" style={{ resize: 'none' }} className="mr-2 my-0"></textarea>
        <input type="submit" value="Send" className='btnform' />
      </form>
    </div>
    </div>
    </div>
   
  </div>
</div>
  </div>
  )
}
