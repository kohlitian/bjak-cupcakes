import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart } from '../actions/cartActions';

export default function Product(props) {
    const { product, isAdmin } = props;
    const dispatch = useDispatch();
    return (
        <div key={product._id} className="card">
            <img className="medium" src={product.image} alt={product.name} />
            <div className="card-body">
                <h2 style={{ marginTop: 0 }}>{product.name}</h2>
                <div className="row">
                    <div className="price">RM {product.price}</div>
                    <div className="countInStock">{product.countInStock}</div>
                </div>
                <div className="desc">{product.description}</div>
            </div>
            {product.countInStock > 0 && (
                <div className="card-add-button">
                    <button
                        onClick={() => dispatch(addToCart(product._id, 1))}
                        disabled={isAdmin}
                        className="card-add-cart-button"
                    >
                        <i className="fa fa-shopping-bag"></i>
                    </button>
                    <button className="card-add-buy-button">
                        {isAdmin ? (
                            <Link to={`/productupdate/${product._id}`}>
                                Edit
                            </Link>
                        ) : (
                            <Link to={`/cart/${product._id}`}>Buy Now</Link>
                        )}
                    </button>
                </div>
            )}
        </div>
    );
}
