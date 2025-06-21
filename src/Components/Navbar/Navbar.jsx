import React, { useState } from 'react'
import logo from '../../assets/images/logo/logo.svg'
import { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ApiContext } from '../../Context/ApiContext';
import { useContext } from 'react';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom'

export default function Navbar({userData}) {
    let {cartNum,getUserCart,getUserLoves,userLove,hidenotificaton,getSearchData,getOrders,ShowSlideBar}=useContext(ApiContext)
    const [userState, setUserState] = useState(!!localStorage.getItem("userToken"));
    const navigate=useNavigate()
    const searchRef = useRef(null);
    const location = useLocation();
    const isSidebarAvailable = location.pathname === '/';
    // Load user data on userState
    useEffect(()=>{
        getUserCart();
        getUserLoves();
        const token = localStorage.getItem("userToken");
        if (token) {
        setUserState(token);
        }
    },[userState]);
    // Trigger search on Enter key
    const handleKeyPress = (event) => {
        if(event.key=='Enter'){
            getSearchData(searchRef.current.value)
        }
    };
    // Fetch search results on input
    function getTextFoSearch(){
        getSearchData(searchRef.current.value)
    }
    // Log out user and redirect
    async function Logout(){
        localStorage.removeItem("userToken");
        setUserState(false); // Update state to trigger re-render
        navigate("/login");
        window.location.reload();
    }
    //Fetch initial empty search results
    useEffect(()=>{
        getSearchData('')
    },[])
  return (
    
    <div className='body'>
            <div className="overlay" data-overlay></div>
            <div className="notification-toast bg-success" id="notificationTest" data-toest>
                <button className="toast-close-btn"  data-toest-close>
                    <i className="fa-solid fa-xmark text-danger" onClick={hidenotificaton} ></i>
                </button>
                <div className='text-white' id="notification_text"></div>
            </div>
            <header>
                <div className="header-top">
                    <div className="container">
                    <ul className="header-social-container">
                        <li>
                        <a href="#" className="social-link">
                            <i className="fa-brands fa-facebook"></i>
                        </a>
                        </li>
                        <li>
                        <a href="#" className="social-link">
                        <i className="fa-brands fa-twitter"></i>
                        </a>
                        </li>
                        <li>
                        <a href="#" className="social-link">
                        <i className="fa-brands fa-instagram"></i>
                        </a>
                        </li>
                        <li>
                        <a href="#" className="social-link">
                        <i className="fa-brands fa-linkedin"></i>
                        </a>
                        </li>
                    </ul>
                    <div className="header-alert-news">
                    <div className=''>
                                    <div className="container">
                                        <ul className='nav'>
                                            <li className='nav-item'><Link className='nav-link ' to="/">Home</Link></li>
                                            <li className='nav-item'><Link className='nav-link ' to="/about">About</Link></li>
                                            <li className='nav-item'><Link className='nav-link ' to="/services">Services</Link></li>                                         
                                        </ul>
                                    </div>
                                </div>
                    </div>

                    <div className="header-top-actions">
                        {userState?<button onClick={Logout}><Link to="#" >Logout</Link></button>:<>
                        <Link to="/login"><div className='nav-link'>Login</div></Link>
                        <Link to="/signup"><div className='nav-link'>Register</div></Link>
                        </>}
                        {userState?(
                        <div className='user-image'>
                            <Link to="/profile">
                                <button className="action-btn">
                                    {userData?.user?.imageProfile?<img className='rounded rounded-circle' src={userData.user.imageProfile} alt="User Profile"></img>
                                    :<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzBXNuO6PezhC18aYH_2cYtS0I7KbxoKYdwA&usqp=CAU"></img>}                  
                                </button>
                            </Link>
                        </div>)
                        :null}
                    </div>
                    </div>
                </div>
                <div className="header-main">
                    <div className="container">
                    <a alt="logo" href="#" className="header-logo">
                        Emergancey
                    </a>
                    <Link to="/search">
                    <div className="input-group mb-3 w-100 m-auto mt-4">
                    <span onClick={getTextFoSearch} className="input-group-text" id="basic-addon1"><i className="fa-solid fa-magnifying-glass"></i></span>
                    <input id="searchInput" ref={searchRef} onKeyPress={handleKeyPress}  type="text" className="form-control  "   placeholder="Search Product...." aria-label="Username" aria-describedby="basic-addon1"/>
                    </div>
                    </Link>
                    
                    <div className="header-user-actions">
                        {userData && userData.user.isAdmin ? (
                            <Link to="/dashBoard">
                                <button className="action-btn">
                                <i className="fa-solid fa-table"></i>
                            </button>
                            </Link>
                            
                            
                        ) : (
                        <div className='header-user-actions'>
                            
                            <Link to="/cardsloves">
                                <button className="action-btn">
                                <i className="fa-solid fa-heart"></i>
                                {
                                userLove?
                                <span className="count">{userLove}</span>
                                    :null
                                }
                                </button>
                            </Link>
                            <button className="action-btn">
                                <Link to="/cardsBought" className='text-dark'>
                                <i className="fa-solid fa-cart-shopping"></i>
                                {userData?
                                <span className="count">{cartNum}</span>
                                :null}
                                </Link>
                            </button>
                        </div>
                        )}                 
                    </div>
                    </div>
                </div>
            </header>
            <div className="mobile-bottom-navigation">
                {isSidebarAvailable && (
                    <button onClick={ShowSlideBar} className="action-btn">
                    <i className="fa-solid fa-bars"></i>
                    </button>
                )}
                {userData && userData.user.isAdmin ? "" : (
                    <button className="action-btn">
                    <Link to="/cardsloves" className='text-dark'>
                        <i className="fa-solid fa-heart"></i>
                        {userLove ? <span className="count">{userLove}</span> : null}
                    </Link>
                    </button>
                )}
                    <button className="action-btn">
                      <Link to="/" className='text-dark'>
                        <i className="fa-solid fa-house"></i>
                      </Link>
                    </button>
                    {userData && userData.user.isAdmin ? "" : (
                      <button className="action-btn">
                        <Link to="/cardsBought" className='text-dark'>
                          <i className="fa-solid fa-cart-shopping"></i>
                          {cartNum ? <span className="count">{cartNum}</span> : null}
                        </Link>
                      </button>
                    )}
                    {userData && userData.user.isAdmin ? (
                      <button className="action-btn" data-mobile-menu-open-btn>
                        <i className="fa-solid fa-border-all"></i>
                      </button>
                    ) : ""}
            </div>
    </div>
  )
}
