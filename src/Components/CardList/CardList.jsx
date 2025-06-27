import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import StarRating from '../StarRating/StarRating';
import { ApiContext } from '../../Context/ApiContext';

export default function CardList() {
    const [dataApi2,setDataApi2]=useState([])
    const {addtoCart,showPurchaseAlert}=useContext(ApiContext);
    const navigate=useNavigate();
    const params=useParams()
    // Fetches filtered data by query
    async function filterByQuery(query){
        let res=await axios.get(`https://emergancy-api-kqk9.vercel.app/getDataByQuery/${query}`)
        setDataApi2(res.data.data);
    }

     async function getProductData(id,title,price){
    let response= await addtoCart(id,title,price)
    console.log(response);
    if(response){
      console.log(response);
      showPurchaseAlert("👍 You Add Product successfully !")
    }else{
      navigate("/login")
    }
  }
    // Truncates text with ellipsis.
    function truncateText(text) {
        if (text.length <= 15) {
            return text;
        } else {
            return text.substring(0, 15) + "...";
        }
    }
    // Fetch data on component mount
    useEffect(()=>{
        filterByQuery(params.query)
    },[])
  return (
    <div>
        <div className="container">
            <div className="row my-3 g-3">
                {dataApi2.length >= 1 ? (
                dataApi2.map((ele, index) => (
                    <div key={index} className="col-md-3 col-sm-12">
                    <div className="card">
                        {ele?.imageUrls[0] ? (
                        <img src={ele.imageUrls[0]} style={{ height: "200px",width:"200px" }} className="card-img-top mx-auto mt-2 " alt="product" />
                        ) : (
                        <i className="fa-solid fa-spinner fa-spin"></i>
                        )}

                        <div className="card-body">
                        <Link to={`/cardItem/${ele._id}`}>
                            <h5 className="card-title">{truncateText(ele.title)}</h5>
                        </Link>

                        <StarRating rating={ele.rating} />
                        <div className="card-text">{ele.category}</div>

                        <div className="price-box">
                            <div className="d-flex">
                            {ele.discount ? (
                                <>
                                <p className="price me-2 fw-bold">
                                    ${Math.ceil(ele.price - (ele.price * ele.price) / 100)}
                                </p>
                                <p>
                                    <del>${ele.price}</del>
                                </p>
                                </>
                            ) : (
                                <p className="price fw-bold">${ele.price}</p>
                            )}
                            </div>
                        </div>

                        <button onClick={()=>getProductData(ele._id,ele.title,ele.price)} className='btn btn-primary flex-end ' >add to <i className="fa-solid fa-cart-shopping "></i></button>
                        </div>
                    </div>
                    </div>
                ))
                ) : (
                <p className="text-center">No available data</p>
                )}
            </div>
</div>

    </div>
  )
}
