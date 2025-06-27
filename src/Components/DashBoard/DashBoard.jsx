import React, { useContext, useEffect, useState } from 'react'
import "../../App.css"
import { Link, useNavigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import axios from 'axios';

import { ApiContext } from '../../Context/ApiContext';
const DashBoard = () => {
  const [productLength,setProductLength]=useState(null);
  const [userLength,setUserLength]=useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const {orders,hidenotificaton}=useContext(ApiContext);
  let navigate=useNavigate();
  
  // Fetches products and sets count
  async function getProducts(){
    let resData=await axios.get("https://emergancy-api-kqk9.vercel.app/getProducts");
    setProductLength(resData.data.dataLength)
  }
  // Fetches total number of users
  async function getUsers(){
    let resData=await axios.get("https://emergancy-api-kqk9.vercel.app/auth/getUsersNumber");
    setUserLength(resData.data.length)
  }
  // Clears session and logs out
  function Logout(){
    localStorage.removeItem("userToken");
    sessionStorage.clear()
    navigate("/login")
  }
  // Toggles sidebar open/close state
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
 // Closes the sidebar menu
  const closeSidebar = () => {
    setSidebarOpen(false);
  };
  // Fetch products and user counts
  useEffect(()=>{
    getProducts();
    getUsers();
  },[])
  return (
    <>
    <div className="notification-toast bg-success" id="notificationTest" data-toest>
                <button className="toast-close-btn"  data-toest-close>
                    <i className="fa-solid fa-xmark text-danger" onClick={hidenotificaton} ></i>
                </button>
                <div className='text-white' id="notification_text"></div>
            </div>
      <div className="menu-icon" onClick={toggleSidebar}>
        &#9776;
      </div>
      {sidebarOpen && <div className="sidebar-overlay" onClick={closeSidebar}></div>}
      <div className="dashboard-container">
        <div className={`left-side  ${sidebarOpen ? 'show' : ''}`}>
          <h4 class="text-center text-white">Admin Panel</h4>
          <Link to="/">Home</Link>
          <Link to="/dashBoard">Dashboard</Link>
          <Link to="/dashBoard/Add-Products">Add Products</Link>
          <Link to="/dashBoard/Manage-Products">Manage Products</Link>
          <Link to="/dashBoard/orders">Orders</Link>
          <a href="#" onClick={Logout}>Logout</a>
        </div>
              <div className="container">
                <div className="content-area ">
                  <div class=" m-auto">
                  <h3>Welcome, Admin</h3>
                <div className="row mt-4 g-4">
          {/* Total Products */}
          <div className="col-md-4">
            <div className="card shadow-sm border-0 h-100 bg-primary text-white">
              <div className="card-body">
                <h5 className="card-title">Total Products</h5>
                <p className="card-text fs-4">{productLength}</p>
              </div>
            </div>
          </div>

          {/* Orders */}
          <div className="col-md-4">
            <div className="card shadow-sm border-0 h-100 bg-success text-white">
              <div className="card-body">
                <h5 className="card-title">Orders</h5>
                <p className="card-text fs-4">{orders.length}</p>
              </div>
            </div>
          </div>

          {/* Users */}
          <div className="col-md-4">
            <div className="card shadow-sm border-0 h-100 bg-warning text-dark">
              <div className="card-body">
                <h5 className="card-title">Users</h5>
                <p className="card-text fs-4">{userLength}</p>
              </div>
            </div>
          </div>
        </div>
          <Outlet></Outlet>
          </div>
                </div>
              </div>
                
      </div>
    </>
  )
}

export default DashBoard
