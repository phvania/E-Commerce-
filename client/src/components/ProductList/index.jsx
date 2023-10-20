import { useEffect } from 'react';
import ProductItem from '../ProductItem';
import { useStoreContext } from '../../utils/GlobalState';
import { UPDATE_PRODUCTS } from '../../utils/actions';
import { useQuery } from '@apollo/client';
import { QUERY_PRODUCTS } from '../../utils/queries';
import { idbPromise } from '../../utils/helpers';
import spinner from '../../assets/spinner.gif';

function ProductList() {
  const [state, dispatch] = useStoreContext();

  // const { currentCategory } = state;

  const currentCategory = '6532af6dbc3eaef92634935b'
  const { loading, data } = useQuery(QUERY_PRODUCTS, {variables: {categoryID: currentCategory}});

  console.log(data);
  useEffect(() => {
    if (data) {
      dispatch({
        type: UPDATE_PRODUCTS,
        products: data.products,
      });
      data.products.forEach((product) => {
        idbPromise('products', 'put', product);
      });
    } else if (!loading) {
      idbPromise('products', 'get').then((products) => {
        dispatch({
          type: UPDATE_PRODUCTS,
          products: products,
        });
      });
    }
  }, [data, loading, dispatch]);

  function filterProducts() {

    if (!currentCategory) {
      return state.products;

    } else if (currentCategory) {
      return state.products.filter(
        (product) => product.category._id === currentCategory
      );
    }
  }

  function quickSort(array, order) {
    // sorts in ascending order
    // escape case for small arrays, or no sorting order
    if (array.length <= 1 || !order) {
      return array;
    }
    const pivot = array.splice(Math.floor(Math.random() * array.length), 1);
    const left = [];
    const right = [];
    array.forEach((el) => {
      if (order == 'asc') {
        if (el.price <= pivot.price) {
          left.push(el);
        } else {
          right.push(el);
        }
      } else if (order == 'desc') {
        if (el.price > pivot.price) {
          left.push(el);
        } else {
          right.push(el);
        }
      } else if (order == 'new') {
        // sort asc
      } else if (order == 'old') {
        // sort desc
      }
    });
    return quickSort(left).concat(pivot, quickSort(right));
  }

  function sortProducts(products) {
    // sorts an array of products based upon state.sort string
    let sorted = quickSort(products, state.sort);
    return sorted
  }

  return (
    <div className="my-2">
      <h2>Our Products:</h2>
      {state.products.length ? (
        <div className="flex-row">
          {sortProducts(filterProducts().map((product) => (
            <ProductItem
              key={product._id}
              _id={product._id}
              image={product.image}
              name={product.name}
              price={product.price}
              quantity={product.quantity}
            />
          )))}
        </div>
      ) : (
        <h3>You haven't added any products yet!</h3>
      )}
      {loading ? <img src={spinner} alt="loading" /> : null}
    </div>
  );
}

export default ProductList;
