// import { useEffect } from 'react';
import ProductItem from '../ProductItem';
import { useStoreContext } from '../../utils/GlobalState';
// import { FILTER_SORT_PRODUCTS } from '../../utils/actions';
import { useQuery } from '@apollo/client';
// change this to filter sort querry
import { QUERY_FILTER_SORT_PRODUCTS } from '../../utils/queries';
// import { idbPromise } from '../../utils/helpers';
import spinner from '../../assets/spinner.gif';


function SearchList() {
  const [state, dispatch] = useStoreContext();

  const { min, max, filter, sort } = state;

    // use new querry with new state args
  const { loading, data } = useQuery(QUERY_FILTER_SORT_PRODUCTS, {
    variables: { min: min, max: max, filter: filter, sort: sort},
  });
  console.log(data);

//   const products = data.products || [];
const products = data?.products || [];



  return (
    <div className="my-2">
      <h2>Our Products:</h2>
      {state.products.length ? (
        <div className="flex-row">
          {products.map((product) => (
            <ProductItem
              key={product._id}
              _id={product._id}
              image={product.image}
              name={product.name}
              price={product.price}
              quantity={product.quantity}
            />
          ))}
        </div>
      ) : (
        <h3>You have not added any products yet!</h3>
      )}
      {loading ? <img src={spinner} alt="loading" /> : null}
    </div>
  );
}

export default SearchList;