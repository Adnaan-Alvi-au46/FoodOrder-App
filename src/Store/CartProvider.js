import React, { useReducer } from "react";
import CartContext from "./cart-context";

const defaultCartState = {
  items: [],
  totalamount: 0,
};

const cartReducer = (state, action) => {
//   console.log(state.tems);
//   console.log(action.tems);
if (action.type === 'ADD') {
  const updatedTotalAmount =
    state.totalAmount + action.item.price * action.item.amount;

  const existingCartItemIndex = state.items.findIndex(
    (item) => item.id === action.item.id
  );
  const existingCartItem = state.items[existingCartItemIndex];
  let updatedItems;

  if (existingCartItem) {
    const updatedItem = {
      ...existingCartItem,
      amount: existingCartItem.amount + action.item.amount,
    };
    updatedItems = [...state.items];
    updatedItems[existingCartItemIndex] = updatedItem;
  } else {
    updatedItems = state.items.concat(action.item);
  }

  return {
    items: updatedItems,
    totalAmount: updatedTotalAmount,
  };
}
//   if (action.type === "REMOVE") {
//     return;
//   }
  return defaultCartState;
};

const CartProvider = (props) => {
  const [cartState, dispacthCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  console.log(cartState);

  const addItemToCartHandler = (item) => {
    console.log(item);
    dispacthCartAction({ type: "ADD", item: item });
  };

  const removeItemFromCartHandler = (id) => {
    dispacthCartAction({ type: "REMOVE", id: id });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalamount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
