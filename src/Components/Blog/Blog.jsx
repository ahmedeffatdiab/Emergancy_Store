import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'
import { ApiContext } from '../../Context/ApiContext';
import StarRating from '../StarRating/StarRating';

export default function Blog() {
  let {addtoCart,addLove,shownotificaton}=useContext(ApiContext)
  const [blogApi,setBlogApi]=useState({});
  const navigate=useNavigate()
  // Fetches blog data from API
  const getBlogApi=async ()=>{
    let res=await axios.get("https://emergancy-api-zdep.vercel.app/getDataByQuery/suit");
    setBlogApi(res.data.data)
  }
  // Truncates text to max length
  function truncateText(text) {
    const maxLength = 12;
  
    if (text.length <= maxLength) {
      return text;
    } else {
      const truncatedText = text.substring(0, maxLength) + '...';
      return truncatedText;
    }
  }
  // Adds product and handles response
  async function getProductData(id,title,price){
    let response= await addtoCart(id,title,price)
    console.log(response);
    if(response){
      console.log(response);
      shownotificaton('You Add Product successfully !')
    }else{
      navigate("/login")
    }
  }
  // Marks product as loved notification
  async function loveProduct(id){
    await addLove(id);
    shownotificaton('You Add Product Loved successfully ! ')
  }
  //Fetches blog data when the component mounts.
   useEffect(()=>{
    getBlogApi()
  },[])
  return (
    <div>
        <div className="container">
          <h2 className="title">New Suits</h2>
          <div className="blog">
            <div className='row gy-4'>
            {blogApi.length>=1?
                blogApi.map((ele,index)=>{
                  return <div key={index} className=' col-sm-6 col-md-6 col-lg-4 col-xl-2'>
                      <div className="card mx-2 border-0" >
                    <Link to={`/cardItem/${ele._id}`}>
                        <div className='cart-image'>
                          <img src={ele.imageUrls[0]} height="150px" className="card-img-top" alt="product-image"/>
                        </div>
                        </Link>
                        <div className="card-body">
                          <p className=" blog-title my-2">{truncateText(ele.title)}</p>
                          <h5 className="blog-category">{ele.category}</h5>
                          <StarRating rating={ele.rating} size="1px" />
                          <div className='d-flex justify-content-between align-items-center   '>
                            {/* <p className='blog-meta flex-start my-1  '>${ele.price}</p> */}
                            <div className="price-box">
                                  {ele.discount?(<>
                                  <p className="blog-meta flex-start my-1">${Math.ceil(ele.price-(ele.price*ele.price/100))}</p>
                                  <p><del>${ele.price}</del></p>
                                  </>)
                                  :<p className="blog-meta flex-start my-1">${ele.price}</p>
                                  }
                              </div>
                            <div className='d-flex'>
                                <i className="fa-regular fa-heart border border-1 rounded-1 p-1 m-1" onClick={()=>loveProduct(ele._id)}></i>
                                <Link to={`/cardItem/${ele._id}`} className='text-dark'>
                                  <i className="fa-regular fa-eye border border-1 rounded-1 p-1 m-1"></i>
                                </Link>
                            </div>
                          </div>
                          <button onClick={()=>getProductData(ele._id,ele.title,ele.price)} className='btn btn-primary flex-end ' >add to <i className="fa-solid fa-cart-shopping "></i></button>
                        </div>
                      </div>
                    </div>
                })
              :<div className='position-relative w-100 text-center'><i className='fas fa-spinner fa-spin fa-4x '></i></div>}
              
            </div>
          </div>
        </div>
    </div>
  )
}
