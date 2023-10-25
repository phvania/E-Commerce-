import { useState, useEffect } from 'react';
import ProductItem from '../ProductItem';
import { useStoreContext } from '../../utils/GlobalState';
import { UPDATE_PRODUCTS } from '../../utils/actions';
import { useQuery } from '@apollo/client';
import { QUERY_PRODUCTS } from '../../utils/queries';
import { idbPromise } from '../../utils/helpers';
import spinner from '../../assets/spinner.gif';
import AuthService from '../../utils/auth';
import AddProduct from '../AddProduct/index'


const isAdmin = AuthService.checkAdmin();


function ProductList() {
  const [state, dispatch] = useStoreContext();

  const { currentCategory } = state;
  // console.log("currentCategory -->", currentCategory)
  const { loading, data } = useQuery(QUERY_PRODUCTS, {
    variables: { categoryID: currentCategory || null }, // Pass null when "All" is selected
  });


  useEffect(() => {
    // console.log('loading:', loading);
    // console.log('data:', data);
    if (data) {
      dispatch({
        type: UPDATE_PRODUCTS,
        products: data.products,
      });
      data.products.forEach((product) => {
        idbPromise('products', 'put', product);
      });

      // console.log("my data -->", data)
      // console.log(data.products)
    } else if (!loading) {
      idbPromise('products', 'get').then((products) => {
        dispatch({
          type: UPDATE_PRODUCTS,
          products: products,
        });
      });
      // console.log("b ad data -->", data)
    }
  }, [data, loading, dispatch]);

  function filterProducts() {
    return state.products
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

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const openAddModal = () => {
    setIsAddModalOpen(true);
  };

  const closeAddModal = () => {
    setIsAddModalOpen(false);
  };

  const refreshPage = () => {
    window.location.reload();
  }


  return (
    <div className="my-2">
      <h2>Our Products:</h2>
      {isAdmin ? (
        <>
          <button onClick={openAddModal}>Add Product</button>
          {isAddModalOpen && (
            <AddProduct
              closeEditModal={closeAddModal}
              refreshPage={refreshPage}
            />
          )}
        </>
      ) : (
        null
      )}
      {state.products.length ? (
        <div className="flex-row">
          <div className="flex-row">
            {filterProducts().map((product) => (
              <ProductItem
                key={product._id}
                _id={product._id}
                image={product.image}
                name={product.name}
                author={product.author}
                price={product.price}
                quantity={product.quantity}
                style={{ margin: '10px' }}
              />
            ))}
          </div>
        </div>
      ) : (
        <h3>You haven't added any products yet!</h3>
      )}
      {loading ? <img src={spinner} alt="loading" /> : null}
    </div>
  );
}

export default ProductList;