// import bcrypt from 'bcryptjs';

const data = {
    // users: [
    //     {
    //         name: 'Li Tian',
    //         email: 'litian@gmail.com',
    //         password: bcrypt.hashSync('123456', 8),
    //         isAdmin: true,
    //     },
    //     {
    //         name: 'armin',
    //         email: 'armin@gmail.com',
    //         password: bcrypt.hashSync('123456', 8),
    //         isAdmin: false,
    //     },
    // ],
    products: [
        {
            _id: 1,
            name: 'Chocolate Cupcakes ',
            image: '/images/p1.jpg',
            price: 10,
            countInStock: 100,
            description: 'Best Taste U Ever Tried',
        },
        {
            _id: 2,
            name: 'Strawberry Cupcakes ',
            image: '/images/p2.jpg',
            price: 5,
            countInStock: 10,
            description: 'Fresh Strawberry',
        },
        {
            _id: 3,
            name: 'Mocha Cupcakes ',
            image: '/images/p3.jpg',
            price: 9,
            countInStock: 20,
            description: 'Mocha Cream on Top',
        },
        {
            _id: 4,
            name: 'Green Tea Cupcakes ',
            image: '/images/p4.jpg',
            price: 12,
            countInStock: 3,
            description: 'Green Tea is da Best',
        },
    ],
};

export default data;
