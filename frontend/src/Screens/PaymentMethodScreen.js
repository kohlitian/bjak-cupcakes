import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { savePaymentMethod } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps';

export default function PaymentMethodScreen(props) {
    const cart = useSelector((state) => state.cart);
    const { shippingAddress } = cart;
    if (!shippingAddress.address) {
        props.history.push('/shipping');
    }
    const [paymentMethod, setPaymentMethod] = useState('PayPal');
    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(savePaymentMethod('PayPal'));
        props.history.push('/placeorder');
    };

    return (
        <div>
            <CheckoutSteps step1 step2 step3 />
            <form
                onSubmit={submitHandler}
                className="form card card-body"
                style={{ marginTop: '2rem' }}
            >
                <div>
                    <h1>Payment Method</h1>
                </div>
                <div>
                    <div>
                        <input
                            type="radio"
                            id="paypal"
                            value="PayPal"
                            name="paymentMethod"
                            required
                            checked
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        />
                        <label htmlFor="paypal">PayPal</label>
                    </div>
                    <div>
                        <input
                            type="radio"
                            id="stripe"
                            value="Stripe"
                            name="paymentMethod"
                            required
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        />
                        <label htmlFor="paypal">Stripe</label>
                    </div>
                    <div style={{ marginTop: '3rem' }}>
                        <button className="primary block" type="submit">
                            Continue
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}
