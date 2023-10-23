import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import Cart from '../components/Cart';
import EditProductDetails from '../components/EditProduct'
import { useStoreContext } from '../utils/GlobalState';
import {
  REMOVE_FROM_CART,
  UPDATE_CART_QUANTITY,
  ADD_TO_CART,
  UPDATE_PRODUCTS,
} from '../utils/actions';
import { QUERY_PRODUCTS } from '../utils/queries';
import { idbPromise } from '../utils/helpers';
import spinner from '../assets/spinner.gif';
import AuthService from '../utils/auth';

const isAdmin = AuthService.checkAdmin();

function Detail() {
  const [state, dispatch] = useStoreContext();
  const { id } = useParams();

  const [currentProduct, setCurrentProduct] = useState({});

  const { loading, data } = useQuery(QUERY_PRODUCTS);

  const { products, cart } = state;

  useEffect(() => {
    // already in global store
    if (products.length) {
      setCurrentProduct(products.find((product) => product._id === id));
    }
    // retrieved from server
    else if (data) {
      dispatch({
        type: UPDATE_PRODUCTS,
        products: data.products,
      });

      data.products.forEach((product) => {
        idbPromise('products', 'put', product);
      });
    }
    // get cache from idb
    else if (!loading) {
      idbPromise('products', 'get').then((indexedProducts) => {
        dispatch({
          type: UPDATE_PRODUCTS,
          products: indexedProducts,
        });
      });
    }
  }, [products, data, loading, dispatch, id]);

  const addToCart = () => {
    const itemInCart = cart.find((cartItem) => cartItem._id === id);
    if (itemInCart) {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: id,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
      });
      idbPromise('cart', 'put', {
        ...itemInCart,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
      });
    } else {
      dispatch({
        type: ADD_TO_CART,
        product: { ...currentProduct, purchaseQuantity: 1 },
      });
      idbPromise('cart', 'put', { ...currentProduct, purchaseQuantity: 1 });
    }
  };

  const removeFromCart = () => {
    dispatch({
      type: REMOVE_FROM_CART,
      _id: currentProduct._id,
    });

    idbPromise('cart', 'delete', { ...currentProduct });
  };

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const openEditModal = () => {
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };

  const refreshPage = () => {
    window.location.reload();
  }

  return (
    <>
      {currentProduct && cart ? (
        <div className="container my-1">
          <Link to="/">← Back to Products</Link>

          <div style={{ display: 'flex' }}>
            <div style={{ flex: 1 }}>
              <img
                src={`${currentProduct.image}`}
                alt={currentProduct.name}
                style={{ maxWidth: '100%', height: 'auto' }}
              />
            </div>

            <div style={{ flex: 1, marginLeft: '20px' }}>
              <h2>{currentProduct.name}</h2>
              <p>{currentProduct.description}</p>
              <h4> {currentProduct.tags}</h4>
              <strong>Price:</strong>${currentProduct.price}{' '}
              {isAdmin ? (
                <>
                  <button onClick={openEditModal}>Edit Product Details</button>
                  {isEditModalOpen && (
                    <EditProductDetails
                      currentProduct={currentProduct}
                      closeEditModal={closeEditModal}
                      refreshPage={refreshPage} 
                    />
                  )}
                </>
              ) : (
                <>
                  <button onClick={addToCart}>Add to Cart</button>
                  <button
                    disabled={!cart.find((p) => p._id === currentProduct._id)}
                    onClick={removeFromCart}
                  >
                    Remove from Cart
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      ) : null}
      {loading ? <img src={spinner} alt="loading" /> : null}
      <Cart />
    </>
  );
}

export default Detail;