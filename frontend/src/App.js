import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import { signOut } from './actions/userActions';
import CartScreen from './Screens/CartScreen';
import HomeScreen from './Screens/HomeScreen';
import OrderScreen from './Screens/OrderScreen';
import PaymentMethodScreen from './Screens/PaymentMethodScreen';
import PlaceOrderScreen from './Screens/PlaceOrderScreen';
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
                        <Link to="/cart">
                            Cart{' '}
                            {cartItems.length > 0 && (
                                <span className="badge">
                                    {cartItems.length}
                                </span>
                            )}
                        </Link>
                        {userInfo ? (
                            <div className="dropdown">
                                <Link to="#">
                                    {userInfo.name}{' '}
                                    <i className="fa fa-caret-down"></i>
                                </Link>
                                <ul
                                    className={`dropdown-content ${headerActive}`}
                                >
                                    <Link
                                        to="#signout"
                                        onClick={signoutHandler}
                                    >
                                        Sign Out
                                    </Link>
                                </ul>
                            </div>
                        ) : (
                            <Link to="/signin">Sign In</Link>
                        )}
                    </div>
                </header>
                <main>
                    <Route path="/" exact component={HomeScreen} />
                    <Route path="/cart/:id?" component={CartScreen} />
                    <Route path="/signin" component={SigninScreen} />
                    <Route path="/register" component={RegisterScreen} />
                    <Route path="/shipping" component={ShippingAddressScreen} />
                    <Route path="/payment" component={PaymentMethodScreen} />
                    <Route path="/placeorder" component={PlaceOrderScreen} />
                    <Route path="/order/:id" component={OrderScreen} />
                </main>
                <footer className="row center">All right reserved</footer>
            </div>
        </BrowserRouter>
    );
}

export default App;
