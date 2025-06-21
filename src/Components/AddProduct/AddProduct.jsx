import axios from 'axios';
import React, { useContext, useState } from 'react';
import { ApiContext } from '../../Context/ApiContext';
const AddProduct = () => {
  const {showPurchaseAlert}=useContext(ApiContext);
  const [productName, setProductName] = useState('');
  const [Category, setCategory] = useState('');
  const [Product_Details, setProduct_Details] = useState('');
  const [price, setPrice] = useState('');
  const [images, setImages] = useState([]);
  // Submits new product with images
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('productName', productName);
    formData.append('Category', Category);
    formData.append('datialOfProduct', Product_Details);
    formData.append('price', price);
    for (let i = 0; i < images.length; i++) {
      formData.append('images', images[i]);
    }
    try {
      console.log(formData)
      const res = await axios.post('https://emergancy-api-zdep.vercel.app//add-products', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(res)
      // alert('Product added successfully');
      showPurchaseAlert("Product added successfully")
    } catch (err) {
      alert('Upload failed');
      console.error(err);
    }
  };
  return (
    <div>
         <div class="card mt-4">
            <div class="card-header">Add New Product</div>
            <div class="card-body">
              <form onSubmit={handleSubmit}>
                <div class="mb-3">
                  <label class="form-label">Product Name</label>
                  <input type="text"value={productName} onChange={(e) => setProductName(e.target.value)} class="form-control" placeholder="Enter name" />
                </div>
                <div class="mb-3">
                  <label class="form-label">Category</label>
                  <input type="text"value={Category} onChange={(e) => setCategory(e.target.value)} class="form-control" placeholder="Enter Category" />
                </div>
                <div class="mb-3">
                  <label class="form-label">Product details</label>
                  <input type="text"value={Product_Details} onChange={(e) => setProduct_Details(e.target.value)} class="form-control" placeholder="Enter Product Details" />
                </div>
                <div class="mb-3">
                  <label class="form-label">Price</label>
                  <input type="number"value={price} onChange={(e) => setPrice(e.target.value)} class="form-control" placeholder="Enter price" />
                </div>
                <div class="mb-3">
                  <label class="form-label">Images</label>
                  <input type="file"  multiple accept="image/*" onChange={(e) => setImages(e.target.files)} class="form-control"  />
                </div>
                <button type="submit" class="btn btn-primary">Add Product</button>
              </form>
            </div>
          </div>
    </div>
  )
}

export default AddProduct

