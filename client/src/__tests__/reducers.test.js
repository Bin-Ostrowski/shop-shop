// import actions
import {
  UPDATE_PRODUCTS,
  UPDATE_CATEGORIES,
  UPDATE_CURRENT_CATEGORY,
} from "../utils/actions";

import { reducer } from "../utils/reducers";

// create sample of global state
const initialState = {
  products: [],
  categories: [{ name: "Food" }],
  currentCategory: "1",
};

// test updating product list
// copy staate into a new object and compare original to updated state objects
test("UPDATE_PRODUCTS", () => {
  // newState object come from function reducer()
  // function accepts the following two parameters:
  // urrent state object, to make copy of it for the new state.
  let newState = reducer(initialState, {
    // and action to update state, which is in two parts as an object:
    // type of action performing, should be one of predefined actions
    type: UPDATE_PRODUCTS,
    //value: This won't always have the name value, but it is a name
    //representative of the new data we want to use with the action.
    products: [{}, {}],
  });
  // here, pass in the current state held in initialState and then our action,
  // indicating to update products list with the contents held in the products
  // array. They're just empty objects for now, but to see if we are adding
  // anything to the array and nothing specific.

  //confirm that we successfully added our products to the newState
  expect(newState.products.length).toBe(2);
  //didn't affect initialState in any way, shape, or form.
  expect(initialState.products.length).toBe(0);
});

// test how we can update the categories array
test("UPDATE_CATEGORIES", () => {
  // execute the reducer() function, we still pass in the initialState
  let newState = reducer(initialState, {
    // execute the UPDATE_CATEGORIES action
    type: UPDATE_CATEGORIES,
    // update category list to be a new array of categories
    categories: [{}, {}],
  });

  // This indicates original state values were not affected
  // and just created a new version of it.
  expect(newState.categories.length).toBe(2);
  expect(initialState.categories.length).toBe(1);
});

// update state of currentCategory to new string value instead of array
test ('UPDATE_CURRENT_CATEGORY', () => {
    let newState = reducer(initialState, {
        type: UPDATE_CURRENT_CATEGORY,
        currentCategory: '2'
    });

    // compare newState and initialState to confirm initialState has remained
    // the same
    expect(newState.currentCategory).toBe('2');
    expect(initialState.currentCategory).toBe('1');
});
