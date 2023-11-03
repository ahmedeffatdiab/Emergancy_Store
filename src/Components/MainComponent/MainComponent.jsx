import React from 'react'
import SliderImage from '../SliderImage/SliderImage'
import Category from "../Category/Category";
import Productslider from '../Productslider/Productslider';
import Testimontails from '../Testimontails/Testimontails';
import Blog from '../Blog/Blog';
export default function MainComponent() {
  return (
         <div>
        <SliderImage/>
        <Category/>
        <Productslider/>
        <Testimontails/>
        <Blog/>

    </div>
  )
}
