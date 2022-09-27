// import actions
import {
  UPDATE_PRODUCTS,
  UPDATE_CATEGORIES,
  UPDATE_CURRENT_CATEGORY,
  ADD_TO_CART,
  ADD_MULTIPLE_TO_CART,
  REMOVE_FROM_CART,
  UPDATE_CART_QUANTITY,
  CLEAR_CART,
  TOGGLE_CART,
} from "../utils/actions";

import { useReducer } from "react";

// update product
export const reducer = (state, action) => {
  switch (action.type) {
    // if action type value is value of `UPDATED_PRODUCTS`, return new state
    // object with an updated products array
    case UPDATE_PRODUCTS:
      return {
        // If it's that action type, return new object with copy of state
        // argument using spread ... operator and set products key to value
        // of a new array with the action.products value spread across it
        ...state,
        products: [...action.products],
      };

    // if action type value is `UPDATE_CATEGORIES`
    // return new state object with an updated categories array
    case UPDATE_CATEGORIES:
      return {
        ...state,
        categories: [...action.categories],
      };

    case UPDATE_CURRENT_CATEGORY:
      return {
        ...state,
        currentCategory: action.currentCategory,
      };

    case ADD_TO_CART:
      return {
        //preserve everything else on state
        ...state,
        // set cartOpen to true so that users can immediately view
        // the cart with the newly added item
        cartOpen: true,
        cart: [...state.cart, action.product],
      };

    case ADD_MULTIPLE_TO_CART:
      return {
        ...state,
        cart: [...state.cart, ...action.products],
      };

    case REMOVE_FROM_CART:
      // filter() method only keeps items not matching provided _id
      let newState = state.cart.filter((product) => {
        return product._id !== action._id;
      });

      return {
        ...state,
        // check length of array to set cartOpen to false when array is empty
        cartOpen: newState.length > 0,
        cart: newState,
      };

    case UPDATE_CART_QUANTITY:
      return {
        ...state,
        cartOpen: true,
        // use map() to create new array so original state is immutable
        cart: state.cart.map((product) => {
          if (action._id === product._id) {
            product.purchaseQuantity = action.purchaseQuantity;
          }
          return product;
        }),
      };

    //cart to be empty (and closed) after CLEAR_CART action is called
    case CLEAR_CART:
      return {
        ...state,
        cartOpen: false,
        cart: [],
      };

    case TOGGLE_CART:
      return {
        ...state,
        cartOpen: !state.cartOpen
      };

    // if it's none of these actions, do not update state at all and keep
    // things the same
    default:
      return state;
  }
};

// useProductReducer(), will help initialize global state object then provide
// functionality for updating state by automatically running it through reducer()
// this is like a more-indepth way of using useState() Hook.
export function useProductReducer(initialState) {
  return useReducer(reducer, initialState);
}
