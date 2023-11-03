import React from 'react'
import SignUp from './Components/SignUp/SignUp';
import Home from './Components/Home/Home';
import { createBrowserRouter,RouterProvider,createHashRouter } from 'react-router-dom';
export default function App() {
  const routes=createHashRouter([
    {path:"/",element:<Home/>},
    {path:"/signup",element:<SignUp/>},
  ])
  return (
    <div>
    <RouterProvider router={routes}/>
    </div>
  )
}
