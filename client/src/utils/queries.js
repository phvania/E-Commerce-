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
  }
`;


export const QUERY_FILTER_SORT_PRODUCTS = gql`
query Query($filter: String, $sort: String, $min: Int, $max: Int) {
  filterProducts(filter: $filter, sort: $sort, min: $min, max: $max) {
    author
    name
    price
    category {
      _id
      name
    }
    dateAdded
    description
    image
    quantity
    sale
    tags
    _id
  }
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
    allProducts {
      _id
      name
      author
      description
      image
      quantity
      price
      category
      tags
      sale
      dateAdded
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
