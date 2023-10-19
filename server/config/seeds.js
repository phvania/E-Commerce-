const db = require('./connection');
const { User, Product, Category, Tag } = require('../models');
const cleanDB = require('./cleanDB');

db.once('open', async () => {
  await cleanDB('Category', 'categories');
  await cleanDB('Product', 'products');
  await cleanDB('User', 'users');
  await cleanDB('Tag', 'tags')

  const categories = await Category.insertMany([
    { name: 'Romance' },
    { name: 'Horror' },
    { name: 'Mystery' },
    { name: 'Poetry' },
    { name: 'Biography' }
  ]);

  console.log('categories seeded');

  const tags = await Tag.insertMany([
    {name: 'classic'},
    {name: 'best-seller'},
    {name: 'new release'},
    {name: 'sale'}
  ])

  const products = await Product.insertMany([
    {
      name: 'Janye Eyre',
      author: ['Charlotte Bronte'],
      description:
        'Jane Eyre description',
      image: 'http://bookcoverarchive.com/wp-content/uploads/amazon/jane_eyre.jpg',
      category: categories[0]._id,
      price: 29.99,
      quantity: 100,
      tags: [tags[0]._id, tags[1]._id, tags[3]._id]
      
    },
    {
      name: '1000 Black Umbrellas',
      author: ['Daniel McGinn'],
      description:
        '1000 Black Umbrellas description',
      image: 'http://bookcoverarchive.com/wp-content/uploads/2016/08/SquareSpace6.jpg',
      category: categories[3]._id,
      price: 13.99,
      quantity: 100,
      tag: [tags[3]._id]
    },
    {
      name: 'Winchell',
      author: ['Neal Gabler'],
      category: categories[4]._id,
      description:
        'Winchell description',
      image: 'http://bookcoverarchive.com/wp-content/uploads/amazon/winchell.jpg',
      price: 15.99,
      quantity: 20,
      // tags: [tags[2]._id]
    },
    {
      name: 'The Last Skin',
      author: ['Barbara Ras'],
      category: categories[3]._id,
      description:
        'Praesent placerat, odio vel euismod venenatis, lectus arcu laoreet felis, et fringilla sapien turpis vestibulum nisl.',
      image: 'http://bookcoverarchive.com/wp-content/uploads/2010/09/the_last_skin.large_.jpg',
      price: 3.99,
      quantity: 50,
      // tags: []
    },
    {
      name: "Blood's a Rover",
      author: ['James Ellroy'],
      category: categories[2]._id,
      description:
        'Description.',
      image: 'http://bookcoverarchive.com/wp-content/uploads/amazon/bloods_a_rover.jpg',
      price: 3.99,
      quantity: 50,
      // tags: [tags[2]._id]
    },
  
  ]);

  console.log('products seeded');

  await User.create({
    firstName: 'Pamela',
    lastName: 'Washington',
    email: 'pamela@testmail.com',
    password: 'password12345',
    orders: [
      {
        products: [products[0]._id, products[0]._id, products[1]._id]
      }
    ]
  });

  await User.create({
    firstName: 'Elijah',
    lastName: 'Holt',
    email: 'eholt@testmail.com',
    password: 'password12345'
  });

  console.log('users seeded');

  process.exit();
});
