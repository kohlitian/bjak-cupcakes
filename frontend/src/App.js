import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import HomeScreen from './Screens/HomeScreen';

function App() {
    const [headerActive, setHeaderActive] = useState('');

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
                        <a className="brand" href="/">
                            CupCakes
                        </a>
                    </div>
                    <div>
                        <a href="/cart">Cart</a>
                        <a href="/signin">Sign In</a>
                    </div>
                </header>
                <main>
                    <Route path="/" exact component={HomeScreen} />
                </main>
                <footer className="row center">All right reserved</footer>
            </div>
        </BrowserRouter>
    );
}

export default App;
