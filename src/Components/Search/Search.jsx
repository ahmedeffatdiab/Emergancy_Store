import React, { useContext, useEffect, useState } from 'react'
import { ApiContext } from '../../Context/ApiContext';
import { Link } from 'react-router-dom';
export default function Search() {
  const {SearchDataApi}=useContext(ApiContext)
  // let searchAPi=SearchDataApi.data.data;
const searchResults = Array.isArray(SearchDataApi) ? SearchDataApi : [];
  return (
    <div>
        <div className="container">
          <div className='row my-3 '>
              {/* {searchAPi.length>=1?searchAPi.map((ele,index)=>{
                    return  <div key={index} className="col-md-3 col-sm-12 my-2">
                    <div className="card" >
                      <img  src={ele.imageUrls[0]} style={{"height":"250px"}} className="card-img-top" alt="..."/>
                        <div className="card-body">
                            <Link to={`/cardItem/${ele._id}`}>
                            <h5 className="card-title">{ele.title}</h5>
                            </Link>
                            <p className="card-text">{ele.category}</p>
                            <div className="price-box">
                                            {ele.discount?(<div className='mb-1'>
                                            <span className="price me-2">${Math.ceil(ele.price-(ele.price*ele.price/100))}</span>
                                            <span><del>${ele.price}</del></span>
                                            </div>)
                                            :<div className='mb-1'><span className="price">${ele.price}</span></div>
                                            }
                                        </div>
                            <a href="#" className="btn btn-primary">add to <i className="fa-solid fa-cart-shopping"></i></a>
                        </div>
                      </div>
                    </div>
                })
              :<div className='w-100 position-relative'>
                  <div className='position-absolute w-100 top-50 left-50 text-center'><i className="fa-solid fa-triangle-exclamation fa-3x" style={{color:'yellow'}}></i>
                    <p>No Found Result ..</p>
                  </div>
              </div>
              }  */}
{searchResults.length >= 1 ? (
      searchResults.map((ele, index) => (
        <div key={index} className="col-md-3 col-sm-12 my-2">
          <div className="card">
            <img
              src={ele.imageUrls?.[0]}
              style={{ height: "200px",width:"200px" }}
              className="card-img-top mx-auto mt-2"
              alt="product"
            />
            <div className="card-body">
              <Link to={`/cardItem/${ele._id}`}>
                <h5 className="card-title">{ele.title}</h5>
              </Link>
              <p className="card-text">{ele.category}</p>
              <div className="price-box mb-1">
                {ele.discount ? (
                  <>
                    <span className="price me-2">
                      ${Math.ceil(ele.price - (ele.price * ele.discount) / 100)}
                    </span>
                    <span>
                      <del>${ele.price}</del>
                    </span>
                  </>
                ) : (
                  <span className="price">${ele.price}</span>
                )}
              </div>
              <a href="#" className="btn btn-primary">
                Add to <i className="fa-solid fa-cart-shopping"></i>
              </a>
            </div>
          </div>
        </div>
      ))
    ) : (
      <div className="w-100 position-relative">
        <div className="position-absolute w-100 top-50 left-50 text-center">
          <i
            className="fa-solid fa-triangle-exclamation fa-3x"
            style={{ color: "yellow" }}
          ></i>
          <p>No results found.</p>
        </div>
      </div>
    )}
            </div>
        </div>
    </div>
  )
}

