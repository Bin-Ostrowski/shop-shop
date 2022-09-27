import React from "react";
import { Link } from "react-router-dom";
import { pluralize } from "../../utils/helpers";
import { useStoreContext } from "../../utils/GlobalState";
import { ADD_TO_CART, UPDATE_CART_QUANTITY } from "../../utils/actions";

function ProductItem(item) {

  // define a state variable and dispatch() function to update state
  const [state, dispatch] = useStoreContext();

 // declare cart as variable to avoid writing state.cart
 const { cart } = state;

  const addToCart = () => {
    // find cart item with matching id
    const itemInCart = cart.find((cartItem) => cartItem._id === _id);

    // if matching, call UPDATE with new purchase quanity
    if (itemInCart) {
      // call UPDATE_CART_QUANTITY
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: _id,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
      });
    } else {
      // call the ADD_TO_CART action
      dispatch({
        type: ADD_TO_CART,
        product: { ...item, purchaseQuantity: 1 }
      });

    }
  };

  const { image, name, _id, price, quantity } = item;

  return (
    <div className="card px-1 py-1">
      <Link to={`/products/${_id}`}>
        <img alt={name} src={`/images/${image}`} />
        <p>{name}</p>
      </Link>
      <div>
        <div>
          {quantity} {pluralize("item", quantity)} in stock
        </div>
        <span>${price}</span>
      </div>
      {/* onClick reference the addToCart() function  */}
      <button onClick={addToCart}>Add to cart</button>
    </div>
  );
}

export default ProductItem;
