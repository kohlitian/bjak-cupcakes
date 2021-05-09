import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import data from '../data.js';
import Product from '../models/productModel.js';
import { isAdmin, isAuth } from '../utils.js';

const productRouter = express.Router();

productRouter.get(
    '/',
    expressAsyncHandler(async (req, res) => {
        const products = await Product.find({});
        res.send(products);
    })
);

productRouter.get(
    '/seed',
    expressAsyncHandler(async (req, res) => {
        await Product.remove({});
        const createdProduct = await Product.insertMany(data.products);
        res.send({ createdProduct });
    })
);

productRouter.get(
    '/:id',
    expressAsyncHandler(async (req, res) => {
        const product = await Product.findById(req.params.id);
        if (product) {
            res.send(product);
        } else {
            res.status(404).send({ message: 'Product Not Found' });
        }
    })
);

productRouter.post(
    '/',
    isAuth,
    isAdmin,
    expressAsyncHandler(async (req, res) => {
        const product = new Product({
            name: req.body.name || 'sample name',
            image: req.body.image || '/images/p1.jpg',
            price: req.body.price || 0,
            category: req.body.category || 'sample',
            countInStock: req.body.countInStock || 0,
            description: req.body.description || 'sample description',
        });
        const createdProduct = await product.save();
        res.send({ message: 'Product Created', product: createdProduct });
    })
);

productRouter.put(
    '/:id',
    isAuth,
    isAdmin,
    expressAsyncHandler(async (req, res) => {
        const productId = req.params.id;
        const product = await Product.findById(productId);
        if (product) {
            product.name = req.body.name || product.name;
            product.price = req.body.price || product.price;
            product.image = req.body.image || product.image;
            product.category = req.body.category || product.category;
            product.countInStock = req.body.countInStock || 0;
            product.description = req.body.description || '';
            const updatedProduct = await product.save();
            res.send({ message: 'Product Updated', product: updatedProduct });
        } else {
            res.status(404).send({ message: 'Product Not Found' });
        }
    })
);

productRouter.delete(
    '/:id',
    isAuth,
    isAdmin,
    expressAsyncHandler(async (req, res) => {
        const product = await Product.findById(req.params.id);
        if (product) {
            const deleteProduct = await product.remove();
            res.send({ message: 'Product Deleted', product: deleteProduct });
        } else {
            res.status(404).send({ message: 'Product Not Found' });
        }
    })
);

export default productRouter;
