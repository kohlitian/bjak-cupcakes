import React from 'react';

export default function Product(props) {
    const { product } = props;

    return (
        <div key={product._id} className="card">
            <img className="medium" src={product.image} alt={product.name} />
            <div className="card-body">
                <h2>{product.name}</h2>
                <div className="price">$ {product.price}</div>
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
