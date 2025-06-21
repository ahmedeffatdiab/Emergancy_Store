import React from 'react'
import SliderImage from '../SliderImage/SliderImage'
import Category from "../Category/Category";
import Productslider from '../Productslider/Productslider';
import Blog from '../Blog/Blog';
import Footer from '../Footer/Footer';
export default function MainComponent() {
  return (
        <div>
        <SliderImage/>
        <Category/>
        <Productslider   />
        <Blog/>
        <Footer/>
    </div>
  )
}
