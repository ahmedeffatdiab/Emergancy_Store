import axios from "axios";
import { useEffect, useRef, useState, createContext } from "react";
import PurchaseAlert from "../Components/PurchaseAlert/PurchaseAlert";
export const ApiContext = createContext(0);
function ApiContextProvider(props) {
  const [cartNum, setCartNum] = useState(0);
  const [cart, setCart] = useState(null);
  const [userLove, setUserLove] = useState(0);
  const [userLoveObj, setUserLoveObj] = useState({});
  const [SearchDataApi, setSearchDataApi] = useState([]);
  const [orders, setOrders] = useState([]);
  const slideBarRef = useRef();
  const XIconRef = useRef();
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("✅ Product purchased successfully!");

  // --- Search ---
  async function getSearchData(txt) {
    if (!txt?.trim()) return;

    try {
      const res = await axios.post(
        "https://emergancy-api-kqk9.vercel.app/home/search",
        { word: txt },
        {
          headers: {
            'Content-Type': 'application/json',
            token: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );
      console.log(res)
      const searchResults = res.data?.data || [];
      setSearchDataApi(searchResults);
      // const searchResults = res.data?.data || [];
    } catch (err) {
      console.error("Error fetching search data:", err);
    }
  }

  // --- Cart ---
  async function getUserCart() {
    const token = localStorage.getItem("userToken");
    if (!token) {
      setCart(null);
      setCartNum(0);
      return;
    }

    try {
      const res = await axios.get("https://emergancy-api-kqk9.vercel.app/home/getCart", {
        headers: { token: `Bearer ${token}` },
      });
      const cartData = res.data?.userCart;
      if (cartData?.selectedProduct?.length > 0) {
        setCart(cartData);
        setCartNum(cartData.totalQuantity || 0);
      } else {
        setCart({ selectedProduct: [], totalPrice: 0, totalQuantity: 0 });
        setCartNum(0);
      }
    } catch (err) {
      console.error("Error fetching cart:", err);
      setCart({ selectedProduct: [], totalPrice: 0, totalQuantity: 0 });
      setCartNum(0);
    }
  }

  async function addtoCart(id, title, price) {
    const token = localStorage.getItem("userToken");
    if (!token) return;

    try {
      const res = await axios.get(
        `https://emergancy-api-kqk9.vercel.app/home/buyProduct/${id}/${title}/${price}`,
        { 
          headers: { 
            'Content-Type': 'application/json',
            token: `Bearer ${token}`
         } 
        }
      );
      getUserCart();
      return res.data.message;
    } catch (err) {
      console.error("Error adding to cart:", err);
      return false;
    }
  }
  // --- Loves ---
  async function getUserLoves() {
  const token = localStorage.getItem("userToken");
    if (!token) return;
  try {
    const res = await axios.get("https://emergancy-api-kqk9.vercel.app/home/getUserLoves", {
      headers: {
        'Content-Type': 'application/json',
          token: `Bearer ${token}`,
      }
    });
    const { status, message, lovedProducts, lengthdata } = res.data;

    if (status === 200) {
      setUserLove(lengthdata || 0);
      setUserLoveObj(lovedProducts || []);
      return message;
    } else {
      console.warn("Non-success status:", res.data);
      setUserLove(0);
      setUserLoveObj([]);
      return message || "Failed to fetch loved products";
    }

  } catch (err) {
    // Handle any unexpected or network/server error
    console.error("Error fetching user loves:", err);
    setUserLove(0);
    setUserLoveObj([]);
    return "Error connecting to server";
  }
}


  async function addLove(id) {
    const token = localStorage.getItem("userToken");
    if (!token) return false;

    try {
      const res = await axios.get(
        `https://emergancy-api-kqk9.vercel.app/home/getLoveProduct/${id}`,
        {
          headers: { token: `Bearer ${token}` },
        }
      );
      getUserLoves();
      return res.data.message;
    } catch (err) {
      console.error("Error adding love:", err);
      return false;
    }
  }

  // --- Orders ---
  async function getOrders() {
    const token = localStorage.getItem("userToken");
    if (!token) return;

    try {
      const res = await axios.get("https://emergancy-api-kqk9.vercel.app/getOrders", {
        headers: { 
          token: `Bearer ${token}` 
        },
      });
      setOrders(res.data.data || []);
    } catch (err) {
      console.error("Error fetching orders:", err);
    }
  }

  // --- Notification UI ---
  function shownotificaton(msg) {
    document.getElementById("notificationTest")?.classList.add("show");
    document.getElementById("notification_text").innerHTML = msg;
  }

  function hidenotificaton() {
    document.getElementById("notificationTest")?.classList.remove("show");
  }
  
  function showPurchaseAlert(message = "✅ Product purchased successfully!") {
  setAlertMessage(message);
  setAlertVisible(true);
}
  // --- Sidebar Control ---
  const ShowSlideBar = () => {
    if (slideBarRef.current && XIconRef.current) {
      slideBarRef.current.classList.add("active");
      XIconRef.current.classList.add("active");
    }
  };

  const hideSlideBar = () => {
    if (slideBarRef.current && XIconRef.current) {
      slideBarRef.current.classList.remove("active");
      XIconRef.current.classList.remove("active");
    }
  };

  // --- Initial Load ---
    useEffect(() => {
      getUserCart();
      getUserLoves();
      getOrders();
    }, []);

  return (
    <ApiContext.Provider
      value={{
        cartNum,
        getUserCart,
        addtoCart,
        cart,
        getUserLoves,
        addLove,
        userLove,
        userLoveObj,
        getSearchData,
        SearchDataApi,
        shownotificaton,
        hidenotificaton,
        orders,
        getOrders,
        setOrders,
        showPurchaseAlert,
        ShowSlideBar,
        hideSlideBar,
        slideBarRef,
        XIconRef,
        
      }}
    >
      {props.children}
      <PurchaseAlert
  message={alertMessage}
  visible={alertVisible}
  onClose={() => setAlertVisible(false)}
/>
    </ApiContext.Provider>
  );
}

export default ApiContextProvider
