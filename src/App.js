import SignUp from './Components/SignUp/SignUp';
import { BrowserRouter , Routes, Route } from 'react-router-dom';
import Home from './Components/Home/Home';
import { useEffect, useState } from 'react';
import { RouterProvider,createHashRouter } from 'react-router-dom';
import CardItem from './Components/CardItem/CardItem';
import Layout from './Components/Layout/Layout';
import CardList from './Components/CardList/CardList';
import Login from './Components/Login/Login';
import ForgetPassword from './Components/ForgetPassword/ForgetPassword';
import ApiContextProvider from './Context/ApiContext';
import CardBought from './Components/CardBought/CardBought';
import CardsLoves from './Components/CardsLoves/CardsLoves';
import Search from './Components/Search/Search';
import Profile from './Components/Profile/Profile';
import CheckOut from "./Components/CheckOut/CheckOut";
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';
import jwtDecode from 'jwt-decode';
import Order from './Components/Order/Order';
import OrderDetails from './Components/OrderDetails/OrderDetails';
import DashBoard from './Components/DashBoard/DashBoard';
import AddProduct from './Components/AddProduct/AddProduct';
import ManageProduct from './Components/ManageProduct/ManageProduct';
import EditProduct from './Components/EditProduct/EditProduct';
import About from './Components/About/About';
import Services from './Components/Services/Services';
import Layout2 from './Components/Layout2/Layout2';
export default function App() {
  let [userData,setUserData]=useState(null);
  //// Save user data by decoding JWT token from localStorage, or clear if no token found
  function saveUserData(){
    if(localStorage.getItem('userToken')!=null){
      let encodedToken=localStorage.getItem('userToken');
      let decodedToken=jwtDecode(encodedToken);
      setUserData(decodedToken);
    }else{
      setUserData(null);
    }
  }
  //On component mount, check for user token in localStorage and load user data if present
  useEffect(()=>{
    if(localStorage.getItem('userToken') !==null){
      saveUserData()
    }
  },[])
  // Define app routes with protected routes and nested routing using createHashRouter
  const routes=createHashRouter([
    {path:"/",element:<Layout userData={userData} />,children:[
      {index:true,element:<Home/>},
      {path:"/signup",element:<SignUp/>},
      {path:"/login",element:<Login saveUserData={saveUserData}/>},
      {path:"/about",element:<ProtectedRoute><About/></ProtectedRoute>},
      {path:"/services",element:<ProtectedRoute><Services/></ProtectedRoute>},  
      {path:"/forgetPassword",element:<ProtectedRoute><ForgetPassword/></ProtectedRoute>},
      {path:"/cardItem/:id",element:<ProtectedRoute><CardItem/></ProtectedRoute>},
      {path:"/cardList/:query",element:<ProtectedRoute><CardList/></ProtectedRoute>},
      {path:"/cardsBought",element:<ProtectedRoute><CardBought/></ProtectedRoute>},
      {path:"/cardsloves",element:<ProtectedRoute><CardsLoves/></ProtectedRoute>},
      {path:"/search",element:<ProtectedRoute><Search/></ProtectedRoute>},
      {path:"/checkOut",element:<ProtectedRoute><CheckOut/></ProtectedRoute>},
      {path:"/profile",element:<ProtectedRoute><Profile saveUserData={saveUserData}/></ProtectedRoute>},
    ]},
      {path:"/dashBoard",element:<ProtectedRoute><DashBoard/></ProtectedRoute>,children:[
        {path:"Add-Products",element:<ProtectedRoute><AddProduct/></ProtectedRoute>},
        {path:"Manage-Products",element:<ProtectedRoute><ManageProduct/></ProtectedRoute>},
        {path:"EditProduct/:id",element:<ProtectedRoute><EditProduct/></ProtectedRoute>},
        {path:"orders",element:<ProtectedRoute><Layout2/></ProtectedRoute>,children:[
          {index:true,element:<Order/>},
          {path:"orderDetails/:id",element:<ProtectedRoute><OrderDetails/></ProtectedRoute>},
        ]},
    ]},
  ])
  return  <ApiContextProvider>
            <div>
              {/* <BrowserRouter>
                  <Routes>
                    <Route path="/" element={<Layout userData={userData} />} />
                    <Route index element={<Home />} />
                    <Route path="signup" element={<SignUp />} />
                    <Route path="login" element={<Login saveUserData={saveUserData} />} />
                    <Route path="about" element={<ProtectedRoute><About /></ProtectedRoute>} />
                    <Route path="services" element={<ProtectedRoute><Services /></ProtectedRoute>} />
                    <Route path="forgetPassword" element={<ProtectedRoute><ForgetPassword /></ProtectedRoute>} />
                    <Route path="cardItem/:id" element={<ProtectedRoute><CardItem /></ProtectedRoute>} />
                    <Route path="cardList/:query" element={<ProtectedRoute><CardList /></ProtectedRoute>} />
                    <Route path="cardsBought" element={<ProtectedRoute><CardBought /></ProtectedRoute>} />
                    <Route path="cardsloves" element={<ProtectedRoute><CardsLoves /></ProtectedRoute>} />
                    <Route path="search" element={<ProtectedRoute><Search /></ProtectedRoute>} />
                    <Route path="checkOut" element={<ProtectedRoute><CheckOut /></ProtectedRoute>} />
                    <Route path="profile" element={<ProtectedRoute><Profile saveUserData={saveUserData} /></ProtectedRoute>} />
                    
                    <Route path="/dashBoard" element={<ProtectedRoute><DashBoard /></ProtectedRoute>} />
                    <Route path="Add-Products" element={<ProtectedRoute><AddProduct /></ProtectedRoute>} />
                    <Route path="Manage-Products" element={<ProtectedRoute><ManageProduct /></ProtectedRoute>} />
                    <Route path="EditProduct/:id" element={<ProtectedRoute><EditProduct /></ProtectedRoute>} />
                    <Route path="orders" element={<ProtectedRoute><Order /></ProtectedRoute>} />
                    <Route path="orderDetails/:id" element={<ProtectedRoute><OrderDetails /></ProtectedRoute>} />
                    <Route path="OrderDetialsProducts/:sessionId" element={<ProtectedRoute><OrderDetialsProducts /></ProtectedRoute>} />
                  </Routes>
                </BrowserRouter>; */}
              <RouterProvider router={routes}/>
                
            </div>
          </ApiContextProvider>
}
