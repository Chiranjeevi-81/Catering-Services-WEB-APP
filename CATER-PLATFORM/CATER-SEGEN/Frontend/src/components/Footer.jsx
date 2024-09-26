import React from 'react'
import '../index.css';
export default function Footer() {
  return (
    <div>
      <div className="footer">
            <div className="container">
                <div className="row">
                    <div className="col-lg-7">
                        <div className="row">
                            <div className="col-md-6">
                                <div className="footer-contact">
                                    <h2 >Our Address</h2>
                                    <a href="https://maps.app.goo.gl/DMRDD4EKB5WMes63A"><p><i className="fa fa-map-marker "style= {{fontSize:'18px'}}></i>Plot No: 332, & 333,Hitech City</p></a>  
                                    <p><i className="fa fa-phone" style={{fontSize:'20px'}}></i>040-2222 8888 / 969779 8888</p>
                                    <p><i className="fa fa-envelope"></i>info@gsrhospitality.com</p>
                                    <div className="footer-social">
                                        <a href=""><i className="fab fa-twitter"></i></a>
                                        <a href="https://www.facebook.com/mahaspice.in"><i className="fab fa-facebook-f"></i></a>
                                        <a href="https://www.youtube.com/channel/UCRbz8_IMj5N2WH7CNLBrP7g"><i className="fab fa-youtube"></i></a>
                                        <a href="https://www.instagram.com/mahaspice.in/"><i className="fab fa-instagram"></i></a>
                                        
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="footer-link">
                                    <h2>Quick Links</h2>
                                    <a href="/">Home</a>
                                    <a href="/boxgenie">Box-Genie</a>
                                    <a href="/wedding-catering">Wedding-Catering</a>
                                    <a href="/event-catering">Event-Catering</a>
                                    <a href="/corporate-catering">Corporate-Catering</a>
                                    <a href="/contact">Contact</a>
                                   
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-5">
                        <div className="footer-newsletter">
                            <h2>Any Feedbacks? To Serve You Better</h2>
                            
                            <div className="form">
                            <p>  Please Feel Free To <a href="/contact"><button>Contact Us</button></a> </p>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="copyright">
                <div className="container">
                    <p>Copyright &copy; <a href="/">MAHA SPICES </a>, All Right Reserved.</p>
                    <p>Designed By PACT</p>
                </div>
            </div>
        </div>
    </div>
  )
}
