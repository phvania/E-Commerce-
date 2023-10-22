import { gql } from '@apollo/client';

export const QUERY_PRODUCTS = gql`
  query getProducts($categoryID: ID) {
    products(categoryID: $categoryID) {
      _id
      name
      author
      description
      image
      quantity
      price
      category
      sale
      tags
      dateAdded
    }
`;







export const QUERY_CHECKOUT = gql`
  query getCheckout($products: [ProductInput]) {
    checkout(products: $products) {
      session
    }
  }
`;

export const QUERY_ALL_PRODUCTS = gql`
  {
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
`;

export const QUERY_CATEGORIES = gql`
  {
    categories {
      _id
      name
    }
  }
`;

export const QUERY_USER = gql`
  {
    user {
      firstName
      lastName
      orders {
        _id
        purchaseDate
        products {
          _id
          name
          description
          price
          quantity
          image
        }
      }
    }
  }
`;
