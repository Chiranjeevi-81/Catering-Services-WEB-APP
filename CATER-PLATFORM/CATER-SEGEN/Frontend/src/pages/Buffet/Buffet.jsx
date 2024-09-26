import React, { useState, useEffect, useRef } from "react";
import emailjs from '@emailjs/browser'
import { useNavigate } from "react-router-dom";
import {useLocation} from 'react-router-dom';
import axios from "axios";
import Swal from "sweetalert2";
import engagementimg from '../home/img/engagement.jpg'
import bachelorspartyimg from '../home/img/bachelors party.jpg'
import bridegroomimg from '../home/img/bride-groom.jpg'
import haldyimg from '../home/img/haldi.jpg'
import receptionimg from '../home/img/reception.jpg'
import vratamimg from '../home/img/vratam.jpg'
import sangeetimg from '../home/img/sangeet.jpg'
import conferenceimg from '../home/img/conference.jpg'
import premiumguestsimg from '../home/img/premium-guests.jpg'
import officepartyimg from '../home/img/office-party.jpg'
import dailymealsimg from '../home/img/daily-meals.jpg'
import boxmealsimg from '../home/img/daily-meals.jpg'
import largeeventimg from '../home/img/large-event.jpg'
import seminareventimg from '../home/img/seminar-event.jpg'
import birthdayimg from '../home/img/Birthday.jpg'
import housepartyimg from'../home/img/house-party.jpg'
import poojahomeimg from'../home/img/pooja-home.jpg'
import housewarmingimg from'../home/img/house-warming.jpg'
import kittypartyimg from'../home/img/Kitty-party.jpg'
import anneversaryimg from'../home/img/anneversary.jpg'
import babyshowerimg from'../home/img/baby-shower.jpg'
import invitingguestsimg from'../home/img/inviting-guests.jpg'
import festivalsyimg from'../home/img/festivalsy.jpg'
import '../Buffet/Buffet.css'
// import img2 from '../home/img/undraw_chef_cu-0-r.svg'
const Buffet = ({catering}) => {
  debugger
  const location = useLocation();
  const [buffetData, setBuffetData] = useState([]);
  const form = useRef();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    eventType: "",
    numberOfGuests: "",
    date: "",
    time: "",
    packageName: "",
    specialRequests: "",
    isVeg: false,
    selected: []
  });
  
  const navigate = useNavigate(); 
  // Function to fetch buffet data
  const fetchBuffetData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/buffet");
      setBuffetData(response.data);
    } catch (error) {
      console.error("Error fetching buffet data:", error);
    }
  };

  useEffect(() => {
    // Fetch buffet data when component mounts
    const data = location.state && location.state.data
    if(data){
       setFormData(data)
    }
    fetchBuffetData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      eventType: e.target.value
    });
  };

  const handlePackageChange = (e) => {
    const packageValue = e.target.value
    setFormData({
      ...formData,
      packageName: packageValue
    });
    const externalPackage = packageValue == "Cocktail Package"? "Cocktail Diamond Exotic" : packageValue.substring(0, packageValue.indexOf(' '));
    navigate("/Packages", {state:{packageName: externalPackage, currentPackage: packageValue, externalformData: formData, cateringType: catering}})
  };

  const handleVegOptionChange = (e) => {
    const isVeg = e.target.checked;
    setFormData({
      ...formData,
      isVeg,
      packageName: "" // Reset package selection when vegetarian option changes
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/buffet", formData);
      if (response.status === 201) {
        // Reset form data after successful submission
        setFormData({
          name: "",
          email: "",
          phoneNumber: "",
          eventType: "",
          numberOfGuests: "",
          date: "",
          time: "",
          packageName: "",
          specialRequests: "",
          isVeg: false,
          selected: [] // Clear selected items after submission
        });
        // Show success message
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Thanks for contacting. We will reach you soon!",
          showConfirmButton: false,
          timer: 1500
        });
        navigate("/");
      }
    } catch (error) {
      console.error("Error submitting booking:", error);
      // Show error message
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong. Please try again later.",
        confirmButtonText: "OK"
      });
    }
  };
  

  // Determine which packages are active based on the number of guests
  const activePackages = () => {
    const { numberOfGuests } = formData;
    if (numberOfGuests < 500) {
      return [{ name: "Silver Package", minGuests: 0 }];
    } else if (numberOfGuests < 1000) {
      return [
        { name: "Silver Package", minGuests: 0 },
        { name: "Gold Package", minGuests: 500 }
      ];
    } else {
      return [
        { name: "Silver Package", minGuests: 0 },
        { name: "Gold Package", minGuests: 500 },
        { name: "Diamond Package", minGuests: 1000 },
        { name: "Cocktail Package", minGuests: 1000 }
      ];
    }
  };

  // Function to get the minimum number of guests required for each package
  const getMinimumGuestsMessage = (packageName) => {
    const packageInfo = activePackages().find((pack) => pack.name === packageName);
    if (packageInfo) {
      return `Minimum no. of pax - ${packageInfo.minGuests}`;
    }
    return "";
  };

 const getCurrentDate = () => {
    const today = new Date();
    today.setDate(today.getDate() + 1); // Add 1 day to get tomorrow's date
    const year = today.getFullYear();
    let month = today.getMonth() + 1;
    let day = today.getDate();
    if (month < 10) month = "0" + month;
    if (day < 10) day = "0" + day;
    return `${year}-${month}-${day}`;
};


  return (
    <div>
      <div className={catering === "Event Catering" ? "page-header-event-catering mb-0": (catering === "Corporate Catering" ? "page-header-corporate-catering mb-0": "page-header-wedding-catering mb-0")}>
        <div className="container">
          <div className="row mx-auto text-center justify-center">
            <div className="col-12">
              <h2 className="font-extrabold text-6xl text-green ">{catering}</h2>
            </div>
          </div>
        </div>
      </div>


      <div className="container mx-auto flex justify-center items-start py-8">
      <section className="w-1/2 mr-3  categories">
      <div className="categories-item-container">
      <div class="row">
      <div className="col categories-item">
      <img async="" src={catering=='Corporate Catering'? conferenceimg : catering === "Event Catering" ? birthdayimg :engagementimg} alt="" className="img-fluid" />
      <p>{catering=="Corporate Catering"?"Conference Caterers": catering === "Event Catering"? "Birthday":"Engagement"}</p>
      </div>
      <div class="col categories-item">
      <img async="" src={catering=='Corporate Catering'?premiumguestsimg: catering === "Event Catering" ? housepartyimg: bachelorspartyimg} alt="" className="img-fluid" />
      <p>{catering=="Corporate Catering"? "Premium Guests Catering": catering === "Event Catering"? "House Party" :"Bachelors party"}</p>
      </div>
      <div class="col categories-item">
      <img async="" src={ catering=='Corporate Catering'?officepartyimg: catering === "Event Catering" ? poojahomeimg: vratamimg} alt="" className="img-fluid" />
      <p>{catering=="Corporate Catering"? "office Catering" : catering === "Event Catering"? "Pooja@home" : "Vratam"}</p>
      </div>
      <div class="col categories-item">
      <img async="" src={catering=='Corporate Catering'?dailymealsimg : catering === "Event Catering" ? invitingguestsimg: sangeetimg} alt="" className="img-fluid" />
      <p> {catering=="Corporate Catering"? "Daily Meals Caterers" : catering === "Event Catering"? "Inviting Guests": "Sangeet"}</p>
      </div>
      {catering === "Event Catering" && <div class="col categories-item">
      <img async="" src={catering=='Corporate Catering'?dailymealsimg : catering === "Event Catering" ? festivalsyimg : sangeetimg} alt="" className="img-fluid" />
      <p> {catering=="Corporate Catering"? "Daily Meals Caterers" : catering === "Event Catering"? "Festivalsy": "Sangeet"}</p>
      </div>
      }
      </div>
      
      <div class="row">
      <div class="col categories-item">
      <img async="" src={catering=="Corporate Catering"? boxmealsimg : catering === "Event Catering" ? kittypartyimg: bridegroomimg} alt="" className="img-fluid" />
      <p>{catering=="Corporate Catering"? "Everyday Box Meals": catering === "Event Catering"? "Kitty Party": "Bride/Groom"}</p>
      </div>
      <div class="col categories-item">
      <img async="" src={ catering=="Corporate Catering"? largeeventimg : catering === "Event Catering" ? anneversaryimg: haldyimg} alt="" className="img-fluid" />
      <p>{catering=="Corporate Catering"? "Large Event Caterers": catering === "Event Catering"? "Annversery": "Haldi"}</p>
      </div>
      <div class="col categories-item">
      <img async="" src={catering=="Corporate Catering"?seminareventimg: catering === "Event Catering" ? babyshowerimg : receptionimg} alt="" className="img-fluid" />
      <p>{catering=="Corporate Catering"? "Seminar Catering": catering === "Event Catering"? "Baby Shower": "Reception"}</p>
      </div>
      {catering === "Event Catering" && <div class="col categories-item">
      <img async="" src={catering=='Corporate Catering'?dailymealsimg : catering === "Event Catering" ? housewarmingimg: sangeetimg} alt="" className="img-fluid" />
      <p> {catering=="Corporate Catering"? "Daily Meals Caterers" : catering === "Event Catering"? "House Warming": "Sangeet"}</p>
      </div>
      }
      {
        catering === "Event Catering"?
        <div class="col categories-item">
      <img async="" src={catering=="Corporate Catering"?seminareventimg: catering === "Event Catering" ? officepartyimg : receptionimg} alt="" className="img-fluid" />
      <p>{catering=="Corporate Catering"? "Seminar Catering": catering === "Event Catering"? "Office Party": "Reception"}</p>
      </div> 
      : 
      <div class="col categories-item">
      </div>
      }
      </div>
      </div>
      </section>

      
      <div className="w-full md:w-[870px] mx-auto px-4 flex justify-end items-center">
    
        <form ref={form} onSubmit={handleSubmit} className="space-y-4  w-full max-w-md p-7 rounded-lg bg-buffetBg" >
      
          <h2 className="text-2xl font-semibold my-4 text-black text-center">{catering}</h2>
          <div className="mb-4">
            <label htmlFor="name" className="block mb-1 text-black">Name</label>
            <input type="text" id="name" name="name" className="w-full px-4 py-2 border rounded-md bg-white" value={formData.name} onChange={handleInputChange} />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-1 text-black">Email</label>
            <input type="email" id="email" name="email" className="w-full px-4 py-2 border rounded-md bg-white" value={formData.email} onChange={handleInputChange} />
          </div>
          <div className="mb-4">
            <label htmlFor="phoneNumber" className="block mb-1 text-black">Phone Number</label>
            <input type="tel" id="phoneNumber" name="phoneNumber" className="w-full px-4 py-2 border rounded-md bg-white" value={formData.phoneNumber} onChange={handleInputChange} />
          </div>
          <div className="mb-4">
            <label htmlFor="eventType" className="block mb-1 text-black">Event Type</label>
            {catering === "Event Catering" ?
            <select 
              id="eventType" 
              name="eventType" 
              className="w-full px-4 py-2 border rounded-md bg-white" 
              value={formData.eventType} 
              onChange={handleChange} 
            >
              <option />
              <option value=" Birthday"> Birthday</option>
              <option value="House Party">House Party</option>
              <option value="Pooja@home">Pooja@home</option>
              <option value="Office Party">Office Party</option>
              <option value="House Warming">House Warming</option>
              <option value="Kitty Party">Kitty Party</option>
              <option value="Annversery">Annversery</option>
              <option value="Baby Shower">Baby Shower</option>
              <option value="Inviting Guests">Inviting Guests</option>
              <option value="Festivals">Festivalsy</option>
              <option value="Others">Others</option>
              </select> :
              (catering === "Corporate Catering" ?
              <select 
              id="eventType" 
              name="eventType" 
              className="w-full px-4 py-2 border rounded-md bg-white" 
              value={formData.eventType} 
              onChange={handleChange} 
            >
              <option />
              <option value="Office party Catering">Office party Catering</option>
              <option value="Large Event Caterers">Large Event Caterers</option>
              <option value="Everyday box meals">Everyday box meals</option>
              <option value="Premium Guests Catering">Premium Guests Catering</option>
              <option value="Seminar Caterings">Seminar Catering</option>
              <option value="Conference Caterers">Conference Caterers</option>
              <option value="Daily Meals Caterers">Daily Meals Caterers</option>
              </select>
              :
              <select 
              id="eventType" 
              name="eventType" 
              className="w-full px-4 py-2 border rounded-md bg-white" 
              value={formData.eventType} 
              onChange={handleChange} 
            >
              <option />
              <optgroup label="Pre Wedding">
              <option value="Engagement">Engagement</option>
              <option value="Bachelaors Party">Bachelaors Party</option>
              <option value="Bride/Groom">Bride/Groom</option>
              <option value="Haldi">Haldi</option>
              <option value="Sangeet">Sangeet</option>
              </optgroup>
              <optgroup label="Post Wedding">
              <option value="Receiption">Receiption</option>
              <option value="Vratam">Vratam</option>
              </optgroup>
              </select>)
            }
          </div>
          <div className="mb-4">
            <label htmlFor="numberOfGuests" className="block mb-1 text-black">Number of Guests</label>
            <input type="number" id="numberOfGuests" name="numberOfGuests" className="w-full px-4 py-2 border rounded-md bg-white" value={formData.numberOfGuests} onChange={handleInputChange} />
          </div>
          <div className="mb-4">
            <label htmlFor="date" className="block mb-1 text-black">Date</label>
            <input type="date" id="date" name="date" className="w-full px-4 py-2 border rounded-md bg-white" value={formData.date} onChange={handleInputChange} min={getCurrentDate()} />
          </div>
          <div className="mb-4">
            <label htmlFor="time" className="block mb-1 text-black">Time</label>
            <input type="time" id="time" name="time" className="w-full px-4 py-2 border rounded-md bg-white" value={formData.time} onChange={handleInputChange} />
          </div>
          <div className="mb-4">
            <label className="block mb-1 text-black">Packages</label>
            <div className="flex flex-col space-y-2">
              {['Silver Package', 'Gold Package', 'Diamond Package', 'Cocktail Package'].map((packageName) => {
                const isActive = activePackages().find(pack => pack.name === packageName);
                let message = '';
                if (isActive) {
                  message = getMinimumGuestsMessage(packageName);
                } else {
                  message = `Minimum ${packageName === 'Silver Package' ? '0' : packageName === 'Gold Package' ? '500' : '1000'} pax`;
                }
                return (
                  <label  htmlFor="packageName" key={packageName} className="flex items-center" title={message}>
                    <input 
                      type="radio" 
                      name="packageName" 
                      value={packageName} 
                      onChange={handlePackageChange} 
                      className="mr-2 form-radio"
                      checked={formData.packageName === packageName}
                    />
                    <span>{packageName}</span>
                    {!isActive && (
                      <span className="ml-2 text-red-500 text-sm">{getMinimumGuestsMessage(packageName)}</span>
                    )}
                  </label>
                );
              })}
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="specialRequests" className="block mb-1 text-black">Special Requests</label>
            <textarea id="specialRequests" name="specialRequests" rows="3" className="w-full px-4 py-2 border rounded-md bg-white" value={formData.specialRequests} onChange={handleInputChange}></textarea>
          </div>
          <button 
            type="submit" 
            className="w-full px-4 py-2 bg-green text-white rounded-md hover:bg-green-dark"
          >
            Submit
          </button>
        </form>
      </div>
      
      </div>
    </div>
  );
};

export default Buffet;
