import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import StarRating from '../StarRating/StarRating';
export default function CardList() {
    const [dataApi2,setDataApi2]=useState([])
    const params=useParams()
    // Fetches filtered data by query
    async function filterByQuery(query){
        let res=await axios.get(`https://emergancy-api-zdep.vercel.app/getDataByQuery/${query}`)
        setDataApi2(res.data.data);
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
                        <img src={ele.imageUrls[0]} style={{ height: "220px" }} className="card-img-top" alt="product" />
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

                        <a href="#" className="btn btn-primary">
                            Add to <i className="fa-solid fa-cart-shopping"></i>
                        </a>
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
