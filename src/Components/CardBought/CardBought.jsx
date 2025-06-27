import { useContext, useEffect, useState } from 'react';
import { ApiContext } from '../../Context/ApiContext';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function CardBought() {
  const { cart, getUserCart } = useContext(ApiContext);
  const [modifiedItems, setModifiedItems] = useState({});
  const [updatedQuantities, setUpdatedQuantities] = useState({});
  const navigate = useNavigate();

  // Redirect to login if token is missing
  useEffect(() => {
    const userToken = localStorage.getItem('userToken');
    if (!userToken) {
      navigate('/login');
    }
  }, [navigate]);

  // Increase quantity
  function IncreseQuantity(productId, currentQuantity) {
    setUpdatedQuantities(prev => ({
      ...prev,
      [productId]: (prev[productId] ?? currentQuantity) + 1
    }));
    setModifiedItems(prev => ({
      ...prev,
      [productId]: true
    }));
  }

  // Decrease quantity
  function decreseQuantity(productId, currentQuantity) {
    if (currentQuantity <= 1) return;
    setUpdatedQuantities(prev => ({
      ...prev,
      [productId]: (prev[productId] ?? currentQuantity) - 1
    }));
    setModifiedItems(prev => ({
      ...prev,
      [productId]: true
    }));
  }

  // Save product changes
  async function saveProductChange(productId, quantity) {
    try {
      const res = await axios.get(`https://emergancy-api-kqk9.vercel.app/saveProductChange/${productId}/${quantity}`, {
        headers: {

          token: `Bearer ${localStorage.getItem('userToken')}`
        }
      });
      console.log(res)
      if (res.data.message === 'Product quantity updated successfully') {
        await getUserCart();
      }
    } catch (error) {
      console.error('Failed to save product changes:', error);
    }
  }

  // Delete product from cart
  async function deleteOrder(productId) {
    try {
      const res = await axios.get(`https://emergancy-api-kqk9.vercel.app/deleteProductfromCart/${productId}`, {
        headers: {
          token: `Bearer ${localStorage.getItem('userToken')}`
        }
      });
      if (
        res.data.message === "Product removed successfully") {
        await getUserCart();
      }
    } catch (error) {
      console.error('Failed to delete product:', error);
    }
  }

  return (
    <div className="container mt-3">
      <h5 className='mt-3 text-decoration-underline'>Products Bought</h5>
      {cart?.selectedProduct?.length > 0 ? (
        <>
          <table className="table align-middle text-nowrap">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {cart.selectedProduct.map((ele, index) => {
                const productId = ele.id; 
                const quantity = updatedQuantities[productId] ?? ele.quantity;

                return (
                  <tr key={productId}>
                    <th scope="row">{index + 1}</th>
                    <td>{ele.name}</td>
                    <td>${ele.price}</td>
                    <td>
                      <div className="d-flex align-items-center flex-wrap gap-2">
                        <button
                          className="btn btn-sm btn-primary"
                          disabled={quantity <= 1}
                          onClick={() => decreseQuantity(productId, quantity)}
                        >
                          -
                        </button>
                        <span className="mx-2">{quantity}</span>
                        <button
                          className="btn btn-sm btn-info"
                          onClick={() => IncreseQuantity(productId, quantity)}
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td>
                      <div className="d-flex flex-wrap gap-2">
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => deleteOrder(productId)}
                        >
                          delete
                        </button>
                        <button
                          className="btn btn-sm btn-success"
                          onClick={() => saveProductChange(productId, quantity)}
                          disabled={
                            !modifiedItems[productId] || quantity === ele.quantity
                          }
                        >
                          save
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <div className="text-center mt-3">
            <Link to="/checkout" className="btn btn-dark">
              CheckOut ${cart.totalPrice}
            </Link>
          </div>
        </>
      ) : (
        <div className="alert alert-danger">You have not bought any products yet</div>
      )}
    </div>
  );
}
