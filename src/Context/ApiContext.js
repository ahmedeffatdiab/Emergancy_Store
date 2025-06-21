import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { createContext } from "react";
import { useNavigate } from "react-router-dom";
import jwt from "jwt-decode";

export const ApiContext=createContext(0);
function ApiContextProvider(props){
    const [cartNum,setCartNum]=useState(0)
    const [cart,setCart]=useState(0)
    const [userLove,setUserLove]=useState(0)
    const [userLoveObj,setUserLoveObj]=useState({})
    const [SearchDataApi,setSearchDataApi]=useState([]);
    const [orders,setOrders]=useState([]);
    const slideBarRef = useRef();
  const XIconRef = useRef();
    //Sends search query to server
    async function getSearchData(txt){
        if (!txt || txt.trim() === '') {
            return;
        }
        let searchApi=await axios.post('https://emergancy-api-zdep.vercel.app/home/search',{
            word:txt
        },{
            headers:{
            "token":`Bearer ${localStorage.getItem("userToken")}`
            }
        })
            setSearchDataApi(searchApi)
    }
    //Retrieves and updates user cart
    async function getUserCart() {
    const token = localStorage.getItem("userToken");
    if (!token) {
        setCart(null);
        setCartNum(0);
        return;
    }
    try {
        const res = await axios.get("https://emergancy-api-zdep.vercel.app/home/getCart", {
        headers: {
            "token": `Bearer ${token}`,
        },
        });
        const cart = res.data?.userCart;
        if (cart && Array.isArray(cart.selectedProduct) && cart.selectedProduct.length > 0) {
        setCart(cart);
        setCartNum(cart.totalQuantity || 0);
        } else {
        // Cart exists but has no products, or cart doesn't exist
        setCart({ selectedProduct: [], totalPrice: 0, totalQuantity: 0 });
        setCartNum(0);
        }
    } catch (err) {
        console.error("Error fetching cart:", err);
        setCart({ selectedProduct: [], totalPrice: 0, totalQuantity: 0 });
        setCartNum(0);
    }
    }
    //Adds product to user cart
    async function addtoCart(id,title,price){
        if(localStorage.getItem("userToken")){
            let res=await axios.get(`https://emergancy-api-zdep.vercel.app/home/buyProduct/${id}/${title}/${price}`,{
                headers:{
                "token":`Bearer ${localStorage.getItem("userToken")}`
                }
            })
            getUserCart();
            
            return res.data.message;
        }else{
            return false;
        }
        
    
    }
    //Retrieves user's favorite products
    async function getUserLoves(){        
        if(localStorage.getItem("userToken")){
            let res=await axios.get('https://emergancy-api-zdep.vercel.app/home/getUseLoves',{
                headers:{
                "token":`Bearer ${localStorage.getItem("userToken")}`
                }
            })
            setUserLove(res.data.lengthdata);
            setUserLoveObj(res.data)
            return res.data.message;
        }else{
            return false;
        }
    }
    // Adds product to user favorites
    async function addLove(id){
        if(localStorage.getItem("userToken")){
            let res=await axios.get(`https://emergancy-api-zdep.vercel.app/home/getLoveProduct/${id}`,{
                headers:{
                "token":`Bearer ${localStorage.getItem("userToken")}`
                }
            })
            getUserLoves()
            return res.data.message;
        }else{
            return false;
        }
    }
    // Fetches and sets user orders
    async function getOrders(){
     const token = localStorage.getItem("userToken");
     if(!token){
        return;
     }
    try{    
        const resData = await axios.get("https://emergancy-api-zdep.vercel.app/getOrders", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        setOrders(resData.data.data)
    }catch(error){
        console.error("Error fetching cart:", error);
    }
    }
    // Fetches user data on mount
    useEffect(()=>{
        getUserCart();
        getUserLoves();
        getOrders();
        // getuserInfo()
    },[])
    // Displays notification with given message
    function shownotificaton(msg){
        document.getElementById('notificationTest').classList.add('show');
        document.getElementById('notification_text').innerHTML=msg;
    }
    //Hides notification by removing class
    function hidenotificaton(){
        document.getElementById('notificationTest').classList.remove('show');
    }
    //Displays timed purchase success alert
    function showPurchaseAlert(message = " Product purchased successfully!") {
        console.log("welcome by ")
  // Remove existing alert
  const existing = document.getElementById("purchase-alert");
  if (existing) existing.remove();

  // Inject styles if not already there
  if (!document.getElementById("alert-style")) {
    const style = document.createElement("style");
    style.id = "alert-style";
    style.textContent = `
      .alert {
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: #4CAF50;
        color: white;
        padding: 15px 25px;
        border-radius: 5px;
        z-index: 999999;
        box-shadow: 0 2px 10px rgba(0,0,0,0.2);
        opacity: 1;
        transition: opacity 0.5s ease;
      }
      .progress-bar {
        width: 100%;
        height: 5px;
        background-color: rgba(255, 255, 255, 0.3);
        margin-top: 10px;
        border-radius: 3px;
        overflow: hidden;
      }
      .progress-fill {
        height: 100%;
        width: 100%;
        background-color: white;
        transition: width 3s linear;
      }
    `;
    document.head.appendChild(style);
  }

  // Create alert box
  const alertBox = document.createElement("div");
  alertBox.id = "purchase-alert";
  alertBox.classList.add("alert");
  alertBox.textContent = message;

  const progressBar = document.createElement("div");
  progressBar.classList.add("progress-bar");

  const progressFill = document.createElement("div");
  progressFill.classList.add("progress-fill");

  progressBar.appendChild(progressFill);
  alertBox.appendChild(progressBar);
  document.body.appendChild(alertBox);

  // Animate progress bar
  requestAnimationFrame(() => {
    progressFill.style.width = "0%";
  });

  // Fade and remove
  setTimeout(() => {
    alertBox.style.opacity = "0";
    setTimeout(() => alertBox.remove(), 500);
  }, 3000);
    }
    // Shows sidebar by adding classes
    const ShowSlideBar = () => {
        console.log("showSlidBar");
    if (slideBarRef.current && XIconRef.current) {
      slideBarRef.current.classList.add("active");
      XIconRef.current.classList.add("active");
    }
    };
    //Hides sidebar by removing classes
    const hideSlideBar = () => {
            console.log("hideSlidBar");
        if (slideBarRef.current && XIconRef.current) {
        slideBarRef.current.classList.remove("active");
        XIconRef.current.classList.remove("active");
        }
    };

    return <ApiContext.Provider value={{cartNum,getUserCart,addtoCart,cart,getUserLoves,addLove,userLove,userLoveObj,getSearchData,SearchDataApi,shownotificaton,hidenotificaton,orders,getOrders,setOrders,showPurchaseAlert,ShowSlideBar,
        hideSlideBar,
        slideBarRef,
        XIconRef,}}>
                {props.children}
           </ApiContext.Provider>
}
export default ApiContextProvider

