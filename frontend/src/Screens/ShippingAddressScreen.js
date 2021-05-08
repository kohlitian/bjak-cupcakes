import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveShippingAddress } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps';

export default function ShippingAddressScreen(props) {
    const userSignin = useSelector((state) => state.userSignin);
    const cart = useSelector((state) => state.cart);
    const { userInfo } = userSignin;
    if (!userInfo) {
        props.history.push('/signin');
    }

    const [fullName, setFullName] = useState(
        userInfo?.fullName
            ? userInfo.fullName
            : cart.shippingAddress?.fullName
            ? cart.shippingAddress.fullName
            : ''
    );
    const [address, setAddress] = useState(
        userInfo?.address
            ? userInfo.address
            : cart.shippingAddress.address
            ? cart.shippingAddress.address
            : ''
    );
    const [city, setCity] = useState(
        userInfo?.city
            ? userInfo.city
            : cart.shippingAddress.city
            ? cart.shippingAddress.city
            : ''
    );
    const [postalCode, setPostalCode] = useState(
        userInfo?.postalCode
            ? userInfo.postalCode
            : cart.shippingAddress.postalCode
            ? cart.shippingAddress.postalCode
            : ''
    );
    const [country, setCountry] = useState(
        userInfo?.country
            ? userInfo.country
            : cart.shippingAddress.country
            ? cart.shippingAddress.country
            : ''
    );
    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(
            saveShippingAddress({
                fullName,
                address,
                city,
                postalCode,
                country,
            })
        );
        props.history.push('/payment');
    };

    return (
        <div>
            <CheckoutSteps step1 step2 />
            <form
                onSubmit={submitHandler}
                className="form card card-body"
                style={{ marginTop: '2rem' }}
            >
                <div>
                    <h1>Shipping Address</h1>
                </div>
                <div>
                    <label htmlFor="fullName">Full Name</label>
                    <input
                        type="text"
                        id="fullName"
                        placeholder="Enter Full Name"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="address">Address</label>
                    <input
                        type="text"
                        id="address"
                        placeholder="Enter Address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="city">City</label>
                    <input
                        type="text"
                        id="city"
                        placeholder="Enter City"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="postalCode">Postal Code</label>
                    <input
                        type="text"
                        id="pastalCode"
                        placeholder="Enter Postal Code"
                        value={postalCode}
                        onChange={(e) => setPostalCode(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="country">Country</label>
                    <input
                        type="text"
                        id="country"
                        placeholder="Enter Country"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label />
                    <button className="primary" type="submit">
                        Continue
                    </button>
                </div>
            </form>
        </div>
    );
}
