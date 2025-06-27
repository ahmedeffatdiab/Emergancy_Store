import React, { useContext } from 'react'
import Joi from "joi";
import { useState } from "react";
import axios from 'axios';
import { ApiContext } from '../../Context/ApiContext';
const AddProduct = () => {
  const {showPurchaseAlert}=useContext(ApiContext);
  const [productName, setProductName] = useState("");
  const [Category, setCategory] = useState("");
  const [Product_Details, setProduct_Details] = useState("");
  const [price, setPrice] = useState("");
  const [images, setImages] = useState([]);
  const [errors, setErrors] = useState({});

  const schema = Joi.object({
  productName: Joi.string().min(3).required().messages({
    "string.empty": "Product name is required.",
    "string.min": "Product name must be at least 3 characters.",
  }),
  Category: Joi.string().required().messages({
    "string.empty": "Category is required.",
  }),
  datialOfProduct: Joi.string().required().messages({
    "string.empty": "Product details are required.",
  }),
  price: Joi.number().greater(0).required().messages({
    "number.base": "Price must be a number.",
    "number.greater": "Price must be greater than 0.",
    "any.required": "Price is required.",
  }),
});

const handleSubmit = async (e) => {
  e.preventDefault();

  const formValues = {
    productName,
    Category,
    datialOfProduct: Product_Details,
    price: Number(price),
  };

  const { error } = schema.validate(formValues, { abortEarly: false });

  if (error) {
    const validationErrors = {};
    error.details.forEach((err) => {
      validationErrors[err.path[0]] = err.message;
    });
    setErrors(validationErrors);
    return;
  }

  if (!images || images.length === 0) {
    setErrors((prev) => ({ ...prev, images: "At least one image is required." }));
    return;
  }

  setErrors({}); // Clear previous errors

  const formData = new FormData();
  formData.append("productName", productName);
  formData.append("Category", Category);
  formData.append("datialOfProduct", Product_Details);
  formData.append("price", price);
  for (let i = 0; i < images.length; i++) {
    formData.append("images", images[i]);
  }

  try {
    const res = await axios.post("https://emergancy-api-kqk9.vercel.app/add-products", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (res.status === 201 && res.data.message === "Product created") {
      setProductName("");
      setCategory("");
      setProduct_Details("");
      setPrice("");
      setImages([]);
      setErrors({});
      showPurchaseAlert("👍 Product added successfully!");
    }
  } catch (err) {
    console.error("Server error:", err);
  }
};

  return (
    <div>
      <div class="card mt-4">
            <div class="card-header">Add New Product</div>
              <div class="card-body">
                <form onSubmit={handleSubmit}>
  <div className="mb-3">
    <label className="form-label">Product Name</label>
    <input
      type="text"
      value={productName}
      onChange={(e) => setProductName(e.target.value)}
      className={`form-control ${errors.productName ? "is-invalid" : ""}`}
      placeholder="Enter name"
    />
    {errors.productName && <div className="invalid-feedback">{errors.productName}</div>}
  </div>

  <div className="mb-3">
    <label className="form-label">Category</label>
    <input
      type="text"
      value={Category}
      onChange={(e) => setCategory(e.target.value)}
      className={`form-control ${errors.Category ? "is-invalid" : ""}`}
      placeholder="Enter Category"
    />
    {errors.Category && <div className="invalid-feedback">{errors.Category}</div>}
  </div>

  <div className="mb-3">
    <label className="form-label">Product details</label>
    <input
      type="text"
      value={Product_Details}
      onChange={(e) => setProduct_Details(e.target.value)}
      className={`form-control ${errors.datialOfProduct ? "is-invalid" : ""}`}
      placeholder="Enter Product Details"
    />
    {errors.datialOfProduct && <div className="invalid-feedback">{errors.datialOfProduct}</div>}
  </div>

  <div className="mb-3">
    <label className="form-label">Price</label>
    <input
      type="number"
      value={price}
      onChange={(e) => setPrice(e.target.value)}
      className={`form-control ${errors.price ? "is-invalid" : ""}`}
      placeholder="Enter price"
    />
    {errors.price && <div className="invalid-feedback">{errors.price}</div>}
  </div>

  <div className="mb-3">
    <label className="form-label">Images</label>
    <input
      type="file"
      multiple
      accept="image/*"
      onChange={(e) => setImages(e.target.files)}
      className={`form-control ${errors.images ? "is-invalid" : ""}`}
    />
    {errors.images && <div className="invalid-feedback">{errors.images}</div>}
  </div>

  <button type="submit" className="btn btn-primary">Add Product</button>
</form>
              </div>
            </div>
      </div>
  )
}

export default AddProduct
