// import CategoryMenu from "../components/CategoryMenu";
import ProductList from "../components/ProductList";
// import filterCriteria from  "../components/models";
// import saleProducts from "../components/CategoryMenu"; 

import { useStoreContext } from "../utils/GlobalState";
import { UPDATE_PRODUCTS } from '../utils/actions';
import { useQuery } from '@apollo/client';
import { QUERY_PRODUCTS } from '../utils/queries';

// import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

const Sales = () => {

    const [state, dispatch] = useStoreContext();

    const { loading, data } = useQuery(QUERY_PRODUCTS);

    useEffect(() => {
        if (data) {
            dispatch({
                type: UPDATE_PRODUCTS,
                products: data.products,
            });
             console.log(data)
        //     data.products.forEach((product) => {
        //         idbPromise('products', 'put', product);
        //     });
        // } else if (!loading) {
        //     idbPromise('products', 'get').then((products) => {
        //         dispatch({
        //             type: UPDATE_PRODUCTS,
        //             products: products,
        //         });
        //     });
        }
    }, [data, loading, dispatch]);

    return (
        <div>
            <h3> current Sales: </h3>
            <p></p>
            <h3>All Sales Products:</h3>
            {/* const { `Image, ProductItem price, quentity`} = ProductItem */}
            <ProductList />
        </div>
    )

}

export default Sales;