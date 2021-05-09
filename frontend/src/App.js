import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import { signOut } from './actions/userActions';
import AdminRoute from './components/AdminRoute';
import PrivateRoute from './components/PrivateRoute';
import CartScreen from './Screens/CartScreen';
import CreateProductScreen from './Screens/CreateProductScreen';
import HomeScreen from './Screens/HomeScreen';
import OrderHistoryScreen from './Screens/OrderHistoryScreen';
import OrderScreen from './Screens/OrderScreen';
import PaymentMethodScreen from './Screens/PaymentMethodScreen';
import PlaceOrderScreen from './Screens/PlaceOrderScreen';
import ProductEditScreen from './Screens/ProductEditScreen';
import ProductListScreen from './Screens/ProductListScreen';
import ProfileScreen from './Screens/ProfileScreen';
import RegisterScreen from './Screens/RegisterScreen';
import ShippingAddressScreen from './Screens/ShippingAddressScreen';
import SigninScreen from './Screens/SigninScreen';

function App() {
    const [headerActive, setHeaderActive] = useState('');
    const cart = useSelector((state) => state.cart);
    const { cartItems } = cart;
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;
    const dispatch = useDispatch();

    const handleScroll = () => {
        if (document.documentElement.scrollTop > 1) {
            setHeaderActive('active');
        } else {
            setHeaderActive('');
        }
    };

    useEffect(() => {
        window.onscroll = () => {
            handleScroll();
        };
    }, []);

    const signoutHandler = (e) => {
        dispatch(signOut());
    };

    return (
        <BrowserRouter>
            <div className="grid-container">
                <header className={`row ${headerActive}`}>
                    <div>
                        <Link className="brand" to="/">
                            CupCakes
                        </Link>
                    </div>
                    <div>
                        {userInfo && !userInfo.isAdmin && (
                            <Link to="/cart">
                                Cart{' '}
                                {cartItems.length > 0 && (
                                    <span className="badge">
                                        {cartItems.length}
                                    </span>
                                )}
                            </Link>
                        )}
                        {userInfo ? (
                            <div className="dropdown">
                                <Link to="#">
                                    {userInfo.name}{' '}
                                    <i className="fa fa-caret-down"></i>
                                </Link>
                                <ul className="dropdown-content">
                                    <li>
                                        <Link to="/profile">User Profile</Link>
                                    </li>
                                    <li>
                                        <Link to="/orderhistory">
                                            My Orders
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to="#signout"
                                            onClick={signoutHandler}
                                        >
                                            Sign Out
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        ) : (
                            <Link to="/signin">Sign In</Link>
                        )}
                        {userInfo && userInfo.isAdmin && (
                            <div className="dropdown">
                                <Link to="#admin">
                                    Admin <i className="fa fa-caret-down"></i>
                                </Link>
                                <ul className="dropdown-content">
                                    <li>
                                        <Link to="/dashboard">Dashboard</Link>
                                    </li>
                                    <li>
                                        <Link to="/dashboard">Users</Link>
                                    </li>
                                    <li>
                                        <Link to="/dashboard">Orders</Link>
                                    </li>
                                    <li>
                                        <Link to="/createproduct">
                                            New Product
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/">All Products</Link>
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                </header>
                <main>
                    <Route path="/" exact component={HomeScreen} />
                    <Route path="/cart/:id?" component={CartScreen} />
                    <Route path="/signin" component={SigninScreen} />
                    <Route path="/register" component={RegisterScreen} />
                    <Route path="/shipping" component={ShippingAddressScreen} />
                    <PrivateRoute
                        path="/payment"
                        component={PaymentMethodScreen}
                    />
                    <PrivateRoute
                        path="/placeorder"
                        component={PlaceOrderScreen}
                    />
                    <PrivateRoute path="/order/:id" component={OrderScreen} />
                    <PrivateRoute path="/profile" component={ProfileScreen} />
                    <PrivateRoute
                        path="/orderhistory"
                        component={OrderHistoryScreen}
                    />
                    <AdminRoute
                        path="/productlist"
                        component={ProductListScreen}
                    />
                    <AdminRoute
                        path="/product/:id/edit"
                        component={ProductEditScreen}
                    />
                    <AdminRoute
                        path="/createproduct"
                        component={CreateProductScreen}
                    />
                </main>
                <footer className="row center">All right reserved</footer>
            </div>
        </BrowserRouter>
    );
}

export default App;
