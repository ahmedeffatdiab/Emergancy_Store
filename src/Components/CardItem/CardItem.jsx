import axios from 'axios';
import React, { useEffect, useRef, useState, useContext, useLayoutEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import "../../App.css";
import { ApiContext } from '../../Context/ApiContext';
import StarRating from '../StarRating/StarRating';
import RecommendedProducts from '../RecommendedProducts/RecommendedProducts';

export default function CardItem() {
  const navigate = useNavigate();
  const { addtoCart, showPurchaseAlert } = useContext(ApiContext);
  const [dataApi, setDataApi] = useState({});
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState('');
  const [message, setMessage] = useState('');
  const [productId, setProductId] = useState(null);
  const imageRef = useRef(null);
  const { id } = useParams();
  // Fetch product details by ID
  async function getProductItem(id) {
    const res = await axios.get(`https://emergancy-api-kqk9.vercel.app/getProductById/${id}`);
    setDataApi(res.data.data);
  }
  // Set selected image
  function handleImageClick(index) {
    setSelectedImageIndex(index);
  }
  // Add product to cart or redirect to login
  async function getProductData(id, title, price) {
    const response = await addtoCart(id, title, price);
    response ? showPurchaseAlert('👍 You Add Product successfully !') : navigate("/login");
  }
  // Handle star rating toggle
  const handleStarClick = (star) => {
    setRating(prev => (star === prev ? 0 : star));
  };
  // Submit review
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const resData = await axios.post(`https://emergancy-api-kqk9.vercel.app/product/${productId}/add-review`, {
        rating,
        comment,
      }, {
        headers: {
          "token": `Bearer ${localStorage.getItem("userToken")}`
        }
      });
      setDataApi(resData.data.data);
      showPurchaseAlert("👍 Review submitted");
      setRating(0);
      setComment('');
    } catch (error) {
      setMessage(error.response?.data?.message || 'Error submitting review');
    }
  };
  // Fetch product on mount
  useEffect(() => {
    getProductItem(id);
  }, [id]);
  // Scroll to top on mount (more React-friendly)
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Set product ID once data is loaded
  useEffect(() => {
    if (dataApi?._id) {
      setProductId(dataApi._id);
    }
  }, [dataApi]);

  // Image zoom handlers
  const handleMouseMove = (e) => {
    const img = imageRef.current;
    const { left, top, width, height } = img.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    img.style.transformOrigin = `${x}% ${y}%`;
    img.style.transform = "scale(2)";
  };
  //Resets the image zoom and origin when the mouse leaves the image.
  const handleMouseLeave = () => {
    const img = imageRef.current;
    img.style.transform = "scale(1)";
    img.style.transformOrigin = "center center";
  };

  return (
    <div className="container">
      {dataApi ? (
        <>
        <div className="outer-design my-5 px-2 border border-1">
          <div className="row">
            {/* Product Image Section */}
            <div className="col-md-5 col-sm-12">
              <div className="image-zoom-container">
                {dataApi.imageUrls?.[selectedImageIndex] && (
                  <img
                    ref={imageRef}
                    src={dataApi.imageUrls[selectedImageIndex]}
                    alt="Product"
                    className="zoomable-image"
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    height="600"
                  />
                )}
              </div>
            </div>

            {/* Product Info Section */}
            <div className="col-md-7 col-sm-12 my-5">
              <p className="text-primary">{dataApi.title}</p>
              <p>{dataApi.datialOfProduct}</p>
              <span className="my-2 text-secondary">{dataApi.category}</span>
              <StarRating rating={dataApi.rating} />

              <div className="d-flex w-25 align-items-center">
                {dataApi.discount ? (
                  <>
                    <h6 className="me-2 text-danger">
                      ${Math.ceil(dataApi.price - (dataApi.price * dataApi.discount / 100))}
                    </h6>
                    <del className="text-secondary ms-md-2"><h6>${dataApi.price}</h6></del>
                  </>
                ) : (
                  <p>${dataApi.price}</p>
                )}
              </div>

              {/* Thumbnail Images */}
              <div className="d-flex flex-wrap gap-2">
                {dataApi.imageUrls?.map((url, index) => (
                  <div
                    key={index}
                    onClick={() => handleImageClick(index)}
                    style={{ width: "100px", cursor: "pointer" }}
                    className="border border-1"
                  >
                    <img src={url} alt="Thumb" className="w-100" />
                  </div>
                ))}
              </div>

              {/* Add to Cart */}
              <button
                className="btn btn-primary w-25 my-2"
                onClick={() => getProductData(dataApi._id, dataApi.title, dataApi.price)}
              >
                Add to <i className="fa-solid fa-cart-shopping"></i>
              </button>

              {/* Review Form */}
              <form onSubmit={submitHandler}>
                <h3>Write a Review</h3>
                <div className="star-rating">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      className={`star ${star <= (hover || rating) ? 'filled' : ''}`}
                      onClick={() => handleStarClick(star)}
                      onMouseEnter={() => setHover(star)}
                      onMouseLeave={() => setHover(0)}
                    >
                      ★
                    </span>
                  ))}
                </div>

                <textarea
                  className="w-100 pt-2 ps-2"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  required
                  placeholder="Enter comment"
                />
                <br />

                <div className="clearfix">
                  <button className="btn btn-primary float-end" type="submit" disabled={rating === 0}>
                    Review
                  </button>
                </div>

                {message && <p>{message}</p>}
              </form>

              {/* Reviews List */}
              {dataApi.reviews?.length > 0 ? (
                dataApi.reviews.map((review, idx) => (
                  <div key={idx} className="border mt-2 px-2 pt-1">
                    <span className="h6 me-2">{review.name}</span>
                    <span className="text-warning">
                      {Array.from({ length: 5 }, (_, index) => (
                        <span key={index}>{index < review.rating ? '★' : '☆'}</span>
                      ))}
                    </span>
                    <p className="mb-1">{review.comment}</p>
                  </div>
                ))
              ) : (
                <p className="text-muted">No reviews yet.</p>
              )}
            </div>
          </div>
          
        </div>
          <div>
              <RecommendedProducts categ={dataApi.category} title={dataApi.title} />
          </div>
        </>
        
      ) : (
        <i className="fas fa-spinner m-auto fa-spin fa-4x"></i>
      )}
      
    </div>
  );
}
