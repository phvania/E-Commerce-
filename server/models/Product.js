const mongoose = require('mongoose');

const { Schema } = mongoose;
const Tag = require('./Tag')

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  author: [{
    type: String,
    required: true
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
    required: true
  },
  tags: [{
    type: Schema.Types.ObjectId,
    ref: 'Tag',
    required: true
  }]
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
