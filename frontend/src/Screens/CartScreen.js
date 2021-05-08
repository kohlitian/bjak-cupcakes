import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart, removeFromCart } from '../actions/cartActions';
import MessageBox from '../components/MessageBox';

export default function CartScreen(props) {
    const productId = props.match.params.id;
    const cart = useSelector((state) => state.cart);
    const { cartItems } = cart;

    const dispatch = useDispatch();

    useEffect(() => {
        if (productId) {
            dispatch(addToCart(productId, 1));
        }
    }, [dispatch, productId]);

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id));
    };

    const checkoutHandler = () => {
        props.history.push('/signin?redirect=shipping');
    };

    return (
        <div className="row top">
            <div className="col-2">
                <div className="card card-body" style={{ padding: '2rem' }}>
                    <h1>Shopping Cart</h1>
                    {cartItems.length === 0 ? (
                        <MessageBox>
                            {' '}
                            Cart is Empty.{' '}
                            <Link to="/"> View All our Product Here. </Link>
                        </MessageBox>
                    ) : (
                        <ul>
                            {cartItems.map((item) => (
                                <li key={item.product}>
                                    <div className="row">
                                        <div>
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="small"
                                            />
                                        </div>
                                        <div className="min-20">
                                            {item.name}
                                        </div>
                                        <div>
                                            <select
                                                style={{ width: '6rem' }}
                                                value={item.qty}
                                                onChange={(e) =>
                                                    dispatch(
                                                        addToCart(
                                                            item.product,
                                                            Number(
                                                                e.target.value
                                                            )
                                                        )
                                                    )
                                                }
                                            >
                                                {[
                                                    ...Array(
                                                        item.countInStock
                                                    ).keys(),
                                                ].map((x) => (
                                                    <option
                                                        key={x + 1}
                                                        value={x + 1}
                                                    >
                                                        {x + 1}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div>RM {item.price}</div>
                                        <div>
                                            <button
                                                className="remove"
                                                type="button"
                                                onClick={() =>
                                                    removeFromCartHandler(
                                                        item.product
                                                    )
                                                }
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
            <div className="col-1 cart-left">
                <div className="card">
                    <div className="card-body">
                        <ul>
                            <li>
                                <h2>
                                    SubTotal (
                                    {cartItems.reduce((a, c) => a + c.qty, 0)}{' '}
                                    items): $
                                    {cartItems.reduce(
                                        (a, c) => a + c.price * c.qty,
                                        0
                                    )}
                                </h2>
                            </li>
                        </ul>
                    </div>
                    <button
                        style={{ margin: '0' }}
                        type="button"
                        onClick={checkoutHandler}
                        className="primary block"
                        disabled={cartItems.length === 0}
                    >
                        CheckOut
                    </button>
                </div>
            </div>
        </div>
    );
}
