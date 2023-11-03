import React from 'react'
import Navbar from "../Navbar/Navbar"
import MainComponent from '../MainComponent/MainComponent';
import Footer from '../Footer/Footer';

export default function Home() {
  function changeMode(value){
    if(value=="light"){
      document.getElementById('parentBody').style.backgroundColor="white"
    }else{
      document.getElementById('parentBody').style.backgroundColor="hsl(0, 0%, 47%)"

    }
  }
  return (
    <div >
        <Navbar changeMode={changeMode}/>
        <MainComponent/>
        <Footer/>
    </div>
  )
}
