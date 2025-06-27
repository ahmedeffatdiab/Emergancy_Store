import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Order = () => {
  const [orders, setOrders] = useState([]);
  // Fetches and sets user orders
  async function getOrders(){
     const token = localStorage.getItem("userToken");
     if(!token){
        return;
     }
    try{    
        const resData = await axios.get("https://emergancy-api-kqk9.vercel.app/getOrders", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        setOrders(resData.data.data)
    }catch(error){
        console.error("Error fetching cart:", error);
    }
  }
  // Updates order status on server
  const handleStatusChange = async (orderId, orderIndex, newStatus) => {
    try {
       await axios.put(`https://emergancy-api-kqk9.vercel.app/orders/${orderId}/status`, {
        orderIndex,
        newStatus
      });
    } catch (err) {
      alert('Error updating status');
    }
  };
  // Fetch orders whenever orders change.
  useEffect(() => {
    getOrders();
  }, [orders]);
  return (
    <div className="container mt-4">
      <h6>Admin Order Management</h6>
      <div className="table-responsive">
      <div className="table-responsive" style={{ overflowX: 'auto' }}>
          <table className="table table-bordered table-striped text-center table-dark" style={{ minWidth: '800px' }}>
            <thead className="bg-primary">
              <tr className="fs-6 fs-md-5">
                <th scope="col" className="sticky-column bg-primary">#</th>
                <th scope="col">Email</th>
                <th scope="col">Order-State</th>
                <th scope="col">Product-State</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.length > 0 ? (
                orders.map((ele, index) => (
                  <React.Fragment key={ele._id}>
                    {ele.orders.map((order) => (
                      <tr key={order._id} className="text-center align-middle table-light fs-6 fs-md-5">
                        <td className="fw-bold sticky-column bg-light">{index + 1}</td>
                        <td>
                          <Link
                            to={`/dashBoard/orders/orderDetails/${ele._id}`}
                            className="text-decoration-none text-primary fw-semibold"
                          >
                            {ele.Information.Email}
                          </Link>
                        </td>
                        <td>
                          <span
                            className={`badge rounded-pill px-3 py-2 fs-6 ${
                              order.isPaid ? 'bg-success' : 'bg-danger'
                            }`}
                          >
                            {order.isPaid ? 'Paid' : 'Not Paid'}
                          </span>
                        </td>
                        <td>
                          <span
                            className={`badge rounded-pill px-3 py-2 text-capitalize fs-6 ${
                              order.status === 'pending'
                                ? 'bg-warning text-dark'
                                : order.status === 'shipped'
                                ? 'bg-info text-white'
                                : order.status === 'delivered'
                                ? 'bg-success'
                                : 'bg-danger'
                            }`}
                          >
                            {order.status}
                          </span>
                        </td>
                        <td>
                          <select
                            className="form-select form-select-sm w-auto mx-auto shadow-sm"
                            value={order.status}
                            onChange={e =>
                              handleStatusChange(ele._id, order._id, e.target.value)
                            }
                          >
                            <option value="pending">Pending</option>
                            <option value="shipped">Shipped</option>
                            <option value="delivered">Delivered</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </React.Fragment>
                ))
              ) : (
                <tr>
                  <td colSpan="5">
                    <div className="alert alert-danger text-center m-0 py-3 fs-6">
                      You have not bought any products yet.
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
    </div>

</div>

    </div>
  );
};
export default Order;