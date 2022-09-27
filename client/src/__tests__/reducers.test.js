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

import { reducer } from "../utils/reducers";

// create sample of global state
const initialState = {
  products: [],
  categories: [{ name: "Food" }],
  currentCategory: "1",
  cart: [
    {
      _id: "1",
      name: "Soup",
      purchaseQuantity: 1,
    },
    {
      _id: "2",
      name: "Bread",
      purchaseQuantity: 2,
    },
  ],
  cartOpen: false,
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
test("UPDATE_CURRENT_CATEGORY", () => {
  let newState = reducer(initialState, {
    type: UPDATE_CURRENT_CATEGORY,
    currentCategory: "2",
  });

  // compare newState and initialState to confirm initialState has remained
  // the same
  expect(newState.currentCategory).toBe("2");
  expect(initialState.currentCategory).toBe("1");
});

// Add to cart
test("ADD_TO_CART", () => {
  let newState = reducer(initialState, {
    type: ADD_TO_CART,
    product: { purchaseQuantity: 1 },
  });

  expect(newState.cart.length).toBe(3);
  expect(initialState.cart.length).toBe(2);
});

// add multiple to cart
test("ADD_MULTIPLE_TO_CART", () => {
  let newState = reducer(initialState, {
    type: ADD_MULTIPLE_TO_CART,
    products: [{}, {}],
  });

  expect(newState.cart.length).toBe(4);
  expect(initialState.cart.length).toBe(2);
});

// Remove from cart
test("REMOVE_FROM_CART", () => {
  let newState1 = reducer(initialState, {
    type: REMOVE_FROM_CART,
    _id: "1",
  });

  // cart is still open
  expect(newState1.cartOpen).toBe(true);

  // second item should now be the first
  expect(newState1.cart.length).toBe(1);
  expect(newState1.cart[0]._id).toBe("2");

  let newState2 = reducer(newState1, {
    type: REMOVE_FROM_CART,
    _id: "2",
  });

  // cart is empty and closed
  expect(newState2.cartOpen).toBe(false);
  expect(newState2.cart.length).toBe(0);

  expect(initialState.cart.length).toBe(2);
});

// Udate Quantity in cart
test('UPDATE_CART_QUANTITY', () => {
  let newState = reducer(initialState, {
    type: UPDATE_CART_QUANTITY,
    _id: '1',
    purchaseQuantity: 3
  });

  expect(newState.cartOpen).toBe(true);
  // only first item's quantity is updated, because its _id matches
  // the _id given to the reducer() function
  expect(newState.cart[0].purchaseQuantity).toBe(3);
  // second item should remain the same
  expect(newState.cart[1].purchaseQuantity).toBe(2);

  expect(initialState.cartOpen).toBe(false);
});

// expects the cart to be empty (and closed) 
//after the CLEAR_CART action is called
test('CLEAR_CART', () => {
  let newState = reducer(initialState, {
    type: CLEAR_CART
  });

  expect(newState.cartOpen).toBe(false);
  expect(newState.cart.length).toBe(0);
  expect(initialState.cart.length).toBe(2);
});

// expects cartOpen to be opposite of its previous value each time 
// the action is called
test('TOGGLE_CART', () => {
  let newState = reducer(initialState, {
    type: TOGGLE_CART
  });

  expect(newState.cartOpen).toBe(true);
  expect(initialState.cartOpen).toBe(false);

  let newState2 = reducer(newState, {
    type: TOGGLE_CART
  });

  expect(newState2.cartOpen).toBe(false);
});
