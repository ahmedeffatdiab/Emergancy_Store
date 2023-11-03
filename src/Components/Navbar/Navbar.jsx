import React from 'react'
import newsletter from '../../assets/images/newsletter.png';
import jewellery_1 from '../../assets/images/products/jewellery-1.jpg'
import logo from '../../assets/images/logo/logo.svg'
import HeaderLinks from '../HeaderLinks/HeaderLinks';
import { useRef } from 'react';
export default function Navbar({changeMode}) {
    const modelRef=useRef();
    const notificationlRef=useRef();

    const hideModel=()=>{
        modelRef.current.classList.toggle('closed')
    }
    const hideNotification=()=>{
        notificationlRef.current.classList.toggle('closed')
        console.log(notificationlRef.current);
    }
    function test(){
        const Mode=document.getElementById('Mode');
        changeMode(Mode.value)
    }
    
  return (
    <div className='body'>
            <div class="overlay" data-overlay></div>
            <div class="modal" ref={modelRef} data-modal>

<div class="modal-close-overlay" data-modal-overlay></div>

<div class="modal-content">

  <button class="modal-close-btn" onClick={hideModel} data-modal-close>
  <i class="fa-solid fa-xmark"></i>
  </button>

  <div class="newsletter-img">
    <img src={newsletter} alt="subscribe newsletter" width="400" height="400"/>
  </div>

  <div class="newsletter">

    <form action="#">

      <div class="newsletter-header">

        <h3 class="newsletter-title">Subscribe Newsletter.</h3>

        <p class="newsletter-desc">
          Subscribe the <b>Anon</b> to get latest products and discount update.
        </p>

      </div>

      <input type="email" name="email" class="email-field" placeholder="Email Address" required/>

      <button type="submit" class="btn-newsletter">Subscribe</button>

    </form>

  </div>

</div>

            </div>

            <div class="notification-toast  "  ref={notificationlRef}  data-toest>
                <button class="toast-close-btn" onClick={hideNotification} data-toest-close>
                    <i class="fa-solid fa-xmark"></i>
                </button>
                <div class="toast-banner">
                    <img src={jewellery_1} alt="Rose Gold Earringd" width="80" height="70"/>
                </div>
                <div class="toast-details">
                    <p class="toast-message">Someone is now just bought</p>
                    <p class="toast-title">Rose Gold Earring</p>
                    <p class="toast-meta"><time datatime="PT2M">2 Minutes </time>age</p>
                </div>
            </div>
            <header>
           
                <div class="header-top">

    <div class="container">

    <ul class="header-social-container">

        <li>
        <a href="#" class="social-link">
            <i class="fa-brands fa-facebook"></i>
        </a>
        </li>

        <li>
        <a href="#" class="social-link">
        <i class="fa-brands fa-twitter"></i>
        </a>
        </li>

        <li>
        <a href="#" class="social-link">
        <i class="fa-brands fa-instagram"></i>
        </a>
        </li>

        <li>
        <a href="#" class="social-link">
        <i class="fa-brands fa-linkedin"></i>
        </a>
        </li>

    </ul>

    <div class="header-alert-news">
        <p>
        <b>Free Shipping</b>
        This Week Order Over - $55
        </p>
    </div>

    <div class="header-top-actions">

        <select name="currency">

        <option value="usd">USD &dollar;</option>
        <option value="eur">EUR &euro;</option>

        </select>

        <select name="language">

        <option value="en-US">English</option>
        <option value="es-ES">Espa&ntilde;ol</option>
        <option value="fr">Fran&ccedil;ais</option>

        </select>

    </div>

    </div>

                </div>
                <div class="header-main">
                    <div class="container">
                    <a href="#" class="header-logo">
                        <img src={logo} alt="Anon's logo" width="120" height="36"/>
                    </a>
                    <div class="header-search-container">

                        <input type="search" name="search" class="search-field" placeholder="Enter your product name..."/>

                        <button class="search-btn">
                        <i class="fa-solid fa-magnifying-glass"></i>
                        </button>

                    </div>

                    <div class="header-user-actions">

                        <button class="action-btn">
                            <i class="fa-solid fa-user"></i>
                        </button>

                        <button class="action-btn">
                        <i class="fa-solid fa-heart"></i>
                            <span class="count">0</span>
                        </button>

                        <button class="action-btn">
                        <i class="fa-solid fa-bag-shopping"></i>
                        <span class="count">0</span>
                        </button>

                    </div>

                    </div>
                </div>
                
            </header>
            
        </div>
  )
}
