import React from 'react'
import '../../src/index.css'
import whatsapp from '../pages/home/img/whatsapp.png'
export default function WhatsApp() {
  return (
    <div>
       <div id="whatsapp-icon" class="bounce">
            <a href="https://wa.me/+919697798888" target="_blank" rel="noopener noreferrer">
              <img src={whatsapp} alt="WhatsApp" />
            </a>
        </div>
    </div>
  )
}
