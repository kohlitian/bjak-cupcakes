import React from 'react';

export default function Product(props) {
    const { product } = props;

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
            <div className="card-add-button">
                <button className="card-add-cart-button">
                    <i className="fa fa-shopping-bag"></i>
                </button>
                <button className="card-add-buy-button">Buy Now</button>
            </div>
        </div>
    );
}
