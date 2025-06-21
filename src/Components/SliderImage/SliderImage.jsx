import React from 'react'
export default function SliderImage() {
  return (
    <div className='container'>
        <div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-indicators">
            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
          </div>
        <div className="carousel-inner">
          <div className="carousel-item active">
              <div className="slider-item h-100">
              <img src="https://res.cloudinary.com/dptz3ognb/image/upload/v1750002651/Untitled-2_wzavr3.jpg" alt="women's latest fashion sale" className="banner-img"/>
              <div className="banner-content">
                  <p className="banner-subtitle">Trending item</p>
                  <h2 className="banner-title">Women's latest fashion sale</h2>
              </div>
              </div>
          </div>
          <div className="carousel-item">
          <div className="slider-item h-100">
              <img src="https://res.cloudinary.com/dptz3ognb/image/upload/v1750002650/Untitled-3_gzqall.jpg" alt="women's latest fashion sale" className="banner-img"/>
              <div className="banner-content">
                      <p className="banner-subtitle">Trending accessories</p>
                      <h2 className="banner-title">Modern sunglasses</h2>
              </div>
              </div>
          </div>
          <div className="carousel-item">
            <div className="slider-item h-100">
                <img className=""src="https://res.cloudinary.com/dptz3ognb/image/upload/v1750002650/Untitled-4_wufe8u.jpg" alt="women's latest fashion sale" className="banner-img"/>
                <div className="banner-content">
                  <p className="banner-subtitle">Sale Offer</p>
                  <h2 className="banner-title">New fashion summer sale</h2>
                </div>
              </div>  
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
        </div>
    </div>
  )
}
