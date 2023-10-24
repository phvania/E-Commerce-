const db = require('./connection');
const { User, Product, Category, Order } = require('../models');
const cleanDB = require('./cleanDB');

db.once('open', async () => {
  await cleanDB('Category', 'categories');
  await cleanDB('Product', 'products');
  await cleanDB('User', 'users');
  await cleanDB('Order', 'orders');


  const categories = await Category.insertMany([
    { name: 'Romance' },
    { name: 'Horror' },
    { name: 'Mystery' },
    { name: 'Poetry' },
    { name: 'Biography' }
  ]);

  console.log('categories seeded');

  const products = await Product.insertMany([
    {
      name: 'Janye Eyre',
      author: ['Charlotte Bronte'],
      description:
        'Jane Eyre description',
      image: 'https://d3525k1ryd2155.cloudfront.net/f/557/526/9780451526557.IN.0.m.jpg',
      category: categories[0]._id,
      price: 29.99,
      quantity: 100,
      tags: ['best-seller', 'classic', 'sale'],
      sale: true,
      dateAdded: '1697820525420',

    },
    {
      name: '1000 Black Umbrellas',
      author: ['Daniel McGinn'],
      description:
        '1000 Black Umbrellas description',
      image: 'https://d3525k1ryd2155.cloudfront.net/h/436/796/1496796436.0.m.jpg',
      category: categories[3]._id,
      price: 13.99,
      quantity: 100,
      tag: ['best-seller'],
      sale: true,
      dateAdded: '1697820525429',
    },
    {
      name: 'Winchell',
      author: ['Neal Gabler'],
      category: categories[4]._id,
      description:
        'Winchell description',
      image: 'https://d3525k1ryd2155.cloudfront.net/h/742/364/134364742.0.m.jpg',
      price: 15.99,
      quantity: 20,
      tags: ['sale'],
      dateAdded: '169782052542'
    },
    {
      name: 'The Last Skin',
      author: ['Barbara Ras'],
      category: categories[3]._id,
      description:
        'Praesent placerat, odio vel euismod venenatis, lectus arcu laoreet felis, et fringilla sapien turpis vestibulum nisl.',
      image: 'https://d3525k1ryd2155.cloudfront.net/f/974/116/9780143116974.RH.0.l.jpg',
      price: 3.99,
      quantity: 50,
      tags: ['sale']
    },
    {
      name: "Blood's a Rover",
      author: ['James Ellroy'],
      category: categories[2]._id,
      description:
        'Description.',
      image: 'https://d3525k1ryd2155.cloudfront.net/h/492/201/315201492.0.m.jpg',
      price: 3.99,
      quantity: 50,
      tags: []
    },

  ]);

  console.log('products seeded');
  
  const orders = await Order.insertMany([
    {
      products: [products[0]._id, products[0]._id, products[1]._id],
      shipped: true,
    },
    {
      products: [products[0]._id],
      shipped: true,
    },
    {
      products: [products[2]._id, products[1]._id],
    }
  ])
  await User.create({
    firstName: 'Pamela',
    lastName: 'Washington',
    email: 'pamela@testmail.com',
    password: 'password12345',
    orders: [orders[0]._id, orders[1]._id],

  });

  await User.create({
    firstName: 'Elijah',
    lastName: 'Holt',
    email: 'eholt@testmail.com',
    password: 'password12345',
    orders: [orders[2]._id],
  });

  await User.create({
    firstName: 'Admin',
    lastName: 'Admin',
    email: 'admin@gmail.com',
    password: 'adminpassword',
    admin: true
  });

  console.log('users seeded');

  process.exit();
});
