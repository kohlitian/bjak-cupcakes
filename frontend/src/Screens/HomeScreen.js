import React, { useEffect } from 'react';
import Product from '../components/Product';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';
import { PRODUCT_DELETE_RESET } from '../constants/productConstants';

export default function HomeScreen() {
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;
    const productList = useSelector((state) => state.productList);
    const { products, loading, error } = productList;
    const productDelete = useSelector((state) => state.productDelete);
    const {
        loading: loadingDelete,
        error: errorDelete,
        success: successDelete,
    } = productDelete;

    const dispatch = useDispatch();

    useEffect(() => {
        if (successDelete) {
            dispatch({ type: PRODUCT_DELETE_RESET });
        }
        dispatch(listProducts());
    }, [dispatch, successDelete]);

    return (
        <div>
            {loadingDelete && <LoadingBox></LoadingBox>}
            {errorDelete && (
                <MessageBox variant="danger">{errorDelete}</MessageBox>
            )}
            {loading ? (
                <LoadingBox></LoadingBox>
            ) : error ? (
                <MessageBox variant="danger">{error}</MessageBox>
            ) : (
                <div className="row center">
                    {products.map((product) => (
                        <Product
                            key={product._id}
                            product={product}
                            isAdmin={userInfo ? userInfo.isAdmin : false}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
