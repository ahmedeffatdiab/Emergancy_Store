import React, { useState,useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import {loadStripe} from '@stripe/stripe-js';
import '../../App.css';
import { ApiContext } from '../../Context/ApiContext';
import Joi from 'joi';
const CheckOut = () => {
  let {cart}=useContext(ApiContext);
  let [errorList,setErrorList]=useState([]);
  let [FormFields,setFormFields]=useState({
    First_name:'',
    Last_name:'',
    country:'',
    Address:'',
    PostCode_ZIP:'',
    Phone:'',
    Email:'',
  }) 
  // Updates form field on input
  const onChangeInput=(e)=>{
    let myFormFields={...FormFields};
    myFormFields[e.target.name]=e.target.value;
    setFormFields(myFormFields)
  }
  // Retrieves error message for field
  const getErrorForField = (fieldName) => {
  const err = errorList.find((e) => e.path[0] === fieldName);
  return err ? err.message : null;
  };
  // Validates payment form fields
  function ValidationPayment(){
    let schema=Joi.object({
      First_name:Joi.string().min(3).max(10).required(),
      Last_name:Joi.string().min(3).max(10).required(),
      Address:Joi.string().min(3).max(50).required(),
      PostCode_ZIP:Joi.number().required(),
      country: Joi.string()
      .valid('United States', 'Egypt', 'United Kingdom', 'Australia', 'India')
      .required()
      .messages({
        'any.only': 'You should select a valid country',
        'any.required': 'You should select country',
        'string.empty': 'You should select country'
      }),
      Phone:Joi.number().required(),
      Email:Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required()
    })
    return schema.validate(FormFields,{abortEarly:false})
  }
  // Validates and submits payment form
  function submitData(e){
    e.preventDefault();
    let resValidation=ValidationPayment();
    if(resValidation.error){
      let errors = {};
      resValidation.error.details.forEach((err) => {
      console.log(err)
      const fieldName = err.path[0];
      errors[fieldName] = err.message;
      console.log(errors)
    });
      console.log(resValidation.error.details)
      setErrorList(resValidation.error.details)
    }else{
      console.log("the work complete")
      makePayment();
    }

  }
  // Initiates Stripe checkout session
  const makePayment = async(e)=>{
        // e.preventDefault();
        const stripe = await loadStripe("pk_test_51NyDEZJcducF0sHDjm3bCU0FP61nwWy1Qx0cKhGsAYnpnwDk4C09e9O3owdI3vMfurPYtTCy98lfeOqXp8hIgcNg00Yqzx9dKF");
        const body = {
            products:cart.selectedProduct,
            FormFields,
            amount:cart.totalPrice,
            currancy:"USD"
        }
        const headers = {
            "Content-Type":"application/json",
            "token":`Bearer ${localStorage.getItem("userToken")}`
        }
        
        const response = await fetch("https://emergancy-api-zdep.vercel.app/postCheckout",{
            method:"POST",
            headers:headers,
            body:JSON.stringify(body)
        });
        
        console.log(response)
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const session = await response.json();

        await  stripe.redirectToCheckout({
            sessionId:session.id
        });
  }
  return (
    <div>
      <div className="container my-3">
         <h3>BILLING DETAILS</h3>
        <div className="row">
          <div>{errorList.First_name}</div>
          <div className="col-sm-12 mb-2 col-md-6">            
          <form onSubmit={submitData} >
            <div className="w-100">
              <div className="row">
                <div className="col-sm-12 col-md-6">
                  <label htmlFor="firstName">First Name</label>
                  <input
                    onChange={onChangeInput}
                    className="p-2 bg-light border-0 rounded-1 border-white"
                    type="text"
                    name="First_name"
                    id="firstName"
                    placeholder="Enter First Name"
                  />
                  {getErrorForField("First_name") && (
                    <div className="alert alert-danger alertFontSize p-1 mt-1">
                      {getErrorForField("First_name")}
                    </div>
                  )}
                </div>
                <div className="col-sm-12 col-md-6">
                  <label htmlFor="lastName">Last Name</label>
                  <input
                    onChange={onChangeInput}
                    className="p-2 bg-light border-0 rounded-1 border-white"
                    type="text"
                    name="Last_name"
                    id="lastName"
                    placeholder="Enter Last Name"
                  />
                  {getErrorForField("Last_name") && (
                    <div className="alert alert-danger alertFontSize p-1 mt-1">
                      {getErrorForField("Last_name")}
                    </div>
                  )}
                </div>
              </div>

              <div className="pt-1">
                <label htmlFor="countrySelect" className="form-label">Select Country</label>
                <select
                  onChange={onChangeInput}
                  value={FormFields.country}
                  className="form-select p-2 bg-light border-1 rounded-1 border-light"
                  id="countrySelect"
                  name="country"
                >
                  <option value="" disabled>Choose a country</option>
                  <option value="United States">United States</option>
                  <option value="Egypt">Egypt</option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="Australia">Australia</option>
                  <option value="India">India</option>
                </select>
                {getErrorForField("country") && (
                    <div className="alert alert-danger alertFontSize p-1 mt-1">
                      {getErrorForField("country")}
                    </div>
                  )}
              </div>

              <div className="col-md-12 pt-1">
                <label htmlFor="address">Address</label>
                <input
                  onChange={onChangeInput}
                  className="p-2 bg-light border-0 rounded-1 border-white"
                  type="text"
                  name="Address"
                  id="address"
                  placeholder="Enter Your Address"
                />
                  {getErrorForField("Address") && (
                    <div className="alert alert-danger alertFontSize  p-1 mt-1">
                      {getErrorForField("Address")}
                    </div>
                  )}
              </div>
              <div className="col-md-12 pt-1">
                <label htmlFor="postcode">PostCode / ZIP</label>
                <input
                  onChange={onChangeInput}
                  className="p-2 bg-light border-0 rounded-1 border-white"
                  type="number"
                  name="PostCode_ZIP"
                  id="postcode"
                  placeholder="Enter PostCode / ZIP"
                />
              </div>
                  {getErrorForField("PostCode_ZIP") && (
                    <div className="alert alert-danger alertFontSize  p-1 mt-1">
                      {getErrorForField("PostCode_ZIP")}
                    </div>
                  )}
              <div className="row pt-2">
                <div className="col-sm-12 col-md-6">
                  <label htmlFor="phone">Phone</label>
                  <input
                    onChange={onChangeInput}
                    className="p-2 bg-light border-0 rounded-1 border-white"
                    type="number"
                    name="Phone"
                    id="phone"
                    placeholder="Enter Phone Number"
                  />
                  {getErrorForField("Phone") && (
                    <div className="alert alert-danger alertFontSize  p-1 mt-1">
                      {getErrorForField("Phone")}
                    </div>
                  )}
                </div>
                
                <div className="col-sm-12 col-md-6">
                  <label htmlFor="email">Email Address</label>
                  <input
                    onChange={onChangeInput}
                    className="p-2 bg-light border-0 rounded-1 border-white"
                    type="email"
                    name="Email"
                    id="email"
                    placeholder="Enter Email"
                  />
                  {getErrorForField("Email") && (
                    <div className="alert alert-danger alertFontSize  p-1 mt-1">
                      {getErrorForField("Email")}
                    </div>
                  )}
                </div>
              </div>
                  
              <div className="pt-4">
                <button className="btn btn-success" type="submit">
                  Checkout ${cart.totalPrice}
                </button>
              </div>
            </div>
          </form>

          </div>
         <div className=" col-sm-12  col-md-6  ">
         <div className="border border-primary border-2 rounded-2">
        <div className="p-2 ">
         <h4>YOUR ORDER</h4>
           <hr></hr>
          </div>
          <div>
        <table className="table   text-center">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Product Name</th>
                <th scope="col">Price</th>
              </tr>
            </thead>
            <tbody >
              {cart?.selectedProduct?.length >= 1 ? (
                  <>
                    {cart.selectedProduct.map((ele, index) => (
                      <tr key={index} >
                        <th scope="row">{index + 1}</th>
                        <td>{ele.name}</td>
                        <td>${ele.price}</td>
                                                
                       </tr>
                   ))}
                  
                <tr>
                     <td colSpan="5" className="text-center">
                     
                      </td>
                  </tr>
                 </>
              ) : (
               <tr>
                 <td colSpan="5">
                   <div className="alert alert-danger">
                     You have not bought any products yet
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
             </table>
            
          </div>
           </div>
        </div>
         </div>
      </div>
    </div>
  )
}

export default CheckOut





