import React, { useEffect } from 'react'
import dress from "../../assets/images/icons/dress.svg"
import shoes from "../../assets/images/icons/shoes.svg"
import jewelry from "../../assets/images/icons/jewelry.svg"
import perfume from "../../assets/images/icons/perfume.svg"
import cosmetics from "../../assets/images/icons/cosmetics.svg"
import glasses from "../../assets/images/icons/glasses.svg"
import bag from "../../assets/images/icons/bag.svg"
import productOne from "../../assets/images/products/1.jpg"
import productTwo from "../../assets/images/products/2.jpg"
import productThree from "../../assets/images/products/3.jpg";
import productFour from "../../assets/images/products/4.jpg";
import clothOne from "../../assets/images/products/clothes-1.jpg"
import clothTwo from "../../assets/images/products/clothes-2.jpg"
import clothThree from "../../assets/images/products/clothes-3.jpg"
import shirtOne from "../../assets/images/products/shirt-1.jpg"
import jacketOne from "../../assets/images/products/jacket-5.jpg"
import JacketTwo from "../../assets/images/products/jacket-1.jpg"
import jacketThree from "../../assets/images/products/jacket-3.jpg"
import shortsOne from "../../assets/images/products/shorts-1.jpg"
import sportsOne from "../../assets/images/products/sports-1.jpg"
import sportsTwo from "../../assets/images/products/sports-2.jpg"
import shoeTwo from "../../assets/images/products/shoe-2.jpg"
import watchThree from "../../assets/images/products/watch-3.jpg"
import partWearOne from "../../assets/images/products/party-wear-1.jpg";
import sportsThree from "../../assets/images/products/sports-3.jpg";
import sportsSix from "../../assets/images/products/sports-6.jpg";
import shoeOne from "../../assets/images/products/shoe-1.jpg";
import jewelleryThree from "../../assets/images/products/jewellery-3.jpg";
import belt from "../../assets/images/products/belt.jpg";
import jewelleryTwo from "../../assets/images/products/jewellery-2.jpg";
import watchOne from "../../assets/images/products/watch-1.jpg";
import shampoo from "../../assets/images/products/shampoo.jpg";
import jewelleryOne from "../../assets/images/products/jewellery-1.jpg";
import jacketFour from "../../assets/images/products/jacket-4.jpg";
import shirtTwo from "../../assets/images/products/shirt-2.jpg";
import jacketFIve from "../../assets/images/products/jacket-5.jpg";
import jacketSix from "../../assets/images/products/jacket-6.jpg";
import clothfour from "../../assets/images/products/clothes-4.jpg";
import shoeTwoOne from "../../assets/images/products/shoe-2_1.jpg";
import watchFour from "../../assets/images/products/watch-4.jpg";
import watchTwo from "../../assets/images/products/watch-2.jpg";
import partyWearTwo from "../../assets/images/products/party-wear-2.jpg";
import sportFour from "../../assets/images/products/sports-4.jpg";
import shoeOneOne from "../../assets/images/products/shoe-1_1.jpg";
import { useRef } from 'react'
import ProductBox from '../ProductBox/ProductBox'
export default function Productslider() {
    const slideBarRef=useRef();
    const XIconRef=useRef();
    const ShowSlideBar=()=>{
        slideBarRef.current.classList.add("active")
        XIconRef.current.classList.add("active")
        const accordionBtn=document.querySelectorAll('[data-accordion-btn]')
        const accordion=document.querySelectorAll('[data-accordion]');
        for (let i = 0; i < accordionBtn.length; i++) {
            accordionBtn[i].addEventListener('click',function(){
                const clickBtn=this.nextElementSibling.classList.contains('active');
                for (let i = 0; i < accordion.length; i++) {
                    if(clickBtn) break;
        
                    if(accordion[i].classList.contains('active')){
                        accordion[i].classList.remove('active')
                        accordionBtn[i].classList.remove('active')
                    }
                }
                this.nextElementSibling.classList.toggle('active');
                this.classList.toggle('active')
            })
            
        }
        
    }
    // useEffect(()=>{
    //     test()
    // },[])
    function test(){
        const accordionBtn=document.querySelectorAll('[data-accordion-btn]')
        const accordion=document.querySelectorAll('[data-accordion]');
        for (let i = 0; i < accordionBtn.length; i++) {
            accordionBtn[i].addEventListener('click',function(){
                const clickBtn=this.nextElementSibling.classList.contains('active');
                for (let i = 0; i < accordion.length; i++) {
                    if(clickBtn) break;
        
                    if(accordion[i].classList.contains('active')){
                        accordion[i].classList.remove('active')
                        accordionBtn[i].classList.remove('active')
                    }
                }
                this.nextElementSibling.classList.toggle('active');
                this.classList.toggle('active')
            })
            
        }
    }
    const hideSlideBar=()=>{
        slideBarRef.current.classList.remove("active")
        XIconRef.current.classList.remove("active")
    }
    
    
  return (
    <div>
        <div class="mobile-bottom-navigation">
                <button class="action-btn" data-mobile-menu-open-btn>
                <i class="fa-solid fa-bars"></i>
                </button>

                <button class="action-btn">
                <i class="fa-solid fa-bag-shopping"></i>
                <span class="count">0</span>
                </button>

                <button class="action-btn">
                <i class="fa-solid fa-house"></i>
                </button>

                <button class="action-btn">
                <i class="fa-solid fa-heart"></i>
                <span class="count">0</span>
                </button>

                <button class="action-btn" onClick={ShowSlideBar} data-mobile-menu-open-btn>
                <i class="fa-solid fa-border-all"></i>
                </button>

            </div>
        <div class="overlay"  ref={XIconRef}  data-overlay></div>
        <div className='product-container'>
        <div className="container">
                    <div class="sidebar  has-scrollbar" ref={slideBarRef} data-mobile-menu> 
                        <div class="sidebar-category">

                            <div class="sidebar-top">
                            <h2 class="sidebar-title">Category</h2>

                            <button onClick={hideSlideBar} class="sidebar-close-btn" data-mobile-menu-close-btn>
                            <i class="fa-solid fa-xmark"></i>
                            </button>
                            </div>

                            <ul class="sidebar-menu-category-list">

                            <li class="sidebar-menu-category">

                                <button class="sidebar-accordion-menu" data-accordion-btn>

                                <div class="menu-title-flex">
                                    <img src={dress} alt="clothes" width="20" height="20"
                                    class="menu-title-img"/>

                                    <p class="menu-title">Clothes</p>
                                </div>

                                <div>
                                    <i class="fa-solid fa-plus add-icon"></i>
                                <i class="fa-solid fa-minus remove-icon"></i>
                                </div>

                                </button>

                                <ul class="sidebar-submenu-category-list" data-accordion>

                                <li class="sidebar-submenu-category">
                                    <a href="#" class="sidebar-submenu-title">
                                    <p class="product-name">Shirt</p>
                                    <data value="300" class="stock" title="Available Stock">300</data>
                                    </a>
                                </li>

                                <li class="sidebar-submenu-category">
                                    <a href="#" class="sidebar-submenu-title">
                                    <p class="product-name">shorts & jeans</p>
                                    <data value="60" class="stock" title="Available Stock">60</data>
                                    </a>
                                </li>

                                <li class="sidebar-submenu-category">
                                    <a href="#" class="sidebar-submenu-title">
                                    <p class="product-name">jacket</p>
                                    <data value="50" class="stock" title="Available Stock">50</data>
                                    </a>
                                </li>

                                <li class="sidebar-submenu-category">
                                    <a href="#" class="sidebar-submenu-title">
                                    <p class="product-name">dress & frock</p>
                                    <data value="87" class="stock" title="Available Stock">87</data>
                                    </a>
                                </li>

                                </ul>

                            </li>

                            <li class="sidebar-menu-category">

                                <button class="sidebar-accordion-menu" data-accordion-btn>

                                <div class="menu-title-flex">
                                    <img src={shoes} alt="footwear" class="menu-title-img" width="20"
                                    height="20"/>

                                    <p class="menu-title">Footwear</p>
                                </div>

                                <div>
                                    <i class="fa-solid fa-plus add-icon"></i>
                                <i class="fa-solid fa-minus remove-icon"></i>
                                </div>

                                </button>

                                <ul class="sidebar-submenu-category-list" data-accordion>

                                <li class="sidebar-submenu-category">
                                    <a href="#" class="sidebar-submenu-title">
                                    <p class="product-name">Sports</p>
                                    <data value="45" class="stock" title="Available Stock">45</data>
                                    </a>
                                </li>

                                <li class="sidebar-submenu-category">
                                    <a href="#" class="sidebar-submenu-title">
                                    <p class="product-name">Formal</p>
                                    <data value="75" class="stock" title="Available Stock">75</data>
                                    </a>
                                </li>

                                <li class="sidebar-submenu-category">
                                    <a href="#" class="sidebar-submenu-title">
                                    <p class="product-name">Casual</p>
                                    <data value="35" class="stock" title="Available Stock">35</data>
                                    </a>
                                </li>

                                <li class="sidebar-submenu-category">
                                    <a href="#" class="sidebar-submenu-title">
                                    <p class="product-name">Safety Shoes</p>
                                    <data value="26" class="stock" title="Available Stock">26</data>
                                    </a>
                                </li>

                                </ul>

                            </li>

                            <li class="sidebar-menu-category">

                                <button class="sidebar-accordion-menu" data-accordion-btn>

                                <div class="menu-title-flex">
                                    <img src={jewelry} alt="clothes" class="menu-title-img" width="20"
                                    height="20"/>

                                    <p class="menu-title">Jewelry</p>
                                </div>

                                <div>
                                    <i class="fa-solid fa-plus add-icon"></i>
                                <i class="fa-solid fa-minus remove-icon"></i>
                                </div>

                                </button>

                                <ul class="sidebar-submenu-category-list" data-accordion>

                                <li class="sidebar-submenu-category">
                                    <a href="#" class="sidebar-submenu-title">
                                    <p class="product-name">Earrings</p>
                                    <data value="46" class="stock" title="Available Stock">46</data>
                                    </a>
                                </li>

                                <li class="sidebar-submenu-category">
                                    <a href="#" class="sidebar-submenu-title">
                                    <p class="product-name">Couple Rings</p>
                                    <data value="73" class="stock" title="Available Stock">73</data>
                                    </a>
                                </li>

                                <li class="sidebar-submenu-category">
                                    <a href="#" class="sidebar-submenu-title">
                                    <p class="product-name">Necklace</p>
                                    <data value="61" class="stock" title="Available Stock">61</data>
                                    </a>
                                </li>

                                </ul>

                            </li>

                            <li class="sidebar-menu-category">

                                <button class="sidebar-accordion-menu" data-accordion-btn>

                                <div class="menu-title-flex">
                                    <img src={perfume} alt="perfume" class="menu-title-img" width="20"
                                    height="20"/>

                                    <p class="menu-title">Perfume</p>
                                </div>

                                <div>
                                    <i class="fa-solid fa-plus add-icon"></i>
                                <i class="fa-solid fa-minus remove-icon"></i>
                                </div>

                                </button>

                                <ul class="sidebar-submenu-category-list" data-accordion>

                                <li class="sidebar-submenu-category">
                                    <a href="#" class="sidebar-submenu-title">
                                    <p class="product-name">Clothes Perfume</p>
                                    <data value="12" class="stock" title="Available Stock">12 pcs</data>
                                    </a>
                                </li>

                                <li class="sidebar-submenu-category">
                                    <a href="#" class="sidebar-submenu-title">
                                    <p class="product-name">Deodorant</p>
                                    <data value="60" class="stock" title="Available Stock">60 pcs</data>
                                    </a>
                                </li>

                                <li class="sidebar-submenu-category">
                                    <a href="#" class="sidebar-submenu-title">
                                    <p class="product-name">jacket</p>
                                    <data value="50" class="stock" title="Available Stock">50 pcs</data>
                                    </a>
                                </li>

                                <li class="sidebar-submenu-category">
                                    <a href="#" class="sidebar-submenu-title">
                                    <p class="product-name">dress & frock</p>
                                    <data value="87" class="stock" title="Available Stock">87 pcs</data>
                                    </a>
                                </li>

                                </ul>

                            </li>

                            <li class="sidebar-menu-category">

                                <button class="sidebar-accordion-menu" data-accordion-btn>

                                <div class="menu-title-flex">
                                    <img src={cosmetics} alt="cosmetics" class="menu-title-img" width="20"
                                    height="20"/>

                                    <p class="menu-title">Cosmetics</p>
                                </div>

                                <div>
                                    <i class="fa-solid fa-plus add-icon"></i>
                                <i class="fa-solid fa-minus remove-icon"></i>
                                </div>

                                </button>

                                <ul class="sidebar-submenu-category-list" data-accordion>

                                <li class="sidebar-submenu-category">
                                    <a href="#" class="sidebar-submenu-title">
                                    <p class="product-name">Shampoo</p>
                                    <data value="68" class="stock" title="Available Stock">68</data>
                                    </a>
                                </li>

                                <li class="sidebar-submenu-category">
                                    <a href="#" class="sidebar-submenu-title">
                                    <p class="product-name">Sunscreen</p>
                                    <data value="46" class="stock" title="Available Stock">46</data>
                                    </a>
                                </li>

                                <li class="sidebar-submenu-category">
                                    <a href="#" class="sidebar-submenu-title">
                                    <p class="product-name">Body Wash</p>
                                    <data value="79" class="stock" title="Available Stock">79</data>
                                    </a>
                                </li>

                                <li class="sidebar-submenu-category">
                                    <a href="#" class="sidebar-submenu-title">
                                    <p class="product-name">Makeup Kit</p>
                                    <data value="23" class="stock" title="Available Stock">23</data>
                                    </a>
                                </li>

                                </ul>

                            </li>

                            <li class="sidebar-menu-category">

                                <button class="sidebar-accordion-menu" data-accordion-btn>

                                <div class="menu-title-flex">
                                    <img src={glasses} alt="glasses" class="menu-title-img" width="20"
                                    height="20"/>

                                    <p class="menu-title">Glasses</p>
                                </div>

                                <div>
                                    <i class="fa-solid fa-plus add-icon"></i>
                                <i class="fa-solid fa-minus remove-icon"></i>
                                </div>

                                </button>

                                <ul class="sidebar-submenu-category-list" data-accordion>

                                <li class="sidebar-submenu-category">
                                    <a href="#" class="sidebar-submenu-title">
                                    <p class="product-name">Sunglasses</p>
                                    <data value="50" class="stock" title="Available Stock">50</data>
                                    </a>
                                </li>

                                <li class="sidebar-submenu-category">
                                    <a href="#" class="sidebar-submenu-title">
                                    <p class="product-name">Lenses</p>
                                    <data value="48" class="stock" title="Available Stock">48</data>
                                    </a>
                                </li>

                                </ul>

                            </li>

                            <li class="sidebar-menu-category">

                                <button class="sidebar-accordion-menu" data-accordion-btn>

                                <div class="menu-title-flex">
                                    <img src={bag} alt="bags" class="menu-title-img" width="20" height="20"/>

                                    <p class="menu-title">Bags</p>
                                </div>

                                <div>
                                    <i class="fa-solid fa-plus add-icon"></i>
                                <i class="fa-solid fa-minus remove-icon"></i>
                                </div>

                                </button>

                                <ul class="sidebar-submenu-category-list" data-accordion>

                                <li class="sidebar-submenu-category">
                                    <a href="#" class="sidebar-submenu-title">
                                    <p class="product-name">Shopping Bag</p>
                                    <data value="62" class="stock" title="Available Stock">62</data>
                                    </a>
                                </li>

                                <li class="sidebar-submenu-category">
                                    <a href="#" class="sidebar-submenu-title">
                                    <p class="product-name">Gym Backpack</p>
                                    <data value="35" class="stock" title="Available Stock">35</data>
                                    </a>
                                </li>

                                <li class="sidebar-submenu-category">
                                    <a href="#" class="sidebar-submenu-title">
                                    <p class="product-name">Purse</p>
                                    <data value="80" class="stock" title="Available Stock">80</data>
                                    </a>
                                </li>

                                <li class="sidebar-submenu-category">
                                    <a href="#" class="sidebar-submenu-title">
                                    <p class="product-name">Wallet</p>
                                    <data value="75" class="stock" title="Available Stock">75</data>
                                    </a>
                                </li>

                                </ul>

                            </li>

                            </ul>

                        </div>

                        <div class="product-showcase">

                            <h3 class="showcase-heading">best sellers</h3>

                            <div class="showcase-wrapper">

                            <div class="showcase-container">

                                <div class="showcase">

                                <a href="#" class="showcase-img-box">
                                    <img src={productOne} alt="baby fabric shoes" width="75" height="75"
                                    class="showcase-img"/>
                                </a>

                                <div class="showcase-content">

                                    <a href="#">
                                    <h4 class="showcase-title">baby fabric shoes</h4>
                                    </a>

                                    <div class="showcase-rating">
                                    <i name="star"></i>
                                    <i name="star"></i>
                                    <i name="star"></i>
                                    <i name="star"></i>
                                    <i name="star"></i>
                                    </div>

                                    <div class="price-box">
                                    <del>$5.00</del>
                                    <p class="price">$4.00</p>
                                    </div>

                                </div>

                                </div>

                                <div class="showcase">

                                <a href="#" class="showcase-img-box">
                                    <img src={productTwo} alt="men's hoodies t-shirt" class="showcase-img"
                                    width="75" height="75"/>
                                </a>

                                <div class="showcase-content">

                                    <a href="#">
                                    <h4 class="showcase-title">men's hoodies t-shirt</h4>
                                    </a>
                                    <div class="showcase-rating">
                                    <i name="star"></i>
                                    <i name="star"></i>
                                    <i name="star"></i>
                                    <i name="star"></i>
                                    <i name="star-half-outline"></i>
                                    </div>

                                    <div class="price-box">
                                    <del>$17.00</del>
                                    <p class="price">$7.00</p>
                                    </div>

                                </div>

                                </div>

                                <div class="showcase">

                                <a href="#" class="showcase-img-box">
                                    <img src={productThree} alt="girls t-shirt" class="showcase-img" width="75"
                                    height="75"/>
                                </a>

                                <div class="showcase-content">

                                    <a href="#">
                                    <h4 class="showcase-title">girls t-shirt</h4>
                                    </a>
                                    <div class="showcase-rating">
                                    <i name="star"></i>
                                    <i name="star"></i>
                                    <i name="star"></i>
                                    <i name="star"></i>
                                    <i name="star-half-outline"></i>
                                    </div>

                                    <div class="price-box">
                                    <del>$5.00</del>
                                    <p class="price">$3.00</p>
                                    </div>

                                </div>

                                </div>

                                <div class="showcase">

                                <a href="#" class="showcase-img-box">
                                    <img src={productFour} alt="woolen hat for men" class="showcase-img" width="75"
                                    height="75"/>
                                </a>

                                <div class="showcase-content">

                                    <a href="#">
                                    <h4 class="showcase-title">woolen hat for men</h4>
                                    </a>
                                    <div class="showcase-rating">
                                    <i name="star"></i>
                                    <i name="star"></i>
                                    <i name="star"></i>
                                    <i name="star"></i>
                                    <i name="star"></i>
                                    </div>

                                    <div class="price-box">
                                    <del>$15.00</del>
                                    <p class="price">$12.00</p>
                                    </div>

                                </div>

                                </div>

                            </div>

                            </div>

                        </div>

                    </div>
                    <div class="product-box">
                            <div class="product-minimal">
                
                            <div class="product-showcase">
                
                                <h2 class="title">New Arrivals</h2>
                
                                <div class="showcase-wrapper has-scrollbar">
                
                                    <div class="showcase-container">
                    
                                        <div class="showcase">
                    
                                        <a href="#" class="showcase-img-box">
                                            <img src={clothOne} alt="relaxed short full sleeve t-shirt" width="70" class="showcase-img"/>
                                        </a>
                    
                                        <div class="showcase-content">
                    
                                            <a href="#">
                                            <h4 class="showcase-title">Relaxed Short full Sleeve T-Shirt</h4>
                                            </a>
                    
                                            <a href="#" class="showcase-category">Clothes</a>
                    
                                            <div class="price-box">
                                            <p class="price">$45.00</p>
                                            <del>$12.00</del>
                                            </div>
                    
                                        </div>
                    
                                        </div>
                    
                                        <div class="showcase">
                                        
                                        <a href="#" class="showcase-img-box">
                                            <img src={clothTwo} alt="girls pink embro design top" class="showcase-img" width="70"/>
                                        </a>
                                        
                                        <div class="showcase-content">
                                        
                                            <a href="#">
                                            <h4 class="showcase-title">Girls pnk Embro design Top</h4>
                                            </a>
                                        
                                            <a href="#" class="showcase-category">Clothes</a>
                                        
                                            <div class="price-box">
                                            <p class="price">$61.00</p>
                                            <del>$9.00</del>
                                            </div>
                                        
                                        </div>
                                        
                                        </div>
                    
                                        <div class="showcase">
                                        
                                        <a href="#" class="showcase-img-box">
                                            <img src={clothThree} alt="black floral wrap midi skirt" class="showcase-img"
                                            width="70"/>
                                        </a>
                                        
                                        <div class="showcase-content">
                                        
                                            <a href="#">
                                            <h4 class="showcase-title">Black Floral Wrap Midi Skirt</h4>
                                            </a>
                                        
                                            <a href="#" class="showcase-category">Clothes</a>
                                        
                                            <div class="price-box">
                                            <p class="price">$76.00</p>
                                            <del>$25.00</del>
                                            </div>
                                        
                                        </div>
                                        
                                        </div>
                    
                                        <div class="showcase">
                                        
                                        <a href="#" class="showcase-img-box">
                                            <img src={shirtOne} alt="pure garment dyed cotton shirt" class="showcase-img"
                                            width="70"/>
                                        </a>
                                        
                                        <div class="showcase-content">
                                        
                                            <a href="#">
                                            <h4 class="showcase-title">Pure Garment Dyed Cotton Shirt</h4>
                                            </a>
                                        
                                            <a href="#" class="showcase-category">Mens Fashion</a>
                                        
                                            <div class="price-box">
                                            <p class="price">$68.00</p>
                                            <del>$31.00</del>
                                            </div>
                                        
                                        </div>
                                        
                                        </div>
                    
                                    </div>

                                    <div class="showcase-container">
                                    
                                        <div class="showcase">
                                    
                                        <a href="#" class="showcase-img-box">
                                            <img src={jacketOne} alt="men yarn fleece full-zip jacket" class="showcase-img"
                                            width="70"/>
                                        </a>
                                    
                                        <div class="showcase-content">
                                    
                                            <a href="#">
                                            <h4 class="showcase-title">MEN Yarn Fleece Full-Zip Jacket</h4>
                                            </a>
                                    
                                            <a href="#" class="showcase-category">Winter wear</a>
                                    
                                            <div class="price-box">
                                            <p class="price">$61.00</p>
                                            <del>$11.00</del>
                                            </div>
                                    
                                        </div>
                                    
                                        </div>
                                    
                                        <div class="showcase">
                                    
                                        <a href="#" class="showcase-img-box">
                                            <img src={JacketTwo} alt="mens winter leathers jackets" class="showcase-img"
                                            width="70"/>
                                        </a>
                                    
                                        <div class="showcase-content">
                                    
                                            <a href="#">
                                            <h4 class="showcase-title">Mens Winter Leathers Jackets</h4>
                                            </a>
                                    
                                            <a href="#" class="showcase-category">Winter wear</a>
                                    
                                            <div class="price-box">
                                            <p class="price">$32.00</p>
                                            <del>$20.00</del>
                                            </div>
                                    
                                        </div>
                                    
                                        </div>
                                    
                                        <div class="showcase">
                                    
                                        <a href="#" class="showcase-img-box">
                                            <img src={jacketThree} alt="mens winter leathers jackets" class="showcase-img"
                                            width="70"/>
                                        </a>
                                    
                                        <div class="showcase-content">
                                    
                                            <a href="#">
                                            <h4 class="showcase-title">Mens Winter Leathers Jackets</h4>
                                            </a>
                                    
                                            <a href="#" class="showcase-category">Jackets</a>
                                    
                                            <div class="price-box">
                                            <p class="price">$50.00</p>
                                            <del>$25.00</del>
                                            </div>
                                    
                                        </div>
                                    
                                        </div>
                                    
                                        <div class="showcase">
                                    
                                        <a href="#" class="showcase-img-box">
                                            <img src={shortsOne} alt="better basics french terry sweatshorts" class="showcase-img"
                                            width="70"/>
                                        </a>
                                    
                                        <div class="showcase-content">
                                    
                                            <a href="#">
                                            <h4 class="showcase-title">Better Basics French Terry Sweatshorts</h4>
                                            </a>
                                    
                                            <a href="#" class="showcase-category">Shorts</a>
                                    
                                            <div class="price-box">
                                            <p class="price">$20.00</p>
                                            <del>$10.00</del>
                                            </div>
                                    
                                        </div>
                                    
                                        </div>
                                    
                                    </div>
                
                                </div>
                
                            </div>
                
                            <div class="product-showcase">
                            
                                <h2 class="title">Trending</h2>
                            
                                <div class="showcase-wrapper  has-scrollbar">
                            
                                    <div class="showcase-container">
                            
                                    <div class="showcase">
                            
                                    <a href="#" class="showcase-img-box">
                                        <img src={sportsOne} alt="running & trekking shoes - white" class="showcase-img"
                                        width="70"/>
                                    </a>
                            
                                    <div class="showcase-content">
                            
                                        <a href="#">
                                        <h4 class="showcase-title">Running & Trekking Shoes - White</h4>
                                        </a>
                            
                                        <a href="#" class="showcase-category">Sports</a>
                            
                                        <div class="price-box">
                                        <p class="price">$49.00</p>
                                        <del>$15.00</del>
                                        </div>
                            
                                    </div>
                            
                                    </div>
                            
                                    <div class="showcase">
                            
                                    <a href="#" class="showcase-img-box">
                                        <img src={sportsTwo} alt="trekking & running shoes - black" class="showcase-img"
                                        width="70"/>
                                    </a>
                            
                                    <div class="showcase-content">
                            
                                        <a href="#">
                                        <h4 class="showcase-title">Trekking & Running Shoes - black</h4>
                                        </a>
                            
                                        <a href="#" class="showcase-category">Sports</a>
                            
                                        <div class="price-box">
                                        <p class="price">$78.00</p>
                                        <del>$36.00</del>
                                        </div>
                            
                                    </div>
                            
                                    </div>
                            
                                    <div class="showcase">
                            
                                    <a href="#" class="showcase-img-box">
                                        <img src={partWearOne} alt="womens party wear shoes" class="showcase-img"
                                        width="70"/>
                                    </a>
                            
                                    <div class="showcase-content">
                            
                                        <a href="#">
                                        <h4 class="showcase-title">Womens Party Wear Shoes</h4>
                                        </a>
                            
                                        <a href="#" class="showcase-category">Party wear</a>
                            
                                        <div class="price-box">
                                        <p class="price">$94.00</p>
                                        <del>$42.00</del>
                                        </div>
                            
                                    </div>
                            
                                    </div>
                            
                                    <div class="showcase">
                            
                                    <a href="#" class="showcase-img-box">
                                        <img src={sportsThree} alt="sports claw women's shoes" class="showcase-img"
                                        width="70"/>
                                    </a>
                            
                                    <div class="showcase-content">
                            
                                        <a href="#">
                                        <h4 class="showcase-title">Sports Claw Women's Shoes</h4>
                                        </a>
                            
                                        <a href="#" class="showcase-category">Sports</a>
                            
                                        <div class="price-box">
                                        <p class="price">$54.00</p>
                                        <del>$65.00</del>
                                        </div>
                            
                                    </div>
                            
                                    </div>
                            
                                </div>
                            
                                <div class="showcase-container">
                            
                                    <div class="showcase">
                            
                                    <a href="#" class="showcase-img-box">
                                        <img src={sportsSix} alt="air tekking shoes - white" class="showcase-img"
                                        width="70"/>
                                    </a>
                            
                                    <div class="showcase-content">
                            
                                        <a href="#">
                                        <h4 class="showcase-title">Air Trekking Shoes - white</h4>
                                        </a>
                            
                                        <a href="#" class="showcase-category">Sports</a>
                            
                                        <div class="price-box">
                                        <p class="price">$52.00</p>
                                        <del>$55.00</del>
                                        </div>
                            
                                    </div>
                            
                                    </div>
                            
                                    <div class="showcase">
                            
                                    <a href="#" class="showcase-img-box">
                                        <img src="./images/products/shoe-3.jpg" alt="Boot With Suede Detail" class="showcase-img" width="70"/>
                                    </a>
                            
                                    <div class="showcase-content">
                            
                                        <a href="#">
                                        <h4 class="showcase-title">Boot With Suede Detail</h4>
                                        </a>
                            
                                        <a href="#" class="showcase-category">boots</a>
                            
                                        <div class="price-box">
                                        <p class="price">$20.00</p>
                                        <del>$30.00</del>
                                        </div>
                            
                                    </div>
                            
                                    </div>
                            
                                    <div class="showcase">
                            
                                    <a href="#" class="showcase-img-box">
                                        <img src={shoeOne} alt="men's leather formal wear shoes" class="showcase-img"
                                        width="70"/>
                                    </a>
                            
                                    <div class="showcase-content">
                            
                                        <a href="#">
                                        <h4 class="showcase-title">Men's Leather Formal Wear shoes</h4>
                                        </a>
                            
                                        <a href="#" class="showcase-category">formal</a>
                            
                                        <div class="price-box">
                                        <p class="price">$56.00</p>
                                        <del>$78.00</del>
                                        </div>
                            
                                    </div>
                            
                                    </div>
                            
                                    <div class="showcase">
                            
                                    <a href="#" class="showcase-img-box">
                                        <img src={shoeTwo} alt="casual men's brown shoes" class="showcase-img" width="70"/>
                                    </a>
                            
                                    <div class="showcase-content">
                            
                                        <a href="#">
                                        <h4 class="showcase-title">Casual Men's Brown shoes</h4>
                                        </a>
                            
                                        <a href="#" class="showcase-category">Casual</a>
                            
                                        <div class="price-box">
                                        <p class="price">$50.00</p>
                                        <del>$55.00</del>
                                        </div>
                            
                                    </div>
                            
                                    </div>
                            
                                </div>
                            
                                </div>
                            
                            </div>
                
                            <div class="product-showcase">
                            
                                <h2 class="title">Top Rated</h2>
                            
                                <div class="showcase-wrapper  has-scrollbar">
                            
                                <div class="showcase-container">
                            
                                    <div class="showcase">
                            
                                    <a href="#" class="showcase-img-box">
                                        <img src={watchThree} alt="pocket watch leather pouch" class="showcase-img"
                                        width="70"/>
                                    </a>
                            
                                    <div class="showcase-content">
                            
                                        <a href="#">
                                        <h4 class="showcase-title">Pocket Watch Leather Pouch</h4>
                                        </a>
                            
                                        <a href="#" class="showcase-category">Watches</a>
                            
                                        <div class="price-box">
                                        <p class="price">$50.00</p>
                                        <del>$34.00</del>
                                        </div>
                            
                                    </div>
                            
                                    </div>
                            
                                    <div class="showcase">
                            
                                    <a href="#" class="showcase-img-box">
                                        <img src={jewelleryThree} alt="silver deer heart necklace" class="showcase-img"
                                        width="70"/>
                                    </a>
                            
                                    <div class="showcase-content">
                            
                                        <a href="#">
                                        <h4 class="showcase-title">Silver Deer Heart Necklace</h4>
                                        </a>
                            
                                        <a href="#" class="showcase-category">Jewellery</a>
                            
                                        <div class="price-box">
                                        <p class="price">$84.00</p>
                                        <del>$30.00</del>
                                        </div>
                            
                                    </div>
                            
                                    </div>
                            
                                    <div class="showcase">
                            
                                    <a href="#" class="showcase-img-box">
                                        <img src={perfume} alt="titan 100 ml womens perfume" class="showcase-img"
                                        width="70"/>
                                    </a>
                            
                                    <div class="showcase-content">
                            
                                        <a href="#">
                                        <h4 class="showcase-title">Titan 100 Ml Womens Perfume</h4>
                                        </a>
                            
                                        <a href="#" class="showcase-category">Perfume</a>
                            
                                        <div class="price-box">
                                        <p class="price">$42.00</p>
                                        <del>$10.00</del>
                                        </div>
                            
                                    </div>
                            
                                    </div>
                            
                                    <div class="showcase">
                            
                                    <a href="#" class="showcase-img-box">
                                        <img src={belt} alt="men's leather reversible belt" class="showcase-img"
                                        width="70"/>
                                    </a>
                            
                                    <div class="showcase-content">
                            
                                        <a href="#">
                                        <h4 class="showcase-title">Men's Leather Reversible Belt</h4>
                                        </a>
                            
                                        <a href="#" class="showcase-category">Belt</a>
                            
                                        <div class="price-box">
                                        <p class="price">$24.00</p>
                                        <del>$10.00</del>
                                        </div>
                            
                                    </div>
                            
                                    </div>
                            
                                </div>
                            
                                <div class="showcase-container">
                            
                                    <div class="showcase">
                            
                                    <a href="#" class="showcase-img-box">
                                        <img src={jewelleryTwo} alt="platinum zircon classic ring" class="showcase-img"
                                        width="70"/>
                                    </a>
                            
                                    <div class="showcase-content">
                            
                                        <a href="#">
                                        <h4 class="showcase-title">platinum Zircon Classic Ring</h4>
                                        </a>
                            
                                        <a href="#" class="showcase-category">jewellery</a>
                            
                                        <div class="price-box">
                                        <p class="price">$62.00</p>
                                        <del>$65.00</del>
                                        </div>
                            
                                    </div>
                            
                                    </div>
                            
                                    <div class="showcase">
                            
                                    <a href="#" class="showcase-img-box">
                                        <img src={watchOne} alt="smart watche vital plus" class="showcase-img" width="70"/>
                                    </a>
                            
                                    <div class="showcase-content">
                            
                                        <a href="#">
                                        <h4 class="showcase-title">Smart watche Vital Plus</h4>
                                        </a>
                            
                                        <a href="#" class="showcase-category">Watches</a>
                            
                                        <div class="price-box">
                                        <p class="price">$56.00</p>
                                        <del>$78.00</del>
                                        </div>
                            
                                    </div>
                            
                                    </div>
                            
                                    <div class="showcase">
                            
                                    <a href="#" class="showcase-img-box">
                                        <img src={shampoo} alt="shampoo conditioner packs" class="showcase-img"
                                        width="70"/>
                                    </a>
                            
                                    <div class="showcase-content">
                            
                                        <a href="#">
                                        <h4 class="showcase-title">shampoo conditioner packs</h4>
                                        </a>
                            
                                        <a href="#" class="showcase-category">cosmetics</a>
                            
                                        <div class="price-box">
                                        <p class="price">$20.00</p>
                                        <del>$30.00</del>
                                        </div>
                            
                                    </div>
                            
                                    </div>
                            
                                    <div class="showcase">
                            
                                    <a href="#" class="showcase-img-box">
                                        <img src={jewelleryOne} alt="rose gold peacock earrings" class="showcase-img"
                                        width="70"/>
                                    </a>
                            
                                    <div class="showcase-content">
                            
                                        <a href="#">
                                        <h4 class="showcase-title">Rose Gold Peacock Earrings</h4>
                                        </a>
                            
                                        <a href="#" class="showcase-category">jewellery</a>
                            
                                        <div class="price-box">
                                        <p class="price">$20.00</p>
                                        <del>$30.00</del>
                                        </div>
                            
                                    </div>
                            
                                    </div>
                            
                                </div>
                            
                                </div>
                            
                            </div>
                
                            </div>
                            <div class="product-featured">
                
                            <h2 class="title">Deal of the day</h2>
                
                            <div class="showcase-wrapper has-scrollbar">
                
                                <div class="showcase-container">
                
                                <div class="showcase">
                                    
                                    <div class="showcase-banner">
                                    <img src={shampoo} alt="shampoo, conditioner & facewash packs" class="showcase-img"/>
                                    </div>
                
                                    <div class="showcase-content">
                                    
                                    <div class="showcase-rating">
                                        <i name="star"></i>
                                        <i name="star"></i>
                                        <i name="star"></i>
                                        <i name="star-outline"></i>
                                        <i name="star-outline"></i>
                                    </div>
                
                                    <a href="#">
                                        <h3 class="showcase-title">shampoo, conditioner & facewash packs</h3>
                                    </a>
                
                                    <p class="showcase-desc">
                                        Lorem ipsum dolor sit amet consectetur Lorem ipsum
                                        dolor dolor sit amet consectetur Lorem ipsum dolor
                                    </p>
                
                                    <div class="price-box">
                                        <p class="price">$150.00</p>
                
                                        <del>$200.00</del>
                                    </div>
                
                                    <button class="add-cart-btn">add to cart</button>
                
                                    <div class="showcase-status">
                                        <div class="wrapper">
                                        <p>
                                            already sold: <b>20</b>
                                        </p>
                
                                        <p>
                                            available: <b>40</b>
                                        </p>
                                        </div>
                
                                        <div class="showcase-status-bar"></div>
                                    </div>
                
                                    <div class="countdown-box">
                
                                        <p class="countdown-desc">
                                        Hurry Up! Offer ends in:
                                        </p>
                
                                        <div class="countdown">
                
                                        <div class="countdown-content">
                
                                            <p class="display-number">360</p>
                
                                            <p class="display-text">Days</p>
                
                                        </div>
                
                                        <div class="countdown-content">
                                            <p class="display-number">24</p>
                                            <p class="display-text">Hours</p>
                                        </div>
                
                                        <div class="countdown-content">
                                            <p class="display-number">59</p>
                                            <p class="display-text">Min</p>
                                        </div>
                
                                        <div class="countdown-content">
                                            <p class="display-number">00</p>
                                            <p class="display-text">Sec</p>
                                        </div>
                
                                        </div>
                
                                    </div>
                
                                    </div>
                
                                </div>
                
                                </div>
                
                                <div class="showcase-container">
                                
                                <div class="showcase">
                                
                                    <div class="showcase-banner">
                                    <img src={jacketOne} alt="Rose Gold diamonds Earring" class="showcase-img"/>
                                    </div>
                                
                                    <div class="showcase-content">
                                
                                    <div class="showcase-rating">
                                        <i name="star"></i>
                                        <i name="star"></i>
                                        <i name="star"></i>
                                        <i name="star-outline"></i>
                                        <i name="star-outline"></i>
                                    </div>
                                
                                    <h3 class="showcase-title">
                                        <a href="#" class="showcase-title">Rose Gold diamonds Earring</a>
                                    </h3>
                                
                                    <p class="showcase-desc">
                                        Lorem ipsum dolor sit amet consectetur Lorem ipsum
                                        dolor dolor sit amet consectetur Lorem ipsum dolor
                                    </p>
                                
                                    <div class="price-box">
                                        <p class="price">$1990.00</p>
                                        <del>$2000.00</del>
                                    </div>
                                
                                    <button class="add-cart-btn">add to cart</button>
                                
                                    <div class="showcase-status">
                                        <div class="wrapper">
                                        <p> already sold: <b>15</b> </p>
                                
                                        <p> available: <b>40</b> </p>
                                        </div>
                                
                                        <div class="showcase-status-bar"></div>
                                    </div>
                                
                                    <div class="countdown-box">
                                
                                        <p class="countdown-desc">Hurry Up! Offer ends in:</p>
                                
                                        <div class="countdown">
                                        <div class="countdown-content">
                                            <p class="display-number">360</p>
                                            <p class="display-text">Days</p>
                                        </div>
                                
                                        <div class="countdown-content">
                                            <p class="display-number">24</p>
                                            <p class="display-text">Hours</p>
                                        </div>
                                
                                        <div class="countdown-content">
                                            <p class="display-number">59</p>
                                            <p class="display-text">Min</p>
                                        </div>
                                
                                        <div class="countdown-content">
                                            <p class="display-number">00</p>
                                            <p class="display-text">Sec</p>
                                        </div>
                                        </div>
                                
                                    </div>
                                
                                    </div>
                                
                                </div>
                                
                                </div>
                
                            </div>
                
                            </div>
                            <div class="product-main">

                            <h2 class="title">New Products</h2>
                
                            <div class="product-grid">
                
                                <div class="showcase">
                
                                <div class="showcase-banner">
                
                                    <img src={jacketThree} alt="Mens Winter Leathers Jackets" width="300" class="product-img default"/>
                                    <img src={jacketFour} alt="Mens Winter Leathers Jackets" width="300" class="product-img hover"/>
                    
                                    <p class="showcase-badge">15%</p>
                
                                    <div class="showcase-actions">
                
                                    <button class="btn-action">
                                        <i class="fa-regular fa-heart"></i>
                                    </button>
                
                                    <button class="btn-action">
                                        <i class="fa-regular fa-eye"></i>
                                    </button>
                
                                    <button class="btn-action">
                                        <i class="fa-solid fa-repeat"></i>
                                    </button>
                
                                    <button class="btn-action">
                                        <i class="fa-solid fa-bag-shopping"></i>
                                    </button>
                
                                    </div>
                
                                </div>
                
                                <div class="showcase-content">
                
                                    <a href="#" class="showcase-category">jacket</a>
                
                                    <a href="#">
                                    <h3 class="showcase-title">Mens Winter Leathers Jackets</h3>
                                    </a>
                
                                    <div class="showcase-rating">
                                    <i class="fa-solid fa-star"></i>
                                    <i class="fa-solid fa-star"></i>
                                    <i class="fa-solid fa-star"></i>
                                    <i class="fa-regular fa-star"></i>
                                    <i class="fa-regular fa-star"></i>
                                    </div>
                
                                    <div class="price-box">
                                    <p class="price">$48.00</p>
                                    <del>$75.00</del>
                                    </div>
                
                                </div>
                
                                </div>
                
                                <div class="showcase">
                                
                                <div class="showcase-banner">
                                    <img src={shirtOne} alt="Pure Garment Dyed Cotton Shirt" class="product-img default"
                                    width="300"/>
                                    <img src={shirtTwo} alt="Pure Garment Dyed Cotton Shirt" class="product-img hover"
                                    width="300"/>
                                
                                    <p class="showcase-badge angle black">sale</p>
                                
                                    <div class="showcase-actions">
                                    <button class="btn-action">
                                        <i class="fa-regular fa-heart"></i>
                                    </button>
                                
                                    <button class="btn-action">
                                        <i class="fa-regular fa-eye"></i>
                                    </button>
                                
                                    <button class="btn-action">
                                        <i class="fa-solid fa-repeat"></i>
                                    </button>
                                
                                    <button class="btn-action">
                                        <i class="fa-solid fa-bag-shopping"></i>
                                    </button>
                                    </div>
                                </div>
                                
                                <div class="showcase-content">
                                    <a href="#" class="showcase-category">shirt</a>
                                
                                    <h3>
                                    <a href="#" class="showcase-title">Pure Garment Dyed Cotton Shirt</a>
                                    </h3>
                                
                                    <div class="showcase-rating">
                                    <i class="fa-solid fa-star"></i>
                                    <i class="fa-solid fa-star"></i>
                                    <i class="fa-solid fa-star"></i>
                                    <i class="fa-regular fa-star"></i>
                                    <i class="fa-regular fa-star"></i>
                                    </div>
                                
                                    <div class="price-box">
                                    <p class="price">$45.00</p>
                                    <del>$56.00</del>
                                    </div>
                                
                                </div>
                                
                                </div>
                
                                <div class="showcase">
                                
                                <div class="showcase-banner">
                                    <img src={jacketFIve} alt="MEN Yarn Fleece Full-Zip Jacket" class="product-img default"
                                    width="300"/>
                                    <img src={jacketSix} alt="MEN Yarn Fleece Full-Zip Jacket" class="product-img hover"
                                    width="300"/>
                                
                                    <div class="showcase-actions">
                                    <button class="btn-action">
                                        <i class="fa-regular fa-heart"></i>
                                    </button>
                                
                                    <button class="btn-action">
                                        <i class="fa-regular fa-eye"></i>
                                    </button>
                                
                                    <button class="btn-action">
                                        <i class="fa-solid fa-repeat"></i>
                                    </button>
                                
                                    <button class="btn-action">
                                        <i class="fa-solid fa-bag-shopping"></i>
                                    </button>
                                    </div>
                                </div>
                                
                                <div class="showcase-content">
                                    <a href="#" class="showcase-category">Jacket</a>
                                
                                    <h3>
                                    <a href="#" class="showcase-title">MEN Yarn Fleece Full-Zip Jacket</a>
                                    </h3>
                                
                                    <div class="showcase-rating">
                                    <i class="fa-solid fa-star"></i>
                                    <i class="fa-solid fa-star"></i>
                                    <i class="fa-solid fa-star"></i>
                                    <i class="fa-regular fa-star"></i>
                                    <i class="fa-regular fa-star"></i>
                                    </div>
                                
                                    <div class="price-box">
                                    <p class="price">$58.00</p>
                                    <del>$65.00</del>
                                    </div>
                                
                                </div>
                                
                                </div>
                
                                <div class="showcase">
                                
                                <div class="showcase-banner">
                                    <img src={clothThree} alt="Black Floral Wrap Midi Skirt" class="product-img default"
                                    width="300"/>
                                    <img src={clothfour} alt="Black Floral Wrap Midi Skirt" class="product-img hover"
                                    width="300"/>
                                
                                    <p class="showcase-badge angle pink">new</p>
                                
                                    <div class="showcase-actions">
                                    <button class="btn-action">
                                        <i class="fa-regular fa-heart"></i>
                                    </button>
                                
                                    <button class="btn-action">
                                        <i class="fa-regular fa-eye"></i>
                                    </button>
                                
                                    <button class="btn-action">
                                        <i class="fa-solid fa-repeat"></i>
                                    </button>
                                
                                    <button class="btn-action">
                                        <i class="fa-solid fa-bag-shopping"></i>
                                    </button>
                                    </div>
                                </div>
                                
                                <div class="showcase-content">
                                    <a href="#" class="showcase-category">skirt</a>
                                
                                    <h3>
                                    <a href="#" class="showcase-title">Black Floral Wrap Midi Skirt</a>
                                    </h3>
                                
                                    <div class="showcase-rating">
                                    <i class="fa-solid fa-star"></i>
                                    <i class="fa-solid fa-star"></i>
                                    <i class="fa-solid fa-star"></i>
                                    <i class="fa-solid fa-star"></i>
                                    <i class="fa-solid fa-star"></i>
                                    </div>
                                
                                    <div class="price-box">
                                    <p class="price">$25.00</p>
                                    <del>$35.00</del>
                                    </div>
                                
                                </div>
                                
                                </div>
                
                                <div class="showcase">
                                
                                <div class="showcase-banner">
                                    <img src={shoeTwo} alt="Casual Men's Brown shoes" class="product-img default"
                                    width="300"/>
                                    <img src={shoeTwoOne} alt="Casual Men's Brown shoes" class="product-img hover"
                                    width="300"/>
                                
                                    <div class="showcase-actions">
                                    <button class="btn-action">
                                        <i class="fa-regular fa-heart"></i>
                                    </button>
                                
                                    <button class="btn-action">
                                        <i class="fa-regular fa-eye"></i>
                                    </button>
                                
                                    <button class="btn-action">
                                        <i class="fa-solid fa-repeat"></i>
                                    </button>
                                
                                    <button class="btn-action">
                                        <i class="fa-solid fa-bag-shopping"></i>
                                    </button>
                                    </div>
                                </div>
                                
                                <div class="showcase-content">
                                    <a href="#" class="showcase-category">casual</a>
                                
                                    <h3>
                                    <a href="#" class="showcase-title">Casual Men's Brown shoes</a>
                                    </h3>
                                
                                    <div class="showcase-rating">
                                    <i class="fa-solid fa-star"></i>
                                    <i class="fa-solid fa-star"></i>
                                    <i class="fa-solid fa-star"></i>
                                    <i class="fa-solid fa-star"></i>
                                    <i class="fa-solid fa-star"></i>
                                    </div>
                                
                                    <div class="price-box">
                                    <p class="price">$99.00</p>
                                    <del>$105.00</del>
                                    </div>
                                
                                </div>
                                
                                </div>
                
                                <div class="showcase">
                                
                                <div class="showcase-banner">
                                    <img src={watchThree} alt="Pocket Watch Leather Pouch" class="product-img default"
                                    width="300"/>
                                    <img src={watchFour} alt="Pocket Watch Leather Pouch" class="product-img hover"
                                    width="300"/>
                                
                                    <p class="showcase-badge angle black">sale</p>
                                
                                    <div class="showcase-actions">
                                    <button class="btn-action">
                                        <i class="fa-regular fa-heart"></i>
                                    </button>
                                
                                    <button class="btn-action">
                                        <i class="fa-regular fa-eye"></i>
                                    </button>
                                
                                    <button class="btn-action">
                                        <i class="fa-solid fa-repeat"></i>
                                    </button>
                                
                                    <button class="btn-action">
                                        <i class="fa-solid fa-bag-shopping"></i>
                                    </button>
                                    </div>
                                </div>
                                
                                <div class="showcase-content">
                                    <a href="#" class="showcase-category">watches</a>
                                
                                    <h3>
                                    <a href="#" class="showcase-title">Pocket Watch Leather Pouch</a>
                                    </h3>
                                
                                    <div class="showcase-rating">
                                    <i class="fa-solid fa-star"></i>
                                    <i class="fa-solid fa-star"></i>
                                    <i class="fa-solid fa-star"></i>
                                    <i class="fa-regular fa-star"></i>
                                    <i class="fa-regular fa-star"></i>
                                    </div>
                                
                                    <div class="price-box">
                                    <p class="price">$150.00</p>
                                    <del>$170.00</del>
                                    </div>
                                
                                </div>
                                
                                </div>
                
                                <div class="showcase">
                                
                                <div class="showcase-banner">
                                    <img src={watchOne} alt="Smart watche Vital Plus" class="product-img default"
                                    width="300"/>
                                    <img src={watchTwo} alt="Smart watche Vital Plus" class="product-img hover" width="300"/>
                                
                                    <div class="showcase-actions">
                                    <button class="btn-action">
                                        <i class="fa-regular fa-heart"></i>
                                    </button>
                                
                                    <button class="btn-action">
                                        <i class="fa-regular fa-eye"></i>
                                    </button>
                                
                                    <button class="btn-action">
                                        <i class="fa-solid fa-repeat"></i>
                                    </button>
                                
                                    <button class="btn-action">
                                        <i class="fa-solid fa-bag-shopping"></i>
                                    </button>
                                    </div>
                                </div>
                                
                                <div class="showcase-content">
                                    <a href="#" class="showcase-category">watches</a>
                                
                                    <h3>
                                    <a href="#" class="showcase-title">Smart watche Vital Plus</a>
                                    </h3>
                                
                                    <div class="showcase-rating">
                                    <i class="fa-solid fa-star"></i>
                                    <i class="fa-solid fa-star"></i>
                                    <i class="fa-solid fa-star"></i>
                                    <i class="fa-solid fa-star"></i>
                                    <i class="fa-regular fa-star"></i>
                                    </div>
                                
                                    <div class="price-box">
                                    <p class="price">$100.00</p>
                                    <del>$120.00</del>
                                    </div>
                                
                                </div>
                                
                                </div>
                
                                <div class="showcase">
                                
                                <div class="showcase-banner">
                                    <img src={partWearOne} alt="Womens Party Wear Shoes" class="product-img default"
                                    width="300"/>
                                    <img src={partyWearTwo} alt="Womens Party Wear Shoes" class="product-img hover"
                                    width="300"/>
                                
                                    <p class="showcase-badge angle black">sale</p>
                                
                                    <div class="showcase-actions">
                                    <button class="btn-action">
                                        <i class="fa-regular fa-heart"></i>
                                    </button>
                                
                                    <button class="btn-action">
                                        <i class="fa-regular fa-eye"></i>
                                    </button>
                                
                                    <button class="btn-action">
                                        <i class="fa-solid fa-repeat"></i>
                                    </button>
                                
                                    <button class="btn-action">
                                        <i class="fa-solid fa-bag-shopping"></i>
                                    </button>
                                    </div>
                                </div>
                                
                                <div class="showcase-content">
                                    <a href="#" class="showcase-category">party wear</a>
                                
                                    <h3>
                                    <a href="#" class="showcase-title">Womens Party Wear Shoes</a>
                                    </h3>
                                
                                    <div class="showcase-rating">
                                    <i class="fa-solid fa-star"></i>
                                    <i class="fa-solid fa-star"></i>
                                    <i class="fa-solid fa-star"></i>
                                    <i class="fa-regular fa-star"></i>
                                    <i class="fa-regular fa-star"></i>
                                    </div>
                                
                                    <div class="price-box">
                                    <p class="price">$25.00</p>
                                    <del>$30.00</del>
                                    </div>
                                
                                </div>
                                
                                </div>
                
                                <div class="showcase">
                                
                                <div class="showcase-banner">
                                    <img src={jacketOne} alt="Mens Winter Leathers Jackets" class="product-img default"
                                    width="300"/>
                                    <img src={JacketTwo} alt="Mens Winter Leathers Jackets" class="product-img hover"
                                    width="300"/>
                                
                                    <div class="showcase-actions">
                                    <button class="btn-action">
                                        <i class="fa-regular fa-heart"></i>
                                    </button>
                                
                                    <button class="btn-action">
                                        <i class="fa-regular fa-eye"></i>
                                    </button>
                                
                                    <button class="btn-action">
                                        <i class="fa-solid fa-repeat"></i>
                                    </button>
                                
                                    <button class="btn-action">
                                        <i class="fa-solid fa-bag-shopping"></i>
                                    </button>
                                    </div>
                                </div>
                                
                                <div class="showcase-content">
                                    <a href="#" class="showcase-category">jacket</a>
                                
                                    <h3>
                                    <a href="#" class="showcase-title">Mens Winter Leathers Jackets</a>
                                    </h3>
                                
                                    <div class="showcase-rating">
                                    <i class="fa-solid fa-star"></i>
                                    <i class="fa-solid fa-star"></i>
                                    <i class="fa-solid fa-star"></i>
                                    <i class="fa-solid fa-star"></i>
                                    <i class="fa-regular fa-star"></i>
                                    </div>
                                
                                    <div class="price-box">
                                    <p class="price">$32.00</p>
                                    <del>$45.00</del>
                                    </div>
                                
                                </div>
                                
                                </div>
                
                                <div class="showcase">
                                
                                <div class="showcase-banner">
                                    <img src={sportsTwo} alt="Trekking & Running Shoes - black" class="product-img default"
                                    width="300"/>
                                    <img src={sportFour} alt="Trekking & Running Shoes - black" class="product-img hover"
                                    width="300"/>
                                
                                    <p class="showcase-badge angle black">sale</p>
                                
                                    <div class="showcase-actions">
                                    <button class="btn-action">
                                        <i class="fa-regular fa-heart"></i>
                                    </button>
                                
                                    <button class="btn-action">
                                        <i class="fa-regular fa-eye"></i>
                                    </button>
                                
                                    <button class="btn-action">
                                        <i class="fa-solid fa-repeat"></i>
                                    </button>
                                
                                    <button class="btn-action">
                                        <i class="fa-solid fa-bag-shopping"></i>
                                    </button>
                                    </div>
                                </div>
                                
                                <div class="showcase-content">
                                    <a href="#" class="showcase-category">sports</a>
                                
                                    <h3>
                                    <a href="#" class="showcase-title">Trekking & Running Shoes - black</a>
                                    </h3>
                                
                                    <div class="showcase-rating">
                                    <i class="fa-solid fa-star"></i>
                                    <i class="fa-solid fa-star"></i>
                                    <i class="fa-solid fa-star"></i>
                                    <i class="fa-regular fa-star"></i>
                                    <i class="fa-regular fa-star"></i>
                                    </div>
                                
                                    <div class="price-box">
                                    <p class="price">$58.00</p>
                                    <del>$64.00</del>
                                    </div>
                                
                                </div>
                                
                                </div>
                
                                <div class="showcase">
                                
                                <div class="showcase-banner">
                                    <img src={shoeOne} alt="Men's Leather Formal Wear shoes" class="product-img default"
                                    width="300"/>
                                    <img src={shoeOneOne} alt="Men's Leather Formal Wear shoes" class="product-img hover"
                                    width="300"/>
                                
                                    <div class="showcase-actions">
                                    <button class="btn-action">
                                        <i class="fa-regular fa-heart"></i>
                                    </button>
                                
                                    <button class="btn-action">
                                        <i class="fa-regular fa-eye"></i>
                                    </button>
                                
                                    <button class="btn-action">
                                        <i class="fa-solid fa-repeat"></i>
                                    </button>
                                
                                    <button class="btn-action">
                                        <i class="fa-solid fa-bag-shopping"></i>
                                    </button>
                                    </div>
                                </div>
                                
                                <div class="showcase-content">
                                    <a href="#" class="showcase-category">formal</a>
                                
                                    <h3>
                                    <a href="#" class="showcase-title">Men's Leather Formal Wear shoes</a>
                                    </h3>
                                
                                    <div class="showcase-rating">
                                    <i class="fa-solid fa-star"></i>
                                    <i class="fa-solid fa-star"></i>
                                    <i class="fa-solid fa-star"></i>
                                    <i class="fa-solid fa-star"></i>
                                    <i class="fa-regular fa-star"></i>
                                    </div>
                                
                                    <div class="price-box">
                                    <p class="price">$50.00</p>
                                    <del>$65.00</del>
                                    </div>
                                
                                </div>
                                
                                </div>
                
                                <div class="showcase">
                                
                                <div class="showcase-banner">
                                    <img src={sportsOne} alt="Better Basics French Terry Sweatshorts"
                                    class="product-img default" width="300"/>
                                    <img src={sportsTwo} alt="Better Basics French Terry Sweatshorts"
                                    class="product-img hover" width="300"/>
                                
                                    <p class="showcase-badge angle black">sale</p>
                                
                                    <div class="showcase-actions">
                                    <button class="btn-action">
                                        <i class="fa-regular fa-heart"></i>
                                    </button>
                                
                                    <button class="btn-action">
                                        <i class="fa-regular fa-eye"></i>
                                    </button>
                                
                                    <button class="btn-action">
                                        <i class="fa-solid fa-repeat"></i>
                                    </button>
                                
                                    <button class="btn-action">
                                        <i class="fa-solid fa-bag-shopping"></i>
                                    </button>
                                    </div>
                                </div>
                                
                                <div class="showcase-content">
                                    <a href="#" class="showcase-category">shorts</a>
                                
                                    <h3>
                                    <a href="#" class="showcase-title">Better Basics French Terry Sweatshorts</a>
                                    </h3>
                                
                                    <div class="showcase-rating">
                                    <i class="fa-solid fa-star"></i>
                                    <i class="fa-solid fa-star"></i>
                                    <i class="fa-solid fa-star"></i>
                                    <i class="fa-regular fa-star"></i>
                                    <i class="fa-regular fa-star"></i>
                                    </div>
                                
                                    <div class="price-box">
                                    <p class="price">$78.00</p>
                                    <del>$85.00</del>
                                    </div>
                                
                                </div>
                                
                                </div>
                
                            </div>
                
                            </div>
                    </div>
        
        </div>
        </div>
       
        
    </div>
  )
}
