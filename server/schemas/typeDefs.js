const {gql} = require('apollo-server-express')

const typeDefs = gql `
  type Category {
    _id: ID
    name: String!
  }

  type Product {
    _id: ID
    name: String!
    author: String!
    description: String
    image: String
    quantity: Int
    price: Float
    category: ID
    tags: [ID]
  }

  type Order {
    _id: ID
    purchaseDate: String
    products: [ID]
  }

  type User {
    _id: ID
    firstName: String!
    lastName: String!
    email: String!
    orders: [Order]
    password: String!
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
  }

  type Query {
    getSales: [Product]
    searchProducts(searchQuery: String!): [Product]
    categories: [Category]
    products(category: ID, name: String): [Product]
    product(_id: ID!): Product
    user: User
    order(_id: ID!): Order
    checkout(products: [ProductInput]): Checkout
  }

  type Mutation {
    addUser(firstName: String!, lastName: String!, email: String!, password: String!): Auth
    addOrder(products: [ID]!): Order
    updateUser(firstName: String, lastName: String, email: String, password: String): User
    updateCartProductCount(_id: ID!, quantity: Int!): Product
    updateProduct(_id: ID!, quantity: Int, price: Float, sale: Boolean): Product
    login(email: String!, password: String!): Auth
    addTag(tagName: String!, productId: ID!):Tag
  }
`;

module.exports = typeDefs;
