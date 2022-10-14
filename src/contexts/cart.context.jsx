import { createContext, useReducer } from 'react';

export const CartContext = createContext({
  cartItems: [],
  addItemToCart: () => {},
  cartCount: 0,
  total: 0,
});

const CART_ACTION_TYPES = {
  SET_CART_COUNT: 'SET_CART_COUNT',
  TOGGLE_CART_OPEN: 'TOGGLE_CART_OPEN',
  CLOSE_CART: 'CLOSE_CART',
};

const CART_INITIAL_STATE = {
  isCartOpen: false,
  cartItems: [],
  cartCount: 0,
  total: 0,
};

const cartReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case CART_ACTION_TYPES.SET_CART_ITEMS:
      return {
        ...state,
        ...payload,
      };
    case CART_ACTION_TYPES.TOGGLE_CART_OPEN:
      const ret = {
        ...state,
        isCartOpen: payload,
      };
      console.log({ ret });
      return ret;
    default:
      throw new Error(`Unhandled action type ${type}`);
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, CART_INITIAL_STATE);
  const { cartItems, cartCount, total, isCartOpen } = state;

  const updateCartItemsReducer = (newCartItems) => {
    const newCartCount = newCartItems.reduce(
      (total, current) => total + current.quantity,
      0
    );
    const newTotal = newCartItems.reduce(
      (total, current) => total + current.quantity * current.price,
      0
    );
    dispatch({
      type: CART_ACTION_TYPES.SET_CART_ITEMS,
      payload: {
        cartItems: newCartItems,
        cartCount: newCartCount,
        total: newTotal,
      },
    });
  };

  const toggleCartOpen = () => {
    dispatch({
      type: CART_ACTION_TYPES.TOGGLE_CART_OPEN,
      payload: !isCartOpen,
    });
  };

  const addCartItem = (productToAdd) => {
    const existingCartItem = cartItems.find((i) => {
      return i.id === productToAdd.id;
    });
    if (existingCartItem) {
      return cartItems.map((i) => {
        return i.id === productToAdd.id
          ? { ...i, quantity: i.quantity + 1 }
          : i;
      });
    }
    return [...cartItems, { ...productToAdd, quantity: 1 }];
  };

  const removeCartItem = (productToRemove) => {
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

  const addItemToCart = (productToAdd) => {
    updateCartItemsReducer(addCartItem(productToAdd));
  };

  const removeItemFromCart = (productToRemove) => {
    updateCartItemsReducer(removeCartItem(productToRemove));
  };

  const deleteProduct = (productToBeDeleted) => {
    updateCartItemsReducer(
      cartItems.filter((i) => i.id !== productToBeDeleted.id)
    );
  };

  const value = {
    isCartOpen,
    toggleCartOpen,
    cartItems,
    addItemToCart,
    removeItemFromCart,
    deleteProduct,
    cartCount,
    total,
  };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
