import { Link } from 'react-router-dom';

import { useQuery } from '@apollo/client';
import { QUERY_ORDERS } from '../utils/queries';
import React from 'react';
import Table from 'react-bootstrap/Table';

function ViewOrders() {
    const { loading, error, data } = useQuery(QUERY_ORDERS);
  
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;
  
    const orders = data.viewOrders;
  
    return (
      <div>
        <h1>Order History</h1>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Purchase Date</th>
              <th>Shipped</th>
              <th>Completed</th>
              <th>Products</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{new Date(parseInt(order.purchaseDate)).toLocaleDateString()}</td>
                <td>{order.shipped ? 'Yes' : 'No'}</td>
                <td>{order.completed ? 'Yes' : 'No'}</td>
                <td>
                  <ul>
                    {order.products.map((product) => (
                      <li key={product._id}>
                        {product.name} - Author: {product.author.join(', ')}, Price: ${product.price}
                      </li>
                    ))}
                  </ul>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  }

  export default ViewOrders;