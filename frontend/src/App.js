import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import CartScreen from './Screens/CartScreen';
import HomeScreen from './Screens/HomeScreen';

function App() {
    const [headerActive, setHeaderActive] = useState('');
    const cart = useSelector((state) => state.cart);
    const { cartItems } = cart;

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
                        <Link to="/signin">Sign In</Link>
                    </div>
                </header>
                <main>
                    <Route path="/" exact component={HomeScreen} />
                    <Route path="/cart/:id?" component={CartScreen} />
                </main>
                <footer className="row center">All right reserved</footer>
            </div>
        </BrowserRouter>
    );
}

export default App;
