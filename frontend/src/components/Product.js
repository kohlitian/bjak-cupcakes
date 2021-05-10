import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart } from '../actions/cartActions';
import { deleteProduct } from '../actions/productActions';

export default function Product(props) {
    const { product, isAdmin } = props;
    const dispatch = useDispatch();

    const deleteHandler = (product) => {
        if (window.confirm(`Are You Sure to Delete ${product.name} ?`)) {
            dispatch(deleteProduct(product._id));
        }
    };

    return (
        <div key={product._id} className="card" style={{ width: '280px' }}>
            <img className="medium" src={product.image} alt={product.name} />
            <div className="card-body">
                <h2 style={{ marginTop: 0 }}>{product.name}</h2>
                <div className="row">
                    <div className="price">RM {product.price}</div>
                    <div className="countInStock">{product.countInStock}</div>
                </div>
                <div style={{ overflowWrap: 'break-word' }} className="desc">
                    {product.description}
                </div>
            </div>
            <div className="card-add-button">
                {isAdmin ? (
                    <button
                        onClick={() => deleteHandler(product)}
                        className="card-add-cart-button"
                    >
                        <i className="fa fa-trash"></i>
                    </button>
                ) : product.countInStock > 0 ? (
                    <button
                        onClick={() => dispatch(addToCart(product._id, 1))}
                        className="card-add-cart-button"
                    >
                        <i className="fa fa-shopping-bag"></i>
                    </button>
                ) : (
                    <div></div>
                )}

                <button className="card-add-buy-button">
                    {isAdmin ? (
                        <Link to={`/product/${product._id}/edit`}>Edit</Link>
                    ) : product.countInStock > 0 ? (
                        <Link to={`/cart/${product._id}`}>Buy Now</Link>
                    ) : (
                        <Link to="#" className="disable-link">
                            Out of Stock
                        </Link>
                    )}
                </button>
            </div>
        </div>
    );
}
