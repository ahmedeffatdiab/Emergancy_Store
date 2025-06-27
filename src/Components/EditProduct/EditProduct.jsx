import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ApiContext } from '../../Context/ApiContext';

const EditProduct = () => {
  const [replacedImages, setReplacedImages] = useState({});
  const { showPurchaseAlert}=useContext(ApiContext)
  const { id } = useParams();
  const [productData, setProductData] = useState({
    title: '',
    category: '',
    datialOfProduct: '',
    price: '',
    discount: '',
    imageUrls: [],
  });
  // Fetches product data on id change
  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const res = await axios.get(`https://emergancy-api-kqk9.vercel.app/getProductById/${id}`);
        setProductData(res.data.data);
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    };
    fetchProductData();
  }, [id]);
  // Updates product data on input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prev) => ({ ...prev, [name]: value }));
  };
  // Updates replaced image at index
  const handleImageChange = (e, index) => {
    const file = e.target.files[0];
    if (!file) return;
    setReplacedImages((prev) => ({
      ...prev,
      [index]: file,
    }));
  };
  // Submits updated product data
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('userToken');
    const formData = new FormData();

    // Append main fields
    formData.append('id', id);
    formData.append('title', productData.title);
    formData.append('category', productData.category);
    formData.append('datialOfProduct', productData.datialOfProduct);
    formData.append('price', productData.price);
    formData.append('discount', productData.discount);

    // Attach replaced images
    const indexes = Object.keys(replacedImages);
    indexes.forEach((index) => {
      formData.append('images', replacedImages[index]);
    });

    // Send indexes as a separate array so the backend knows where to replace
    formData.append('imageIndexes', JSON.stringify(indexes));

    try {
      const res = await axios.post(`https://emergancy-api-kqk9.vercel.app/edit-products/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          token: `Bearer ${token}`,
        },
      });
      console.log('Upload successful:', res.data);
       showPurchaseAlert("👍 Product updated successfully!")
      // alert('Product updated successfully!');  

    } catch (err) {
      console.error('Error updating product:', err);
       showPurchaseAlert("⚠️ Product updated failed!")

    }
  };
  return (
    <div className="container">
      <h3 className="card-header mb-3 text-primary">Edit Product</h3>
      <form onSubmit={handleSubmit}>
      {['title', 'category', 'datialOfProduct', 'price', 'discount'].map((field) => (
        <div className="mb-3" key={field}>
          <label className="form-label">{field}</label>
          <input type={field === 'price' || field === 'discount' ? 'number' : 'text'} name={field} value={productData[field]} onChange={handleChange} className="form-control" placeholder={`Enter ${field}`} />
        </div>
      ))}

  {/* Images Preview + Replace */}
  <div className="mb-3 d-flex flex-wrap gap-3">
    {productData?.imageUrls?.map((url, index) => (
      <div key={index}>
        <label style={{ cursor: 'pointer' }}>
          <img src={replacedImages[index] ? URL.createObjectURL(replacedImages[index]) : url} alt={`product-${index}`} style={{ width: '100px', height: '100px', objectFit: 'cover', border: '1px solid #ccc' }} />
          <input type="file" accept="image/*" style={{ display: 'none' }} onChange={(e) => handleImageChange(e, index)} />
        </label>
      </div>
    ))}
  </div>

  <button type="submit" className="btn btn-primary mt-3">Save Changes</button>
      </form>
    </div>
  );
};

export default EditProduct;
