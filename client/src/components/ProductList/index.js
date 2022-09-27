import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { useStoreContext } from "../../utils/GlobalState";
import { UPDATE_PRODUCTS } from "../../utils/actions";
import { QUERY_PRODUCTS } from "../../utils/queries";
import ProductItem from "../ProductItem";
import spinner from "../../assets/spinner.gif";
import { idbPromise } from "../../utils/helpers";

function ProductList() {
  // immediately execute the useStoreContext() to retrieve the current
  // global state object and the dipatch() method to update state
  const [state, dispatch] = useStoreContext();
  // destructure the currentCategory data out of the state object so
  // can use it in the filterProducts() function.
  const { currentCategory } = state;
  const { loading, data } = useQuery(QUERY_PRODUCTS);

  // implement useEffect()in order to wait for useQuery() response
  useEffect(() => {
    // Once data object returned from useQuery() goes from undefined
    // to having an actual value stored
    if (data) {
      // store it in global state object
      dispatch({
        // it's the UPDATE_PRODUCTS action
        type: UPDATE_PRODUCTS,
        // and it should save the array of product data to global store
        products: data.products,
      });

      // take each product and save to IndexedDB using the helper function
      data.products.forEach((product) => {
        idbPromise("products", "put", product);
      });
    } else if (!loading) {
      // because we're now offline, get all data from `products` store in IndexedDB
      idbPromise("products", "get").then((products) => {
        // use retrieved data to set global state for offline browsing
        dispatch({
          type: UPDATE_PRODUCTS,
          products: products,
        });
      });
    }
    // useStoreContext() executes again,
    // giving us the product data needed display products to the page
  }, [data, loading, dispatch]);

  function filterProducts() {
    if (!currentCategory) {
      return state.products;
    }
    return state.products.filter(
      (product) => product.category._id === currentCategory
    );
  }

  return (
    <div className="my-2">
      <h2>Our Products:</h2>
      {state.products.length ? (
        <div className="flex-row">
          {filterProducts().map((product) => (
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
        <h3>You haven't added any products yet!</h3>
      )}
      {loading ? <img src={spinner} alt="loading" /> : null}
    </div>
  );
}

export default ProductList;
