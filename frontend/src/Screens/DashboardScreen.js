import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { summaryOrder } from '../actions/orderActions';
import Chart from 'react-google-charts';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function DashboardScreen() {
    const orderSummary = useSelector((state) => state.orderSummary);
    const { loading, summary, error } = orderSummary;
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(summaryOrder());
    }, [dispatch]);

    return (
        <div style={{ marginBottom: '2rem' }}>
            <div className="row">
                <h1>Dashboard</h1>
            </div>
            {loading ? (
                <LoadingBox></LoadingBox>
            ) : error ? (
                <MessageBox variant="danger">{error}</MessageBox>
            ) : (
                <>
                    <ul className="row summary">
                        <li className="card">
                            <div className="summary-title color1">
                                <span>
                                    <i className="fa fa-user"></i>Users
                                </span>
                            </div>
                            <div className="summary-body">
                                {summary.users[0].numUsers}
                            </div>
                        </li>
                        <li className="card">
                            <div className="summary-title color2">
                                <span>
                                    <i className="fa fa-shopping-cart"></i>
                                    Orders
                                </span>
                            </div>
                            <div className="summary-body">
                                {summary.orders[0]
                                    ? summary.orders[0].numOrders
                                    : 0}
                            </div>
                        </li>
                        <li className="card">
                            <div className="summary-title color3">
                                <span>
                                    <i className="fa fa-money"></i>Sales
                                </span>
                            </div>
                            <div className="summary-body">
                                {summary.orders[0]
                                    ? summary.orders[0].totalSales.toFixed(2)
                                    : 0}
                            </div>
                        </li>
                    </ul>
                    <div>
                        <div>
                            <h2>Sales</h2>
                            {summary.dailyOrders.length === 0 ? (
                                <MessageBox>No Sales</MessageBox>
                            ) : (
                                <Chart
                                    width="100%"
                                    height="400px"
                                    chartType="AreaChart"
                                    loader={<div>Loading Cart</div>}
                                    data={[
                                        ['Date', 'Sales'],
                                        ...summary.dailyOrders.map((x) => [
                                            x._id,
                                            x.sales,
                                        ]),
                                    ]}
                                />
                            )}
                        </div>
                    </div>
                    <div>
                        <h2>Categories</h2>
                        {summary.productCategories.length === 0 ? (
                            <MessageBox>No Category</MessageBox>
                        ) : (
                            <Chart
                                width="100%"
                                height="400px"
                                chartType="PieChart"
                                loader={<div>Loading Cart</div>}
                                data={[
                                    ['Category', 'Products'],
                                    ...summary.productCategories.map((x) => [
                                        x._id,
                                        x.count,
                                    ]),
                                ]}
                            />
                        )}
                    </div>
                </>
            )}
        </div>
    );
}
