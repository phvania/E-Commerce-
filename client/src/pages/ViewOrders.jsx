import { Link } from 'react-router-dom';

import { useQuery } from '@apollo/client';
import { QUERY_ORDERS } from '../utils/queries';

function ViewOrders() {
    const { data } = useQuery(QUERY_ORDERS);
    let orders;

    if (data) {
        orders = data;
        console.log('orders ---->',orders )
    }


    return (
        <>
        
        </>
    )
}

export default ViewOrders;