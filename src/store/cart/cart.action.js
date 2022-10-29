import { createAction } from '../../utils/reducer/reducer.utils';
import { CART_ACTION_TYPES } from './cart.types';

const addCartItem = (cartItems, productToAdd) => {
  const existingCartItem = cartItems.find((i) => {
    return i.id === productToAdd.id;
  });
  if (existingCartItem) {
    return cartItems.map((i) => {
      return i.id === productToAdd.id ? { ...i, quantity: i.quantity + 1 } : i;
    });
  }
  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const removeCartItem = (cartItems, productToRemove) => {
  // find corresponding product
  const existingCartItem = cartItems.find((i) => {
    return i.id === productToRemove.id;
  });

  if (existingCartItem.quantity === 1) {
    return cartItems.filter((i) => i.id !== productToRemove.id);
  } else {
    return cartItems.map((i) =>
      i.id === existingCartItem.id
        ? { ...existingCartItem, quantity: existingCartItem.quantity - 1 }
        : i
    );
  }
};

const updateCartItems = (newCartItems) => {
  console.log({ newCartItems });
  return {
    type: CART_ACTION_TYPES.SET_CART_ITEMS,
    payload: { items: newCartItems },
  };
};

export const toggleCartOpen = () =>
  createAction(CART_ACTION_TYPES.TOGGLE_CART_OPEN, null);

export const addItemToCart = (cartItems, product) =>
  updateCartItems(addCartItem(cartItems, product));

export const removeItemFromCart = (cartItems, productToRemove) =>
  updateCartItems(removeCartItem(cartItems, productToRemove));

export const deleteProduct = (cartItems, productToBeDeleted) =>
  updateCartItems(cartItems.filter((i) => i.id !== productToBeDeleted.id));
