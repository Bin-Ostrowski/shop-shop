import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";

import { useStoreContext } from "../../utils/GlobalState";
import { UPDATE_PRODUCTS } from "../../utils/actions";

import ProductItem from "../ProductItem";
import { QUERY_PRODUCTS } from "../../utils/queries";
import spinner from "../../assets/spinner.gif";

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
    // to having an actual value
    if (data) {
      // execute dispatch() function
      dispatch({
        // it's the UPDATE_PRODUCTS action
        type: UPDATE_PRODUCTS,
        // and it should save the array of product data to global store
        products: data.products,
      });
    }
    // useStoreContext() executes again,
    // giving us the product data needed display products to the page
  }, [data, dispatch]);

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
