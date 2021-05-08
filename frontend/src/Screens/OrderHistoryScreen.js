import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { listOrderMine } from '../actions/orderActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function OrderHistoryScreen(props) {
    const orderMineList = useSelector((state) => state.orderMineList);
    const { loading, error, orders } = orderMineList;
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(listOrderMine());
    }, [dispatch]);
    return (
        <div>
            {loading ? (
                <LoadingBox></LoadingBox>
            ) : error ? (
                <MessageBox variant="danger">{error}</MessageBox>
            ) : orders.length === 0 ? (
                <MessageBox>
                    {' '}
                    You dont hve any Order in Pending.{' '}
                    <Link to="/"> View All our Product Here. </Link>
                </MessageBox>
            ) : (
                orders.map((order) => (
                    <div className="row top">
                        <div className="col-2">
                            <div className="card ">
                                <div
                                    className="card-body"
                                    style={{ padding: '3rem 3rem 0 3rem' }}
                                >
                                    <h1>{order._id}</h1>

                                    <ul>
                                        <li key={order._id}>
                                            {order.orderItems.map((item) => (
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
                                            ))}
                                        </li>
                                    </ul>
                                </div>
                                <div
                                    style={{
                                        marginTop: '2rem',
                                        textAlign: 'center',
                                    }}
                                >
                                    {!order.isPaid ? (
                                        <button
                                            style={{ width: '100%' }}
                                            onClick={() =>
                                                props.history.push(
                                                    `/order/${order._id}`
                                                )
                                            }
                                        >
                                            Pay
                                        </button>
                                    ) : order.isPaid && !order.isDelivered ? (
                                        <MessageBox>On The Way</MessageBox>
                                    ) : (
                                        <MessageBox>Delivered</MessageBox>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}
