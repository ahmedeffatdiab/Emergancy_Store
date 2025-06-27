import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
const OrderDetails = () => {
    const {id}=useParams();
    const navigate = useNavigate();
    const token = localStorage.getItem("userToken");
    const [orders, setOrders] = useState([]);
    //Redirect if token is missing
    if(!token){
      navigate('/login'); 
    }
    // Fetch order details by ID
    async function getOrderDetails(id){
     try{
        const resData=await axios.get(`https://emergancy-api-kqk9.vercel.app/orderDetailsNumber/${id}`,{
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
        console.log(resData)
        setOrders(resData)
     }catch(error){
        throw error;
     }
        
    }
    //Run once, fetch order details
    useEffect(()=>{
        getOrderDetails(id)
    },[])
   
  return (
    <>
       <div className="container mt-4">
      <h3 className="mb-4">Order Information</h3>
      {orders?.data?.data ? (
        <div className="container my-4">
          <div className="card shadow border-0 rounded-4">
            <div className="card-header bg-primary text-white rounded-top-4">
              <h4 className="mb-0">Order Details</h4>
            </div>

            <div className="card-body">
              <div className="mb-4">
                <h5 className="text-secondary">General Info</h5>
                <p><strong>Order ID:</strong> {orders.data.data._id}</p>
                <p><strong>User ID:</strong> {orders.data.data.userId}</p>
              </div>

              <div className="mb-4">
                <h5 className="text-secondary">Customer Information</h5>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item"><strong>Name:</strong> {orders.data.data.Information.First_name} {orders.data.data.Information.Last_name}</li>
                  <li className="list-group-item"><strong>Email:</strong> {orders.data.data.Information.Email}</li>
                  <li className="list-group-item"><strong>Phone:</strong> {orders.data.data.Information.Phone}</li>
                  <li className="list-group-item"><strong>Country:</strong> {orders.data.data.Information.country}</li>
                  <li className="list-group-item"><strong>Address:</strong> {orders.data.data.Information.Address}</li>
                  <li className="list-group-item"><strong>Postal Code:</strong> {orders.data.data.Information.PostCode_ZIP}</li>
                </ul>
              </div>

              {orders.data.data.orders.map((subOrder, idx) => (
                <div key={idx} className="mb-5">
                  <h5 className="text-secondary">Order Session #{idx + 1}</h5>
                  <div className="row">
                    <div className="col-md-6">
                      <p><strong>Session ID:</strong> {subOrder.sessionId}</p>
                      <p>
                        <strong>Status:</strong>{' '}
                        <span className={`badge px-3 py-2 text-uppercase ${
                          subOrder.status === 'pending' ? 'bg-warning text-dark' :
                          subOrder.status === 'shipped' ? 'bg-info text-white' :
                          subOrder.status === 'delivered' ? 'bg-success' :
                          'bg-danger'
                        }`}>
                          {subOrder.status}
                        </span>
                      </p>
                    </div>
                    <div className="col-md-6">
                      <p><strong>Paid:</strong> {subOrder.isPaid ? '✅ Yes' : '❌ No'}</p>
                      <p><strong>Delivered At:</strong> {subOrder.deliveredAt ? new Date(subOrder.deliveredAt).toLocaleString() : 'Not delivered yet'}</p>
                    </div>
                  </div>

                  <h6 className="mt-3 mb-2">Products</h6>
                  <div className="table-responsive">
                    <table className="table table-hover table-striped align-middle">
                      <thead className="table-light">
                        <tr>
                          <th>#</th>
                          <th>Product Name</th>
                          <th>Price</th>
                          <th>Quantity</th>
                        </tr>
                      </thead>
                      <tbody>
                        {subOrder.products.map((prod, prodIndex) => (
                          <tr key={prod.id}>
                            <td>{prodIndex + 1}</td>
                            <td>{prod.name}</td>
                            <td>${prod.price.toFixed(2)}</td>
                            <td>{prod.quantity}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center my-5 text-muted">
          <h4>No orders found</h4>
        </div>
      )}
    </div>
    </>

  )
}
export default OrderDetails
