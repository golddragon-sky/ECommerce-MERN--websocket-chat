import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams, useLocation } from 'react-router-dom';
import { addToCart, removeFromCart } from '../actions/cartActions';
import MessageBox from '../components/MessageBox';

export default function CartScreen(props) {
  const navigate = useNavigate();
  const params = useParams();
  const { id: productId } = params;

  const { search } = useLocation();
  const qtyInUrl = new URLSearchParams(search).get('qty');
  const qty = qtyInUrl ? Number(qtyInUrl) : 1;

  const cart = useSelector((state) => state.cart);
  const { cartItems, error } = cart;
  const dispatch = useDispatch();
  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const removeFromCartHandler = (id) => {
    // delete action
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate('/signin?redirect=/shipping');
  };
  return (
    <div className="row top">
      <div className="col-2 ">
        <h1 className='product-rating'>Shopping Cart</h1>
        {error && <MessageBox variant="danger">{error}</MessageBox>}
        {cartItems.length === 0 ? (
          <MessageBox>
            Cart is empty. <Link to="/">Go Shopping</Link>
          </MessageBox>
        ) : (
          <ul>
                <table className="table">
                    <thead>
                      <tr>
                        <th>No</th>
                        <th>IMG</th>
                        <th>Seller</th>
                        <th>NAME</th>                        
                        <th>QTY</th>
                        <th>Price</th>
                        <th>ACTIONS</th>
                      </tr>
                    </thead>
                    <tbody>
                      {                        
                        cartItems.map((item,i)=>(
                          <tr key={item.product}>
                            <td>{i+1}</td>
                              <td>
                                <img
                                  src={item.image}
                                  alt={item.name}
                                  className="small"
                                />
                              </td>
                              <td>
                                <Link to={`/seller/${item.seller._id}`}>
                                  {item.seller.seller.name}
                                </Link> 
                              </td>
                              <td>
                                <div className="min-30">
                                  <Link to={`/product/${item.product}`}>{item.name}</Link>
                                </div>
                              </td>
                              
                              <td>
                                <div>
                                  <select
                                    className='select-width'
                                    value={item.qty}
                                    onChange={(e) =>
                                      dispatch(
                                        addToCart(item.product, Number(e.target.value))
                                      )
                                    }
                                  >
                                    {[...Array(item.countInStock).keys()].map((x) => (
                                      <option key={x + 1} value={x + 1}>
                                        {x + 1}
                                      </option>
                                    ))}
                                  </select>
                                </div>
                              </td>
                              <td>
                                  <div>${item.price}</div>
                              </td>
                              <td>
                                <div>
                                  <button
                                    type="button"
                                    onClick={() => removeFromCartHandler(item.product)}
                                  >
                                    Delete
                                  </button>
                                </div>
                              </td>
                          </tr>
                        ))
                      }
                    </tbody>
                  </table>           
          </ul>
        )}
      </div>
      <div className="col-1">
        <div className="card card-body cart-card">
          <ul>
            <li>
              <h2 className='font-24'>
                Subtotal ({cartItems.reduce((a, c) => a + c.qty, 0)} items) : $
                {cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
              </h2>
            </li>
            <li>
              <button
                type="button"
                onClick={checkoutHandler}
                className="primary block font-24"
                disabled={cartItems.length === 0}
              >
                Proceed to Checkout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
