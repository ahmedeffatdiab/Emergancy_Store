import React, { useContext, useEffect, useState } from 'react'
import { ApiContext } from '../../Context/ApiContext'
import { Link } from 'react-router-dom';
import StarRating from '../StarRating/StarRating';
import axios from 'axios';
export default function CardsLoves() {
    let {userLoveObj}=useContext(ApiContext);
    const [lovedProducts, setLovedProducts] = useState([]);
    async function fetchLovedProducts() {
        const token =localStorage.getItem("userToken")
        if(!token) return;
      if (!Array.isArray(userLoveObj) || userLoveObj.length === 0) return;
      try {
        const res = await axios.post("https://emergancy-api-kqk9.vercel.app/loved-products", {
          productIds: userLoveObj
        },{
            headers: {
                token: `Bearer ${token}`,
                'Content-Type': 'application/json'
      }
        });
        console.log(res)
        setLovedProducts(res.data.data || []);
      } catch (err) {
        console.error("Error fetching loved products:", err);
      }
    }
    useEffect(() => {
        fetchLovedProducts();
        console.log(lovedProducts)
  }, [userLoveObj]);
  return (
    <div>
        <div className="container">
            <h5 className='mt-3 text-decoration-underline'>Loved Products</h5>
      <div className="my-4">
        <div className="row">
          {lovedProducts.length > 0 ? lovedProducts.map((ele, index) => (
            <div className="col-md-3 col-sm-12 my-4" key={ele._id}>
              <div className="card mx-2 border-0">
                <Link to={`/cardItem/${ele._id}`}>
                  <div className='cart-image'>
                    <img src={ele.imageUrls[0]} height="300px" className="card-img-top" alt={ele.title} />
                  </div>
                </Link>
                <div className="card-body">
                    <StarRating rating={ele.rating} />
                  <h5 className="blog-category">{ele.category}</h5>
                  <p className="blog-title my-2">{ele.title}</p>
                  <div className='d-flex justify-content-between align-items-center'>
                    <p className='blog-meta my-1'>${ele.price}</p>
                    <button className='btn btn-primary'>
                      add to <i className="fa-solid fa-cart-shopping"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )) : (
            <p className="text-center">No loved products to display.</p>
          )}
        </div>
      </div>
    </div>
    </div>
  )
}
