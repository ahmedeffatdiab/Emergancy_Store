import React, { useState } from 'react'
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
    useEffect(()=>{
        getUserCart();
        getUserLoves();
        const token = localStorage.getItem("userToken");
        if (token) {
        setUserState(token);
        }
    },[userState]);
    const handleSearch = async () => {
    const searchText = searchRef.current.value.trim();
    if (searchText !== '') {
      await getSearchData(searchText); // Fetch search data
      navigate('/search'); // Navigate to search only after input
    }
  };
    const handleKeyPress = async (event) => {
    if (event.key === 'Enter') {
      await handleSearch();
    }
  };
    function getTextFoSearch(){
        getSearchData(searchRef.current.value)
    }
    async function Logout(){
        localStorage.removeItem("userToken");
        setUserState(false); 
        navigate("/login");
        window.location.reload();
    }
    
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
                    <a alt="logo" href="#" className="header-logo" style={{color:"black"}}>
                        Emergancey
                    </a>
                    <div>
                        <div className="position-relative w-100 mt-4 mb-1">
                            <input id="searchInput" ref={searchRef} onKeyDown={handleKeyPress} type="text" className="form-control ps-5" placeholder="Search Product..."/>
                            <span onClick={getTextFoSearch} className="search-icon-inside" >
                                <i className="fa-solid fa-magnifying-glass"></i>
                            </span>
                        </div>
                    </div>
                    
                    <div className="header-user-actions">
                        {userData && userData.user.isAdmin ? (
                            <Link to="/dashBoard" className='action-btn'>
                                {/* <button className=""> */}
                                <i className="fa-solid fa-table"></i>
                            {/* </button> */}
                            </Link>
                            
                            
                        ) : (
                        <div className='header-user-actions'>
                            
                            <Link to="/cardsloves" className='action-btn'>
                                    <i className="fa-solid fa-heart"></i>
                                    { localStorage.getItem("userToken") && typeof userLove === 'number' && (
                                    <span className="count">{userLove}</span>
                                    )}
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
                    <Link to="/cardsloves">
                                {/* <button className="action-btn">
                                <i className="fa-solid fa-heart"></i>
                                {
                                userLove?
                                    <span className="count">{userLove}</span>
                                :
                                  null
                                }
                                
                                </button> */}
                                <button className="action-btn">
                                        <i className="fa-solid fa-heart"></i>
                                        { localStorage.getItem("userToken") && typeof userLove === 'number' && (
                                        <span className="count">{userLove}</span>
                                        )}
                                </button>
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
                     <Link to="/dashBoard">
                                <button className="action-btn">
                                <i className="fa-solid fa-table"></i>
                            </button>
                            </Link>
                    ) : ""}
            </div>
    </div>
  )
}
