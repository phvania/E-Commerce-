const mongoose = require('mongoose');

const { Schema } = mongoose;


const productSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  author: [{
    type: String,
  }],
  description: {
    type: String
  },
  image: {
    type: String
  },
  price: {
    type: Number,
    required: true,
    min: 0.99
  },
  quantity: {
    type: Number,
    min: 0,
    default: 0
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: false
  },
  tags: [{
    type: String,
    required: false,
    trim: true
  }],
  sale: {
    type: Boolean,
    default: false
  },
  dateAdded: {
    type: String,
    default: Date.now
  }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
