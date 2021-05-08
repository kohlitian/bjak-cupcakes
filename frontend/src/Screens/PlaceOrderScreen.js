import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createOrder } from '../actions/orderActions';
import CheckoutSteps from '../components/CheckoutSteps';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { ORDER_CREATE_RESET } from '../constants/orderConstants';

export default function PlaceOrderScreen(props) {
    const cart = useSelector((state) => state.cart);
    if (!cart.paymentMethod) {
        props.history.push('/payment');
    }
    const orderCreate = useSelector((state) => state.orderCreate);
    const { success, loading, order, error } = orderCreate;
    const toPrice = (num) => Number(num.toFixed(2));
    cart.itemsPrice = toPrice(
        cart.cartItems.reduce((a, c) => a + c.qty * c.price, 0)
    );
    cart.shippingPrice = cart.itemsPrice > 100 ? toPrice(0) : toPrice(10);
    cart.taxPrice = toPrice(0.1 * cart.itemsPrice);
    cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;

    const dispatch = useDispatch();
    const placeOrderHandler = (e) => {
        e.preventDefault();
        dispatch(createOrder({ ...cart, orderItems: cart.cartItems }));
    };

    useEffect(() => {
        if (success) {
            props.history.push(`/order/${order._id}`);
            dispatch({ type: ORDER_CREATE_RESET });
        }
    }, [dispatch, order, props.history, success]);
    return (
        <div>
            <CheckoutSteps step1 step2 step3 step4 />
            <div className="row top">
                <div className="col-2">
                    <ul>
                        <li>
                            <div className="card card-body">
                                <h2>Shipping</h2>
                                <p>
                                    <strong>Name: </strong>{' '}
                                    {cart.shippingAddress.fullName} <br />
                                    <strong>Address: </strong>{' '}
                                    {cart.shippingAddress.address},
                                    {cart.shippingAddress.city},{' '}
                                    {cart.shippingAddress.postalCode},{' '}
                                    {cart.shippingAddress.country}
                                </p>
                            </div>
                        </li>

                        <li>
                            <div className="card card-body">
                                <h2>Order Items</h2>
                                <ul>
                                    {cart.cartItems.map((item) => (
                                        <li key={item.product}>
                                            <div className="row">
                                                <div>
                                                    <img
                                                        src={item.image}
                                                        alt={item.name}
                                                        className="small"
                                                    />
                                                </div>

                                                <div className="min-30">
                                                    {item.name}
                                                </div>

                                                <div>
                                                    {' '}
                                                    {item.qty} x {item.price} =
                                                    RM
                                                    {item.qty * item.price}
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </li>
                    </ul>
                </div>
                <div className="col-1">
                    <div className="card">
                        <div className="card-body">
                            <h2>Payment</h2>
                            <p>
                                <strong>Method: </strong> {cart.paymentMethod}
                            </p>
                        </div>
                    </div>
                    <div className="card ">
                        <div className="card-body">
                            <ul>
                                <li>
                                    <h2>Order Summary</h2>
                                </li>
                                <li>
                                    <div className="row">
                                        <div>Items</div>
                                        <div>
                                            RM {cart.itemsPrice.toFixed(2)}
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div>Shipping</div>
                                        <div>
                                            RM {cart.shippingPrice.toFixed(2)}
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div>Tax</div>
                                        <div>RM {cart.taxPrice.toFixed(2)}</div>
                                    </div>
                                    <div className="row">
                                        <div>
                                            <strong>Order Total</strong>
                                        </div>
                                        <div>
                                            <strong>
                                                RM {cart.totalPrice.toFixed(2)}
                                            </strong>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        {loading && <LoadingBox></LoadingBox>}
                        {error && (
                            <MessageBox variant="danger">{error}</MessageBox>
                        )}
                        <button
                            type="button"
                            onClick={placeOrderHandler}
                            className="primary block"
                            disabled={cart.cartItems.length === 0}
                        >
                            Place Order
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
