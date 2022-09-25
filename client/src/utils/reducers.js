// import actions
import {
  UPDATE_PRODUCTS,
  UPDATE_CATEGORIES,
  UPDATE_CURRENT_CATEGORY,
} from "../utils/actions";

import { useReducer } from 'react';

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
};
