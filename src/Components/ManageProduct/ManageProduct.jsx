import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const ManageProduct = () => {
    const [produtctData,setProductData]=useState({});
    //Fetches and sets product data.
    async function getProducts(){
        let resData=await axios.get("https://emergancy-api-zdep.vercel.app/getProducts/")
        setProductData(resData.data.data)
    }
    //Deletes product and refreshes list
    const deleteProduct=async(id)=>{
        const token = localStorage.getItem("userToken");
        if(!token){return;}
        await axios.get(`https://emergancy-api-zdep.vercel.app/deleteProduct/${id}`,{
            headers:{
                "token": `Bearer ${token}`,
            }
        })
        getProducts();
    }
    // Fetch products once on mount
    useEffect(()=>{
        getProducts();
    },[])
  return (
    <div>
      <div className="container">
        <h3 className='text-primary'>Magange Products</h3>
        <table class="table text-center">
            <thead>
                <tr>
                <th scope="col">#</th>
                <th scope="col">Title</th>
                <th scope="col">Price</th>
                <th scope="col" style={{ width: "300px" }}>Action</th>
                </tr>
            </thead>
                <tbody>
                    {Array.isArray(produtctData) && produtctData.map((ele, index) => (
                        <tr key={index}>
                            <th scope="row">{index + 1}</th>
                            <td>{ele.title}</td>
                            <td>${ele.price}</td>
                            <td>   
                                <div className="">
                                        <Link className='d-inline-block me-2' to={`/dashBoard/EditProduct/${ele._id}`}>
                                            <button className='btn btn-primary'>
                                                Edit
                                            </button>   
                                        </Link>
                                        <button className='btn btn-danger d-inline-block' onClick={()=>deleteProduct(ele._id)}>Delete</button>
                                </div>
                                    
                            </td>
                            
                        </tr>
                    ))}
                    
                </tbody>
                </table>
      </div>
    </div>
  )
}
export default ManageProduct
