import bcrypt from 'bcryptjs';

const data = {
    users: [
        {
            name: 'Li Tian',
            email: 'litian@gmail.com',
            phone: '0123334444',
            password: bcrypt.hashSync('123456', 8),
            isAdmin: true,
        },
        {
            name: 'armin',
            email: 'armin@gmail.com',
            phone: '0167789010',
            password: bcrypt.hashSync('123456', 8),
            isAdmin: false,
        },
    ],
    products: [
        {
            name: 'Strawberry Chocolate Cupcakes ',
            image: '/images/p1.jpg',
            price: 10,
            countInStock: 100,
            description: 'Fresh Strawberry mixed with Best Chocolate',
            category: 'Strawberry',
        },
        {
            name: 'Chocolate Oreo Cupcakes ',
            image: '/images/p2.jpg',
            price: 5,
            countInStock: 10,
            description: 'Double Sweet Double Fun',
            category: 'Chocolate',
        },
        {
            name: 'Chocolate Cupcakes ',
            image: '/images/p3.jpg',
            price: 9,
            countInStock: 20,
            description: 'Best Chocolate for the Best of U',
            category: 'Chocolate',
        },
        {
            name: 'Pumpkin Cupcakes ',
            image: '/images/p4.jpg',
            price: 12,
            countInStock: 3,
            description: 'Pumpkin Lovers must Try!',
            category: 'Pumpkin',
        },
        {
            name: 'Banana with Cream Cupcakes ',
            image: '/images/p5.jpg',
            price: 5,
            countInStock: 30,
            description: '',
            category: 'Banana',
        },
        {
            name: 'BlueBerry Cupcakes ',
            image: '/images/p6.jpg',
            price: 7,
            countInStock: 0,
            description: 'BlueBerry is da Best',
            category: 'Blueberry',
        },
    ],
};

export default data;
