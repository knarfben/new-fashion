import { createContext, useEffect, useReducer } from 'react';

export const CartContext = createContext({
  cartItems: [],
  addItemToCart: () => {},
  cartCount: 0,
  total: 0,
});

const CART_ACTION_TYPES = {
  SET_CART_COUNT: 'SET_CART_COUNT',
  SET_TOTAL_AMOUNT: 'SET_TOTAL_AMOUNT',
  SET_CART_ITEMS: 'SET_CART_ITEMS',
};

const CART_INITIAL_STATE = {
  cartItems: [],
  cartCount: 0,
  total: 0,
};

const cartReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case CART_ACTION_TYPES.SET_CART_COUNT:
      return {
        ...state,
        cartCount: payload,
      };
    case CART_ACTION_TYPES.SET_TOTAL_AMOUNT:
      return {
        ...state,
        total: payload,
      };
    case CART_ACTION_TYPES.SET_CART_ITEMS:
      return {
        ...state,
        cartItems: payload,
      };
    default:
      throw new Error(`Unhandled action type ${type}`);
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, CART_INITIAL_STATE);
  const { cartItems, cartCount, total } = state;

  const setCartCount = (itemsCount) => {
    dispatch({
      type: CART_ACTION_TYPES.SET_CART_COUNT,
      payload: itemsCount,
    });
  };

  const setTotal = (tot) => {
    dispatch({
      type: CART_ACTION_TYPES.SET_TOTAL_AMOUNT,
      payload: tot,
    });
  };

  const setCartItems = (cItems) => {
    dispatch({
      type: CART_ACTION_TYPES.SET_CART_ITEMS,
      payload: cItems,
    });
  };

  useEffect(() => {
    setCartCount(
      cartItems.reduce((total, current) => total + current.quantity, 0)
    );
  }, [cartItems]);

  useEffect(() => {
    setTotal(
      cartItems.reduce(
        (total, current) => total + current.quantity * current.price,
        0
      )
    );
  }, [cartItems]);

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
    setCartItems(addCartItem(productToAdd));
  };

  const removeItemFromCart = (productToRemove) => {
    setCartItems(removeCartItem(productToRemove));
  };

  const deleteProduct = (productToBeDeleted) => {
    setCartItems(cartItems.filter((i) => i.id !== productToBeDeleted.id));
  };

  const value = {
    cartItems,
    setCartItems,
    addItemToCart,
    removeItemFromCart,
    deleteProduct,
    cartCount,
    total,
  };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
