import React from 'react'
import {Outlet } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';


export default function Layout({userData}) {    
return (
    <div>
        <Navbar userData={userData} />
        <Outlet></Outlet>
    </div>
)
}
