import axios from 'axios';
import React, { useEffect, useState } from 'react';
import StarRating from '../StarRating/StarRating';
import { Link } from 'react-router-dom';

const RecommendedProducts = ({ categ, title }) => {
  const [dataApi, setDataApi] = useState([]);

  useEffect(() => {
    async function getRecommended() {
      try {
        const res = await axios.get(`https://emergancy-api-kqk9.vercel.app/getDataByQuery/${categ}`);
        const currentTitle = title.trim().toLowerCase();
        const filtered = res.data.data.filter(
          (item) => item.title.trim().toLowerCase() !== currentTitle
        );
        const uniqueByTitle = filtered.filter(
          (item, index, self) =>
            index ===
            self.findIndex(
              (t) => t.title.trim().toLowerCase() === item.title.trim().toLowerCase()
            )
        );

        // Sort by rating and take top 4
        const sorted = uniqueByTitle.sort((a, b) => b.rating - a.rating).slice(0, 4);

        setDataApi(sorted);
      } catch (error) {
        console.error('Error fetching recommended products:', error);
      }
    }

    getRecommended();
  }, [categ, title]);

  const truncateText = (text) => {
    return text.length <= 15 ? text : text.substring(0, 15) + '...';
  };

  return (
    <div>
      <h6 className="text-decoration-underline">Recommended Products</h6>
      <div className="row my-3 g-3">
        {dataApi.length > 0 ? (
          dataApi.map((ele, index) => (
            <div key={index} className="col-md-3 col-sm-12">
              <div className="card">
                {ele?.imageUrls?.[0] ? (
                  <img
                    src={ele.imageUrls[0]}
                    style={{ height: '200px', width: '200px' }}
                    className="card-img-top mx-auto mt-2"
                    alt={ele.title}
                  />
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
                      {ele.discount > 0 ? (
                        <>
                          <p className="price me-2 fw-bold">
                            ${Math.ceil(ele.price - (ele.price * ele.discount) / 100)}
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

                  <button className="btn btn-primary mt-2">
                    Add to <i className="fa-solid fa-cart-shopping"></i>
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">No available data</p>
        )}
      </div>
    </div>
  );
};

export default RecommendedProducts;
