import React from "react";
import CartItem from "../CartItem";
import Auth from "../../utils/auth";
import { useStoreContext } from "../../utils/GlobalState";
import { TOGGLE_CART } from "../../utils/actions";
import "./style.css";

const Cart = () => {
  // establish state var and dispatch() function to update state
  const [state, dispatch] = useStoreContext();

  function toggleCart() {
    // dispatch() will call the TOGGLE_CART action
    dispatch({ type: TOGGLE_CART });
  };

  // add up prices of everything saved in state.cart
  function calculateTotal() {
    let sum = 0;
    state.cart.forEach(item => {
        sum += item.price * item.purchaseQuantity;
    });
    return sum.toFixed(2);
  }

  // display closed cart icon when cart is empty/closed
  if (!state.cartOpen) {
    return (
      <div className="cart-closed" onClick={toggleCart}>
        {/* wrap emojis in a <span> include role and aria-label 
        attributes to help screen readers understand context of emoji. */}
        <span role="img" aria-label="trash">
          🛒
        </span>
      </div>
    );
  };
  console.log(state);

  return (
    <div className="cart">
      <div className="close" onClick={toggleCart}>
        [close]
      </div>
      <h2>Shopping Cart</h2>
      {state.cart.length ? (
      <div>
        {/* map items on state.cart into a series of <CartItem /> components.  */}
        {state.cart.map(item => (
        <CartItem key={item._id} item={item} />
        ))}
        <div className="flex-row space-between">
          <strong>Total: ${calculateTotal()}</strong>
          {/* conditionally render the checkout button */}
          {Auth.loggedIn() ? (
            <button>Checkout</button>
          ) : (
            <span>(log in to check out)</span>
          )}
        </div>
      </div>
      ) : (
        <h3>
        <span role="img" aria-label="shocked">
          😱
        </span>
        You haven't added anything to your cart yet!
      </h3>
      )}
    </div>
  );
  
};

export default Cart;
