
const { User, Product, Category, Order} = require('../models');
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
      })
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
        const products = await Product.find();
        return products;
      } catch (error) {
        throw new Error('Error fetching products');
      }
    },

    products: async (parent, { categoryID}) => {
      try {
        const category = await Category.findById(categoryID);
    
        if (!category) {
          throw new Error('Category not found');
        }
        return await Product.find({ category: categoryID });
    
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
        const user = await User.findById(context.user._id).populate({
          path: 'orders.products',
          populate: 'category'
        });

        user.orders.sort((a, b) => b.purchaseDate - a.purchaseDate);

        return user;
      }

      throw AuthenticationError;
    },

    // view all orders // admin auth
    viewOrders: async (parent, { shipped, completed }, context) => {
      // console.log(context)
      // console.log(context.user, '<---------------')

      if (context.user.admin) {
        try {
          if (shipped) {
            return await Order.find({ shipped: true })
          } else if (completed) {
            return await Order.find({ completed: true })
          } else if (shipped && completed) {
            return await Order.find({ shipped: true, completed: true })
          } else {
            return await Order.find()
          }

        } catch (err) {
          throw err;
        }
      // } else {
      //   throw AuthenticationError;
      // }
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
      const line_items = []; const { products } = await Order.populate('products');

      for (let i = 0; i < products.length; i++) {
        const product = await stripe.products.create({
          name: products[i].name,
          description: products[i].description,
          images: [`${url}/images/${products[i].image}`]
        });
        console.log("before strip.prices.create")
        // console.log("prduct.id", product.id);
        // console.log("unit_amount", Math.round(products[i].price * 100))
        const price = await stripe.prices.create({
          product: product.id,
          unit_amount: parseInt(Math.round(products[i].price * 100)),
          currency: 'aud',
        });
        console.log("after strip.prices.create price: ", price)

        line_items.push({
          price: price.id,
          quantity: 1
        });
      }
      // console.log("for loop prouct is finished")

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items,
        mode: 'payment',
        success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${url}/`,
      });

      return { session: session.id };
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
          const updatedOrder = await Order.findByIdAndUpdate(_id, { shipped }, { new: true });

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
          const completedOrder = await Order.findByIdAndUpdate(_id, { completed }, { new: true });

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
    updateProduct: async (parent, { _id, quantity, price, sale }, context) => {
      if (context.user.admin) {
        try {
          const updatedProduct = await Product.findByIdAndUpdate(
            _id,
            {
              $set: {
                quantity: quantity !== undefined ? quantity : null,
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
