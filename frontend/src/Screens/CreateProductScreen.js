import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createProduct } from '../actions/productActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { PRODUCT_CREATE_RESET } from '../constants/productConstants';
import Axios from 'axios';

export default function CreateProductScreen(props) {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState('');
    const [category, setCategory] = useState('');
    const [countInStock, setCountInStock] = useState('');
    const [description, setDescription] = useState('');

    const productCreate = useSelector((state) => state.productCreate);
    const { loading, error, success } = productCreate;

    const dispatch = useDispatch();

    useEffect(() => {
        if (success) {
            dispatch({ type: PRODUCT_CREATE_RESET });
            props.history.push('/');
        }
    }, [dispatch, props.history, success]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(
            createProduct({
                name,
                image,
                category,
                countInStock,
                description,
                price,
            })
        );
    };

    const [loadingUpload, setLoadingUpload] = useState(false);
    const [errorUpload, setErrorUpload] = useState('');
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0];
        const bodyFormData = new FormData();
        bodyFormData.append('image', file);
        setLoadingUpload(true);
        try {
            const { data } = await Axios.post('/api/uploads', bodyFormData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${userInfo.token}`,
                },
            });
            setImage(data);
            setLoadingUpload(false);
        } catch (error) {
            setErrorUpload(error.message);
            setLoadingUpload(false);
        }
    };

    return (
        <div>
            <form className="form card card-body" onSubmit={submitHandler}>
                <div>
                    <h1>New Product</h1>
                </div>
                <div>
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        id="name"
                        placeholder="Enter Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="price">Price</label>
                    <input
                        type="number"
                        id="price"
                        placeholder="Enter Price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="image">Image</label>
                    <input
                        type="text"
                        id="image"
                        placeholder="Enter Image"
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                        readOnly
                    />
                </div>
                {loadingUpload && <LoadingBox></LoadingBox>}
                {errorUpload && (
                    <MessageBox variant="danger">{errorUpload}</MessageBox>
                )}
                <div>
                    <label htmlFor="imageFile">Image File</label>
                    <input
                        type="file"
                        id="imageFile"
                        label="Choose Image"
                        onChange={uploadFileHandler}
                    />
                </div>
                <div>
                    <label htmlFor="category">Category</label>
                    <input
                        type="text"
                        id="category"
                        placeholder="Enter Category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="countInStock">Count In Stock</label>
                    <input
                        type="number"
                        id="countInStock"
                        placeholder="Enter Count In Stock"
                        value={countInStock}
                        onChange={(e) => setCountInStock(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        rows="3"
                        type="text"
                        placeholder="Enter Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                </div>
                <div>
                    {loading && <LoadingBox></LoadingBox>}
                    {error && <MessageBox variant="danger">{error}</MessageBox>}
                    <label />
                    <button className="primary" type="submit">
                        Create
                    </button>
                </div>
            </form>
        </div>
    );
}
