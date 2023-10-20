const { User, Product, Category, Order,Tag } = require('../models');
const { signToken } = require('../utils/auth');
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');
//stripe require a valid key
const { AuthenticationError} = require ('apollo-server-express')

const resolvers = {
  Query: {
    searchProducts: async (parent, {searchQuery}) => {
      const query = {
        $or: [
          { name: { $regex: searchQuery, $options: 'i' } }, // Case-insensitive regex match
          { description: { $regex: searchQuery, $options: 'i' } }
        ]
      };
      return await Product.find(query).exec();
    },
    categories: async () => {
      return await Category.find();
    },
    products: async (parent, { category, name }) => {
      const params = {};

      if (category) {
        params.category = category;
      }

      if (name) {
        params.name = {
          $regex: name
        };
      }

      return await Product.find(params).populate('category');
    },
    product: async (parent, { _id }) => {
      return await Product.findById(_id).populate('category');
    },
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
    checkout: async (parent, args, context) => {
      const url = new URL(context.headers.referer).origin;
      await Order.create({ products: args.products.map(({ _id }) => _id) });
      const line_items = []; const { products } = await order.populate('products');

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
    addOrder: async (parent, { products }, context) => {
      if (context.user) {
        const order = new Order({ products });

        await User.findByIdAndUpdate(context.user._id, { $push: { orders: order } });

        return order;
      }

      throw AuthenticationError;
    },
    updateUser: async (parent, args, context) => {
      if (context.user) {
        return await User.findByIdAndUpdate(context.user._id, args, { new: true });
      }

      throw AuthenticationError;
    },
    updateProduct: async (parent, { _id, quantity }) => {
      const decrement = Math.abs(quantity) * -1;

      return await Product.findByIdAndUpdate(_id, { $inc: { quantity: decrement } }, { new: true });
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
  
    addtag: async (parent, { name, productID }) => {
      // if (context.) {} authenticate merchant login?

      const updatedProduct = await Product.findByIdAndUpdate(
        productID,
        { $push: { tags: name } },
        { new: true } // Return the updated product after the update
      );
      
      if (!updatedProduct) {
        throw new Error('Product not found'); // Handle the case when the product doesn't exist
      }

      return updatedProduct;

      //throw AuthenticationError;
  }
}
};

module.exports = resolvers;
