import Axios from 'axios';
import { PayPalButton } from 'react-paypal-button-v2';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { detailsOrder, payOrder } from '../actions/orderActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { ORDER_PAY_REST } from '../constants/orderConstants';

export default function OrderScreen(props) {
    const orderId = props.match.params.id;
    const [sdkReady, setSdkReady] = useState(false);
    const orderDetails = useSelector((state) => state.orderDetails);
    const { order, error, loading } = orderDetails;
    const orderPay = useSelector((state) => state.orderPay);
    const {
        error: errorPay,
        success: successPay,
        loading: loadingPay,
    } = orderPay;
    const dispatch = useDispatch();

    useEffect(() => {
        const addPayPalScript = async () => {
            const { data } = await Axios.get('/api/config/paypal');
            const script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = `https://www.paypal.com/sdk/js?client-id=${data}`;
            script.async = true;
            script.onload = () => {
                setSdkReady(true);
            };
            document.body.appendChild(script);
        };
        if (!order || successPay || (order && order._id !== orderId)) {
            dispatch({ type: ORDER_PAY_REST });
            dispatch(detailsOrder(orderId));
        } else {
            if (!order.isPaid) {
                if (!window.paypal) {
                    addPayPalScript();
                } else {
                    setSdkReady(true);
                }
            }
        }
    }, [dispatch, order, orderId, sdkReady, successPay]);

    const successPaymentHandler = (paymentResult) => {
        dispatch(payOrder(order, paymentResult));
    };

    return loading ? (
        <LoadingBox></LoadingBox>
    ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
    ) : (
        <div>
            <h1>Order {order._id}</h1>
            <div className="row top">
                <div className="col-2">
                    <ul>
                        <li>
                            <div className="card card-body">
                                <h2>Shipping</h2>
                                <p>
                                    <strong>Name: </strong>{' '}
                                    {order.shippingAddress.fullName} <br />
                                    <strong>Address: </strong>{' '}
                                    {order.shippingAddress.address},
                                    {order.shippingAddress.city},{' '}
                                    {order.shippingAddress.postalCode},{' '}
                                    {order.shippingAddress.country}
                                </p>
                                {order.isDelivered ? (
                                    <MessageBox variant="success">
                                        Deliveted at{' '}
                                        {order.deliveredAt.substring(0, 10)}
                                    </MessageBox>
                                ) : (
                                    <MessageBox variant="danger">
                                        Not Delivered
                                    </MessageBox>
                                )}
                            </div>
                        </li>

                        <li>
                            <div className="card card-body">
                                <h2>Order Items</h2>
                                <ul>
                                    {order.orderItems.map((item) => (
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
                                            <hr />
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </li>
                    </ul>
                </div>
                <div className="col-1">
                    <div>
                        <div className="card card-body">
                            <h2>Payment</h2>
                            <p>
                                <strong>Method: </strong> {order.paymentMethod}
                            </p>
                            {order.isPaid ? (
                                <MessageBox variant="success">
                                    Paid at {order.paidAt.substring(0, 10)}
                                </MessageBox>
                            ) : (
                                <MessageBox variant="danger">
                                    Not Paid
                                </MessageBox>
                            )}
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
                                            RM {order.itemsPrice.toFixed(2)}
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div>Shipping</div>
                                        <div>
                                            RM {order.shippingPrice.toFixed(2)}
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div>Tax</div>
                                        <div>
                                            RM {order.taxPrice.toFixed(2)}
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div>
                                            <strong>Order Total</strong>
                                        </div>
                                        <div>
                                            <strong>
                                                RM {order.totalPrice.toFixed(2)}
                                            </strong>
                                        </div>
                                    </div>
                                </li>
                                {!order.isPaid && (
                                    <li>
                                        {!sdkReady ? (
                                            <LoadingBox></LoadingBox>
                                        ) : (
                                            <>
                                                {errorPay && (
                                                    <MessageBox variant="danger">
                                                        {errorPay}
                                                    </MessageBox>
                                                )}
                                                {loadingPay && (
                                                    <LoadingBox></LoadingBox>
                                                )}
                                                <PayPalButton
                                                    amount={order.totalPrice}
                                                    onSuccess={
                                                        successPaymentHandler
                                                    }
                                                ></PayPalButton>
                                            </>
                                        )}
                                    </li>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
