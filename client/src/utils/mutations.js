import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_ORDER = gql`
  mutation addOrder($products: [ID]!) {
    addOrder(products: $products) {
      purchaseDate
      products {
        _id
        name
        description
        price
        quantity
        category {
          name
        }
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
  ) {
    addUser(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
    ) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_PRODUCT = gql`
  mutation addProduct(
      $name: String, 
      $author: [String], 
      $description: String, 
      $image: String, 
      $price: Float, 
      $quantity: Int,
      $category: String, 
      $tags: [String], 
      $sale: Boolean
    ) {
    addProduct(name: $name, author: $author, description: $description, image: $image, price: $price, quantity: $quantity, category: $category, tags: $tags, sale: $sale) {
      _id
      name
      author
      description
      image
      quantity
      price
      category {
        _id
      }
      tags
      sale
      dateAdded
    }
  }
`;

export const UPDATE_PRODUCT_DETAILS = gql`
  mutation updateProduct(
    $id: ID!, $name: String, $description: String, $quantity: Int, $price: Float, $sale: Boolean) {
      updateProduct(_id: $id, name: $name, quantity: $quantity, description: $description, price: $price, sale: $sale) {
        _id
        name
        author
        description
        image
        quantity
        price
        category {
          _id
        }
        tags
        sale
        dateAdded
      }
  }
`;

export const DELETE_PRODUCT = gql`
mutation deleteProduct($id: ID!){
deleteProduct(_id: $id) {
  _id
  name
  }
}
`;

export const UPDATE_ORDER_SHIPPED = gql`
mutation updateOrderShipped($id: ID!, $shipped: Boolean!){
  updateOrderShipped(_id: $id, shipped: $shipped) {
    _id
  }
}
`;

export const UPDATE_ORDER_COMPLETED = gql`
mutation updateOrderShipped($id: ID!, $completed: Boolean!){
  updateOrderShipped(_id: $id, completed: $completed) {
    _id
  }
}
`;