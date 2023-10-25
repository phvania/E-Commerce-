// import CategoryMenu from "../components/CategoryMenu";
import ProductItem from "../components/ProductItem";
// import filterCriteria from  "../components/models";
// import saleProducts from "../components/CategoryMenu"; 
//import  image from "../client/public/images";


import { useStoreContext } from "../utils/GlobalState";
// import { UPDATE_PRODUCTS } from '../utils/actions';
import { useQuery } from '@apollo/client';
import { QUERY_SALES } from '../utils/queries';

// import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';

const Sales = () => {
    // console.log('hello')
    const [state, dispatch] = useStoreContext();

    const { loading, data } = useQuery(QUERY_SALES);
    // console.log(data)

    // setUpdatedProducts(updatedFilteredProducts);
    //     }, [filterCriteria, saleProducts]);
    const products = data?.getSales || []
    // console.log(products)
    return (
        <div className="sale-page">
            <h3>Books on 30% off:</h3>
            
            <div className="flex-row product-list ">
 
                 {products.map((product) => {
                     return ( <ProductItem  key={product._id}
                        _id={product._id}
                        image={product.image}
                        name={product.name}
                        price={product.price}
                        quantity={product.quantity}
                         />)
                    
                })} 
                
                
            </div>
        </div>
    )

}

export default Sales;