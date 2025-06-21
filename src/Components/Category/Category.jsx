import React from 'react'
import { Link } from 'react-router-dom';
export default function Category() {
return (
    <div className='container'>
        <div className="category my-3">
            <div className="category-item-container has-scrollbar">
            <div className="category-item">
              <div className="category-img-box">
                <img src="https://res.cloudinary.com/dptz3ognb/image/upload/v1749601097/dress_p1hxcd.svg" alt="dress & frock" width="30"/>
              </div>
              <div className="category-content-box">
                <div className="category-content-flex">
                  <h3 className="category-item-title">Dress</h3>
                  <p className="category-item-amount">(53)</p>
                </div>
                <Link to="/cardList/Dress">
                <span  className="category-btn" >Show all</span>
                </Link>
              </div>
            </div>
            <div className="category-item">
              <div className="category-img-box">
                <img src="https://res.cloudinary.com/dptz3ognb/image/upload/v1749600985/coat_t9dxyq.svg" alt="winter wear" width="30"/>
              </div>
  
              <div className="category-content-box">
  
                <div className="category-content-flex">
                  <h3 className="category-item-title">Winter wear</h3>
  
                  <p className="category-item-amount">(58)</p>
                </div>
  
                <Link to="/cardList/Winter wear">
                <span className="category-btn" >Show all</span>
                </Link>
  
              </div>
  
            </div>

            <div className="category-item">
  
              <div className="category-img-box">
                <img src="https://res.cloudinary.com/dptz3ognb/image/upload/v1749601099/glasses_dz5bzl.svg" alt="glasses & lens" width="30"/>
              </div>
  
              <div className="category-content-box">
  
                <div className="category-content-flex">
                  <h3 className="category-item-title">Glasses & lens</h3>
  
                  <p className="category-item-amount">(68)</p>
                </div>
  
                <Link to="/cardList/Glasses">
                <span className="category-btn" >Show all</span>
                </Link>
  
              </div>
  
            </div>

            <div className="category-item">
  
              <div className="category-img-box">
                <img src="https://res.cloudinary.com/dptz3ognb/image/upload/v1749601102/shorts_foapdp.svg" alt="shorts & jeans" width="30"/>
              </div>
  
              <div className="category-content-box">
  
                <div className="category-content-flex">
                  <h3 className="category-item-title">Shorts</h3>
  
                  <p className="category-item-amount">(84)</p>
                </div>
  
                <Link to="/cardList/Shorts">
                <span className="category-btn" >Show all</span>
                </Link>
  
              </div>
  
            </div>

            <div className="category-item">
  
              <div className="category-img-box">
                <img src="https://res.cloudinary.com/dptz3ognb/image/upload/v1749601104/tee_pb3elx.svg" alt="t-shirts" width="30"/>
              </div>
  
              <div className="category-content-box">
  
                <div className="category-content-flex">
                  <h3 className="category-item-title">T-shirts</h3>
  
                  <p className="category-item-amount">(35)</p>
                </div>
  
                <Link to="/cardList/T-shirt">
                <span className="category-btn" >Show all</span>
                </Link>
  
              </div>
  
            </div>

            <div className="category-item">
  
              <div className="category-img-box">
                <img src="https://res.cloudinary.com/dptz3ognb/image/upload/v1749601099/jacket_tkja9m.svg" alt="jacket" width="30"/>
              </div>
  
              <div className="category-content-box">
  
                <div className="category-content-flex">
                  <h3 className="category-item-title">Jacket</h3>
  
                  <p className="category-item-amount">(16)</p>
                </div>
  
                <Link to="/cardList/Jacket">
                <span className="category-btn" >Show all</span>
                </Link>
  
              </div>
  
            </div>

            <div className="category-item">
  
              <div className="category-img-box">
                <img src="https://res.cloudinary.com/dptz3ognb/image/upload/v1749600989/watch_l91m91.svg" alt="watch" width="30"/>
              </div>
  
              <div className="category-content-box">
  
                <div className="category-content-flex">
                  <h3 className="category-item-title">Watch</h3>
  
                  <p className="category-item-amount">(27)</p>
                </div>
  
                <Link to="/cardList/Watch">
                <span className="category-btn" >Show all</span>
                </Link>
  
              </div>
  
            </div>

            <div className="category-item">
  
              <div className="category-img-box">
                <img src="https://res.cloudinary.com/dptz3ognb/image/upload/v1749601099/hat_fcukn3.svg" alt="hat & caps" width="30"/>
              </div>
  
              <div className="category-content-box">
  
                <div className="category-content-flex">
                  <h3 className="category-item-title">Hat & caps</h3>
  
                  <p className="category-item-amount">(39)</p>
                </div>
  
                <Link to="/cardList/Hat & caps">
                <span className="category-btn" >Show all</span>
                </Link>
  
              </div>
  
            </div>

        </div>

        </div>

    </div>
  )
}
