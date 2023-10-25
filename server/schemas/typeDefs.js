const {gql} = require('apollo-server-express')

const typeDefs = gql `
  type Category {
    _id: ID
    name: String!
  }

  type Product {
    _id: ID
    name: String!
    author: [String]
    description: String
    image: String
    quantity: Int
    price: Float
    category: Category
    tags: [String]
    sale: Boolean
    dateAdded: String
  }

  type Order {
    _id: ID
    purchaseDate: String
    products: [Product]
    shipped: Boolean
    completed: Boolean
  }

  type User {
    _id: ID
    firstName: String!
    lastName: String!
    email: String!
    orders: [Order]
    password: String!
    admin: Boolean
  }

  type Checkout {
    session: ID
  }

  type Auth {
    token: ID
    user: User
  }


  input ProductInput {
    _id: ID
    purchaseQuantity: Int
    name: String
    image: String
    price: Float
    quantity: Int
    author: [String]
  }

  type Query {
    getSales: [Product]
    searchProducts(searchQuery: String!): [Product]
    categories: [Category]
    allProducts: [Product]
    products(categoryID: ID): [Product]
    product(_id: ID!): Product
    user: User
    viewOrders(shipped: Boolean, completed: Boolean): [Order]
    order(_id: ID!): Order
    checkout(products: [ProductInput]): Checkout
    filterProducts(filter: String, sort: String, min: Int, max: Int): [Product]
    # sortProducts(products: [Product], sort: String!, min: Int, max: Int): [Product]
  }

  type Mutation {
    addUser(firstName: String!, lastName: String!, email: String!, password: String!): Auth
    addOrder(products: [ID]!): Order
    updateUser(firstName: String, lastName: String, email: String, password: String): User
    updateOrderShipped(_id: ID!, shipped: Boolean!): Order
    updateOrderCompleted(_id: ID!, completed: Boolean!): Order
    addProduct(name: String, author: [String], description: String, image: String, price: Float, quantity: Int, category: String, tags: [String], sale: Boolean): Product
    deleteProduct(_id: ID!): Product
    updateProduct(_id: ID!, name: String, description: String, quantity: Int, price: Float, sale: Boolean): Product
    login(email: String!, password: String!): Auth
    addTag(tagName: String!, productId: ID!):Product
    deleteTag(tagName: String!, productId: ID!): Product
  }
`;

module.exports = typeDefs;
