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
    // categories need adjeusting below
    {
      name: "A Long Way Gone",
      author: ['Ishmael Beah'],
      category: categories[0]._id,
      description:
        'Description.',
      image: 'https://d3525k1ryd2155.cloudfront.net/h/518/252/1186252518.0.m.jpg',
      price: 15.99,
      quantity: 50,
      sale: true,
      dateAdded: '169784052542',
      tags: []
    },
    {
      name: "Moonwalk",
      author: ['Michael Jackson'],
      category: categories[1]._id,
      description:
        'Description.',
      image: 'https://d3525k1ryd2155.cloudfront.net/h/509/617/794617509.0.m.jpg',
      price: 10.99,
      quantity: 20,
      dateAdded: '169782057542',
      tags: []
    },
    {
      name: "The Last Lion",
      author: ['William Manchester'],
      category: categories[2]._id,
      description:
        'Description.',
      image: 'https://d3525k1ryd2155.cloudfront.net/h/506/188/1478188506.0.m.jpg',
      price: 24.99,
      quantity: 50,
      dateAdded: '169782051342',
      tags: []
    },
    {
      name: "Kitchen Confidential",
      author: ['Anthony Bourdain'],
      category: categories[3]._id,
      description:
        'Description.',
      image: 'https://d3525k1ryd2155.cloudfront.net/h/808/858/1424858808.0.m.jpg',
      price: 19.99,
      quantity: 150,
      sale: true,
      dateAdded: '169782032542',
      tags: [],
    },
    {
      name: "Steve Jobs",
      author: ['Walter Isaacson'],
      category: categories[0]._id,
      description:
        'Description.',
      image: 'https://d3525k1ryd2155.cloudfront.net/h/655/217/1564217655.6.m.jpg',
      price: 12.99,
      quantity: 80,
      dateAdded: '169782052242',
      tags: [],
    },
    {
      name: "Benjamin Franklin",
      author: ['Walter Isaacson'],
      category: categories[1]._id,
      description:
        'Description.',
      image: 'https://d3525k1ryd2155.cloudfront.net/h/378/558/1182558378.0.m.jpg',
      price: 13.99,
      quantity: 50,
      dateAdded: '169782042542',
      tags: [],
    },
    //
    {
      name: "Tao Te Ching",
      author: ['Lao Tsu'],
      category: categories[2]._id,
      description:
        'Description.',
      image: 'https://d3525k1ryd2155.cloudfront.net/h/165/469/1330469165.0.m.jpg',
      price: 6.99,
      quantity: 30,
      sale: true,
      dateAdded: '169482052542',
      tags: [],
    },
    {
      name: "IF",
      author: ['Rudyard Kipling'],
      category: categories[3]._id,
      description:
        'Description.',
      image: 'https://d3525k1ryd2155.cloudfront.net/h/809/848/706848809.0.m.jpg',
      price: 3.99,
      quantity: 60,
      dateAdded: '169742052542',
      tags: [],
    },
    // 13
    {
      name: "Poems, Poets, Poetry",
      author: ['Helen Vendler'],
      category: categories[0]._id,
      description:
        'Description.',
      image: 'https://d3525k1ryd2155.cloudfront.net/h/969/010/1224010969.0.m.jpg',
      price: 29.99,
      quantity: 100,
      tags: [],
      dateAdded: '169282052542',
    },
    {
      name: "Poems",
      author: ['Rex Warner'],
      category: categories[1]._id,
      description:
        'Description.',
      image: 'https://d3525k1ryd2155.cloudfront.net/h/789/542/78542789.0.m.jpg',
      price: 10.99,
      quantity: 50,
      sale: true,
      dateAdded: '169782051542',
      tags: [],
    },
    {
      name: "Songs From the Slums",
      author: ['Toyohiko Kagawa'],
      category: categories[2]._id,
      description:
        'Description.',
      image: 'https://d3525k1ryd2155.cloudfront.net/h/086/635/1321635086.0.m.jpg',
      price: 5.99,
      quantity: 40,
      dateAdded: '169782052522',
      tags: []
    },
    {
      name: "The Great Gatsby",
      author: ['F Scott Fitzgerald'],
      category: categories[3]._id,
      description:
        'Description.',
      image: 'https://d3525k1ryd2155.cloudfront.net/h/532/440/1473440532.0.m.2.jpg',
      price: 12.99,
      quantity: 100,
      tags: [],
      dateAdded: '169782050542',
    },
    {
      name: "The Hobbit",
      author: ['J R R Tolkein'],
      category: categories[0]._id,
      description:
        'Description.',
      image: 'https://d3525k1ryd2155.cloudfront.net/h/199/311/1481311199.0.m.jpg',
      price: 7.99,
      quantity: 50,
      sale: true,
      dateAdded: '169782032542',
      tags: []
    },
    {
      name: "The Old Man and the Sea",
      author: ['Ernest Hemingway'],
      category: categories[1]._id,
      description:
        'Description.',
      image: 'https://d3525k1ryd2155.cloudfront.net/h/902/542/905542902.0.m.jpg',
      price: 9.99,
      quantity: 20,
      dateAdded: '169762052542',
      tags: []
    },
    {
      name: "The Grapes of Wrath",
      author: ['John Steinbeck'],
      category: categories[2]._id,
      description:
        'Description.',
      image: 'https://d3525k1ryd2155.cloudfront.net/h/735/136/733136735.0.m.jpg',
      price: 19.99,
      quantity: 80,
      dateAdded: '169712052542',
      tags: []
    },
    {
      name: "Physics",
      author: ['Douglas C Giancoli'],
      category: categories[4]._id,
      description:
        'Description.',
      image: 'https://d3525k1ryd2155.cloudfront.net/h/005/379/1295379005.0.m.jpg',
      price: 19.99,
      quantity: 80,
      tags: []
    },
    {
      name: "Chemistry",
      author: ['Nivaldo J Tro'],
      category: categories[4]._id,
      description:
        'Description.',
      image: 'https://d3525k1ryd2155.cloudfront.net/h/013/127/1410127013.0.m.jpg',
      price: 19.99,
      quantity: 80,
      tags: []
    },
    {
      name: "Principles of Economics",
      author: ['N Gregory Mankiw'],
      category: categories[4]._id,
      description:
        'Description.',
      image: 'https://d3525k1ryd2155.cloudfront.net/h/163/185/728185163.0.m.jpg',
      price: 19.99,
      quantity: 80,
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
    firstName: 'John',
    lastName: 'Smith',
    email: 'jsmith@fake.com',
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
