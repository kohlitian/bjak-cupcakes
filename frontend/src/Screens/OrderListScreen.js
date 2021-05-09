import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deliverOrder, listOrders } from '../actions/orderActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { ORDER_DELIVER_REST } from '../constants/orderConstants';

export default function OrderListScreen() {
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;
    const orderList = useSelector((state) => state.orderList);
    const { loading, error, orders } = orderList;
    const orderDeliver = useSelector((state) => state.orderDeliver);
    const {
        loading: loadingDeliver,
        error: errorDeliver,
        success: successDeliver,
    } = orderDeliver;

    const dispatch = useDispatch();

    useEffect(() => {
        if (successDeliver) {
            dispatch({ type: ORDER_DELIVER_REST });
        }
        dispatch(listOrders());
    }, [dispatch, successDeliver]);

    const deliverHandler = (orderId) => {
        dispatch(deliverOrder(orderId));
    };

    return (
        <div>
            {loading ? (
                <LoadingBox></LoadingBox>
            ) : error ? (
                <MessageBox variant="danger">{error}</MessageBox>
            ) : orders.length === 0 ? (
                <MessageBox>No Order Now.</MessageBox>
            ) : (
                orders.map((order) => (
                    <div key={order._id} className="row top">
                        <div className="col-2">
                            <div className="card ">
                                <div
                                    className="card-body"
                                    style={{
                                        padding: '3rem 3rem 0 3rem',
                                        marginBottom: '2rem',
                                    }}
                                >
                                    <h1>{order._id}</h1>

                                    <ul>
                                        {order.orderItems.map((item) => (
                                            <li key={item._id}>
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

                                                    <div>{item.qty}</div>
                                                    <div>RM {item.price}</div>
                                                    <div>
                                                        RM{' '}
                                                        {item.price * item.qty}
                                                    </div>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                    <div style={{ margin: '1rem 0' }}>
                                        <h1>Customer Information</h1>
                                        <div
                                            className="row"
                                            style={{ marginBottom: '2rem' }}
                                        >
                                            <div>
                                                <i className="fa fa-user"></i>:{' '}
                                                {order.user.name}
                                            </div>
                                            <div>
                                                <i className="fa fa-envelope"></i>
                                                : {order.user.email}
                                            </div>
                                            <div>
                                                <i className="fa fa-phone"></i>:
                                                0163333344{order.user.phone}
                                            </div>
                                        </div>
                                        <div
                                            className="row"
                                            style={{ marginBottom: '1rem' }}
                                        >
                                            <div>
                                                {order.shippingAddress.address},{' '}
                                                {order.shippingAddress.city},{' '}
                                                {
                                                    order.shippingAddress
                                                        .postalCode
                                                }
                                                ,{' '}
                                                {order.shippingAddress.country}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {loadingDeliver && <LoadingBox></LoadingBox>}
                                {errorDeliver && (
                                    <MessageBox>{errorDeliver}</MessageBox>
                                )}
                                {userInfo.isAdmin &&
                                    order.isPaid &&
                                    !order.isDelivered && (
                                        <div
                                            style={{
                                                textAlign: 'center',
                                            }}
                                        >
                                            <button
                                                style={{
                                                    width: '100%',
                                                    margin: '0',
                                                }}
                                                onClick={() =>
                                                    deliverHandler(order._id)
                                                }
                                            >
                                                Deliver Order
                                            </button>
                                        </div>
                                    )}
                            </div>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}
