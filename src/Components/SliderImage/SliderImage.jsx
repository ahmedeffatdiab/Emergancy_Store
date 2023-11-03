import React from 'react'
import banner_1 from "../../assets/images/banner-1.jpg"
import banner_2 from "../../assets/images/banner-2.jpg"
import banner_3 from "../../assets/images/banner-3.jpg"
export default function SliderImage() {
  return (
    <div className='container'>
        <div id="carouselExampleCaptions" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
  <div class="carousel-inner">
    <div class="carousel-item active">
        <div className="slider-item">
        <img src={banner_1} alt="women's latest fashion sale" class="banner-img"/>
        <div class="banner-content">

            <p class="banner-subtitle">Trending item</p>

            <h2 class="banner-title">Women's latest fashion sale</h2>

            <p class="banner-text">
            starting at &dollar; <b>20</b>.00
            </p>

            <a href="#" class="banner-btn">Shop now</a>

        </div>
        </div>
    

    </div>
    <div class="carousel-item">
    <div className="slider-item">
        <img src={banner_2} alt="women's latest fashion sale" class="banner-img"/>
        <div class="banner-content">
  
                <p class="banner-subtitle">Trending accessories</p>
  
                <h2 class="banner-title">Modern sunglasses</h2>
  
                <p class="banner-text">
                  starting at &dollar; <b>15</b>.00
                </p>
  
                <a href="#" class="banner-btn">Shop now</a>
  
        </div>
        </div>
    </div>
    <div class="carousel-item">
    <div className="slider-item">
        <img src={banner_3} alt="women's latest fashion sale" class="banner-img"/>
        <div class="banner-content">
  
  <p class="banner-subtitle">Sale Offer</p>

  <h2 class="banner-title">New fashion summer sale</h2>

  <p class="banner-text">
    starting at &dollar; <b>29</b>.99
  </p>

  <a href="#" class="banner-btn">Shop now</a>

</div>
        </div>
    </div>
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>
    </div>
  )
}
