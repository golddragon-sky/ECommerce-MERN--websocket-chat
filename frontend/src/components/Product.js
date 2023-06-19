import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Rating from './Rating';

export default function Product(props) {
 
  const { product } = props;
  const navigate = useNavigate();
  const [qty, setQty] = useState(1);
  const addToCartHandler = () => {
    navigate(`/cart/${product._id}?qty=${qty}`);
  };
  return (
    <div key={product._id} className="card">
      <Link to={`/product/${product._id}`}>
        <img className="medium" src={product.image} alt={product.name} />
      </Link>
      <div className="card-body">
        <Link to={`/product/${product._id}`} >
          <h2 className='seller'>{product.name}</h2>
        </Link>
        <Rating
          rating={product.rating}
          numReviews={product.numReviews}
        ></Rating>
        <div className="row ">
          <div className="col-1 home-seller danger">${product.price}</div>
          
        </div>
        <div className='home-product'>
          <button
            onClick={addToCartHandler}
            className="primary block"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
