// import { useEffect } from 'react';
import ProductItem from '../ProductItem';
import { useStoreContext } from '../../utils/GlobalState';
// import { FILTER_SORT_PRODUCTS } from '../../utils/actions';
import { useQuery } from '@apollo/client';
// change this to filter sort querry
import { QUERY_FILTER_SORT_PRODUCTS } from '../../utils/queries';
// import { idbPromise } from '../../utils/helpers';
import spinner from '../../assets/spinner.gif';
import Search from '../../pages/Search';


function SearchList() {
  const [state, dispatch] = useStoreContext();
    console.log('inside search list')
  const { min, max, filter, sort } = state;
  console.log('==========')
  console.log(min, max, filter, sort)

    // use new querry with new state args
  const { loading, error, data } = useQuery(QUERY_FILTER_SORT_PRODUCTS, {
    variables: { min: parseInt(min), max: parseInt(max), filter: filter, sort: sort},
  });
  console.log('data')
  console.log(data);
  console.log(error)

//   const products = data.products || [];
const products = data?.filterProducts || [];
console.log(products)



  return (
    <div className="my-2">
      <h2>Our Products:</h2>
      {products.length ? (
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