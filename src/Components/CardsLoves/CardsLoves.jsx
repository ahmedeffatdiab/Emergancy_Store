import React, { useContext } from 'react'
import { ApiContext } from '../../Context/ApiContext'
import { Link } from 'react-router-dom';

export default function CardsLoves() {
    let res=useContext(ApiContext)
    let data=res.userLoveObj.data.lovedProducts;
    console.log(data);
  return (
    <div>
        <div className='container'>
            <div className='my-4'>
            <div className="row">
                {data?data.map((ele,index)=>{
                    return <div className="col-md-3 col-sm-12 my-4">
                         <div class="card mx-2 border-0 " >
                    <Link to={`/cardItem/${ele._id}`}>
                        <div className='cart-image'>
                            <img src={`https://emergancy-api-zdep.vercel.app/images/products/`+ele.image_path1} height="300px" class="card-img-top" alt="..."/>
                        </div>
                    </Link>
                      <div class="card-body">
                        <h5 class="blog-category">{ele.category}</h5>
                        <p class=" blog-title my-2">{ele.title}</p>
                        <div className='d-flex justify-content-between align-items-center   '>
                            <p className='blog-meta flex-start my-1  '>${ele.price}</p>
                            <button  className='btn btn-primary flex-end ' >add to <i class="fa-solid fa-cart-shopping "></i></button>
                        </div>
                    </div>
                    </div>
                        </div>
                })
                :<p>not available data</p>}  
                
                
            </div>
            </div>
            
        </div>
    </div>
  )
}
