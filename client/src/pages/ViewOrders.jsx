import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { gql } from '@apollo/client'; 
import React, { useState } from 'react';
import Table from 'react-bootstrap/Table';
import { QUERY_ORDERS } from '../utils/queries';


const initialFilters = {
  filterOption: 'none', 
};

function ViewOrders() {
  const [filters, setFilters] = useState(initialFilters); 
  const { loading, error, data } = useQuery(QUERY_ORDERS, {
    variables: { shipped: filters.filterOption === 'shipped', completed: filters.filterOption === 'completed' },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const orders = data.viewOrders;

  function calculateTotal(products) {
    return products.reduce((total, product) => total + product.price, 0);
  }

  const handleFilterChange = (event) => {
    const { value } = event.target;
    setFilters({
      ...filters,
      filterOption: value,
    });
  };

    return (
        <>
            <h1> testing</h1>
        </>
    )
}

export default ViewOrders;
