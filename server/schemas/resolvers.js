
const { User, Product, Category, Order } = require('../models');
const { signToken } = require('../utils/auth');
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');
//stripe require a valid key
const { AuthenticationError } = require('apollo-server-express')


const resolvers = {
  Query: {
    // get all sale items // no auth
    getSales: async () => {
      return await Product.find({
        sale: true
      }).populate('category')
    },

    // search for product via query // no auth
    searchProducts: async (parent, { searchQuery }) => {
      const query = {
        $or: [
          { name: { $regex: searchQuery, $options: 'i' } },
          { description: { $regex: searchQuery, $options: 'i' } },
          { tags: { $regex: searchQuery, $options: 'i' } }
        ]
      };
      return await Product.find(query).exec();
    },

    // get all products for a category // no auth
    categories: async () => {
      return await Category.find();
    },

    allProducts: async () => {
      try {
        const products = await Product.find().populate('category');
        return products;
      } catch (error) {
        throw new Error('Error fetching products');
      }
    },

    products: async (parent, { categoryID }) => {
      try {
        if (!categoryID) {

          return await Product.find().populate('category');
        }

        const category = await Category.findById(categoryID);

        if (!category) {
          throw new Error('Category not found');
        }

        return await Product.find({ category: categoryID }).populate('category');
      } catch (error) {
        throw new Error('Error fetching products by category');
      }
    },



    // get product by ID // no auth

    product: async (parent, { _id }) => {
      return await Product.findById(_id).populate('category');
    },

    // get user by id // user auth
    user: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id)
        .populate({
          path: 'orders',
          populate: {
            path: 'products',
            model: 'Product' 
          }
        });

        user.orders
        //.sort((a, b) => b.purchaseDate - a.purchaseDate);

        return user;
      }

      throw AuthenticationError;
    },

    // view all orders // admin auth
    viewOrders: async (parent, { shipped, completed }, context) => {

      if (context.user.admin) {
        try {
          if (shipped) {
            return await Order.find({ shipped: true }).populate('products')
          } else if (completed) {
            return await Order.find({ completed: true }).populate('products')
          } else if (shipped && completed) {
            return await Order.find({ shipped: true, completed: true }).populate('product')
          } else {
            
            const data= await Order.find().populate('products')
            console.log(data)
            return data
          }

        } catch (err) {
          throw err;
        }
      } else {
          throw AuthenticationError;
        } 
    },


    // get orders // user auth
    order: async (parent, { _id }, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate({
          path: 'orders.products',
          populate: 'category'
        });

        return user.orders.id(_id);
      }

      throw AuthenticationError;
    },

    // checkout with everything in cart // user auth
    checkout: async (parent, args, context) => {
      const url = new URL(context.headers.referer).origin;
      await Order.create({ products: args.products.map(({ _id }) => _id) });
      // eslint-disable-next-line camelcase
      const line_items = [];

      // eslint-disable-next-line no-restricted-syntax
      for (const product of args.products) {
        line_items.push({
          price_data: {
            currency: 'usd',
            product_data: {
              name: product.name,
              description: product.description,
              images: [`${url}/images/${product.image}`]
            },
            unit_amount: product.price * 100,
          },
          quantity: product.purchaseQuantity,
        });
      }

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items,
        mode: 'payment',
        success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${url}/`,
      });

      return { session: session.id };

      // old buggy code below

      // console.log('Reached backend')
      // const url = new URL(context.headers.referer).origin;
      // // console.log(url)
      // await Order.create({ products: args.products.map(({ _id }) => _id) });
      // const line_items = []; 
      // const { products } = await Order.populate('products');
      // // console.log(products)
      // for (let i = 0; i < products.length; i++) {
      //   const product = await stripe.products.create({
      //     name: products[i].name,
      //     description: products[i].description,
      //     images: [`${url}/images/${products[i].image}`]
      //   });

      //   const price = await stripe.prices.create({
      //     product: product.id,
      //     unit_amount: parseInt(Math.round(products[i].price * 100)),
      //     currency: 'aud',
      //   });
      //   console.log("after strip.prices.create price: ", price)

      //   line_items.push({
      //     price: price.id,
      //     quantity: 1
      //   });
      // }
      // console.log("for loop prouct is finished")

      // const session = await stripe.checkout.sessions.create({
      //   payment_method_types: ['card'],
      //   line_items,
      //   mode: 'payment',
      //   success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
      //   cancel_url: `${url}/`,
      // });
      // console.log(session)
      // return { session: session.id };
    },

    // filter & sort products
    filterProducts: async (parent, args, context) => {
      let products = [];
      // inc
      // filter, min, max, sort
      let dir;
      if (args.filter == 'price') {
        let litt = `price`
        if (args.sort == 'asc' || args.sort == 'desc'){
          dir = args.sort;
        } else if (args.sort == 'new'){
          litt = 'dateAdded';
          dir = 'asc';
        } else if (args.sort == 'old'){
          litt = 'dateAdded';
          dir = 'desc'
        }
        // find all products in price range
        // min and max are flipped for some reason, it works like this, dont ask me why
        products = await Product.find({
          $and: [
            { price: { $gte: args.max } },
            { price: { $lte: args.min } }]
        }).populate('category').sort({[`${litt}`]: dir})

      } else {
        let litt = `price`
        if (args.filter == 'price') {
          litt = `price`
          if (args.sort == 'asc' || args.sort == 'desc'){
            dir = args.sort;
          } else if (args.sort == 'new'){
            litt = 'dateAdded';
            dir = 'asc';
          } else if (args.sort == 'old'){
            litt = 'dateAdded';
            dir = 'desc'
          }
        }
        // find all products with matching category
        let categories = await Category.find({name: args.filter})
        // categories[0]._id
        // console.log(categories[0]._id.toString())
        products = await Product.find({ category: {_id: categories[0]._id.toString()} }).populate('category').sort({[`${litt}`]: dir})
      }
      console.log(products)
      return products;

      // escape case for no sorting
      // if (args.sort == '' || args.sort == null) {
      //   return products;
      // }
      // products.sort()

      // console.log(products)
      // products = bubbleSort(products, args.sort);
      // console.log('Post Sort')
      // console.log(products)
      // return array of products

      // sort the product array
      // it is removing objects form the incoming array and not returning them all
      function quickSort(array, order) {
        // sorts in ascending order
        // escape case for small arrays
        if (array.length <= 1) {
          return array;
        }
        const pivot = array.splice(Math.floor(Math.random() * array.length), 1);
        // const pivot = array.pop();
        console.log(pivot[0].price)
        const left = [];
        const right = [];
        array.forEach((el) => {
          if (order == 'asc') {
            // console.log(pivot)
            if (el.price <= pivot[0].price) {
              left.push(el);
            } else {
              right.push(el);
            }
          } else if (order == 'desc') {
            if (el.price > pivot[0].price) {
              left.push(el);
            } else {
              right.push(el);
            }
            // sort by date
          } else if (order == 'new') {
            // sort asc
            if (parseInt(el.dateAdded) <= parseInt(pivot[0].dateAdded)) {
              left.push(el);
            } else {
              right.push(el);
            }
          } else if (order == 'old') {
            // sort desc
            if (parseInt(el.dateAdded) > parseInt(pivot[0].dateAdded)) {
              left.push(el);
            } else {
              right.push(el);
            }
          }
        });
        // console.log('Left', left)
        // console.log('pivot', pivot)
        // console.log('right', right)
        return quickSort(left).concat(pivot[0], quickSort(right));
      }

      const bubbleSort = (array, order) => {
        let sorted = false;
        while (!sorted) {
          sorted = true;
          for (let i = 0; i < array.length; i++) {
            if (order == 'asc') {
              if (array[i].price > array[i + 1].price) {
                const tmp = array[i];
                array[i] = array[i + 1];
                array[i + 1] = tmp;
                sorted = false;
              }
            } else if (order == 'desc'){
              if (array[i].price < array[i + 1].price) {
                const tmp = array[i];
                array[i] = array[i + 1];
                array[i + 1] = tmp;
                sorted = false;
              }

            } else if (order == 'new') {
              if (parseInt(array[i].dateAdded) > parseInt(array[i + 1].dateAdded)) {
                const tmp = array[i];
                array[i] = array[i + 1];
                array[i + 1] = tmp;
                sorted = false;
              }
            } else if (order == 'old') {
              if (parseInt(array[i].dateAdded) < parseInt(array[i + 1].dateAdded)) {
                const tmp = array[i];
                array[i] = array[i + 1];
                array[i + 1] = tmp;
                sorted = false;
              }              
            }
          }
        }
        // after the `while` loop has completed, we return the sorted array
        return array;
      };


    },
  },

  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },

    // create and associate new order with a user // user auth
    addOrder: async (parent, { products }, context) => {
      if (context.user) {
        const order = new Order({ products });

        await User.findByIdAndUpdate(context.user._id, { $push: { orders: order } });

        return order;
      }

      throw AuthenticationError;
    },

    // update user info // user auth
    updateUser: async (parent, args, context) => {
      if (context.user) {
        return await User.findByIdAndUpdate(context.user._id, args, { new: true });
      }

      throw AuthenticationError;
    },

    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw AuthenticationError;
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(user);

      return { token, user };
    },


    //update shipped and completed boolean // admin  auth 
    updateOrderShipped: async (parent, { _id, shipped }, context) => {
      if (context.user.admin) {
        try {
          const updatedOrder = await Order.findByIdAndUpdate(_id, { shipped }, { new: true }).populate('products');

          if (!updatedOrder) {
            throw new Error('Order not found');
          }

          return updatedOrder;
        } catch (error) {
          throw new Error('Failed to update the order shipped status');
        }
      } else {
        throw AuthenticationError
      }
    },
    updateOrderCompleted: async (parent, { _id, completed }, context) => {
      if (context.user.admin) {
        try {
          const completedOrder = await Order.findByIdAndUpdate(_id, { completed }, { new: true }).populate('products');

          if (!completedOrder) {
            throw new Error('Order not found');
          }

          return completedOrder;
        } catch (error) {
          throw new Error('Failed to update the order completed status');
        }
      } else {
        throw AuthenticationError
      }
    },

    // add product // admin auth
    addProduct: async (parent, { name, author, description, image, price, quantity, category, tags, sale }, context) => {
      if (context.user.admin) {
        try {
          return await Product.create({
            name,
            author,
            description,
            image,
            price,
            category,
            tags,
            sale,
          })
        } catch (err) {
          throw err;
        }
      } else {
        throw AuthenticationError
      }
    },

    // delete product // admin auth
    deleteProduct: async (parent, { _id }, context) => {
      if (context.user.admin) {
        try {
          const deletedProduct = await Product.findByIdAndRemove(_id)
          if (!deletedProduct) {
            throw new Error('Product not found');
          }
          return deletedProduct;
        } catch (err) {
          throw err;
        }
      } else {
        throw AuthenticationError
      }
    },


    // update product info // admin auth
    updateProduct: async (parent, { _id, name, quantity, description, price, sale }, context) => {
      console.log('HELLO')
      if (context.user.admin) {
        try {
          const updatedProduct = await Product.findByIdAndUpdate(
            _id,
            {
              $set: {
                quantity: quantity !== undefined ? quantity : null,
                name: name !== undefined ? name : null,
                description: description !== undefined ? description : null,
                price: price !== undefined ? price : null,
                sale: sale !== undefined ? sale : null,
              },
            },
            { new: true }
          );
          if (!updatedProduct) {
            throw new Error('Product not found');
          }

          return updatedProduct;
        } catch (error) {
          throw error;
        }
      } else {
        throw AuthenticationError
      }
    },
    // add and remove tag admin auth
    addTag: async (parent, { tagName, productID }, context) => {

      if (context.user.admin) {
        const updatedProduct = await Product.findByIdAndUpdate(
          productID,
          { $push: { tags: tagName } },
          { new: true }
        );

        if (!updatedProduct) {
          throw new Error('Product not found');
        }

        return updatedProduct;
      } else {
        throw AuthenticationError
      }
    },
    deleteTag: async (parent, { tagName, productID }, context) => {
      if (context.user.admin) {
        try {
          const product = await Product.findById(productID);
          if (!product) {
            throw new Error('Product not found');
          }
          const tagIndex = product.tags.indexOf(tagName);

          if (tagIndex === -1) {
            throw new Error('Tag not found in this product');
          }
          product.tags.splice(tagIndex, 1);

          return await product.save();
        } catch (err) {
          throw err;
        }
      }
      throw new AuthenticationError('Admin access required');
    }

  }
}



module.exports = resolvers;