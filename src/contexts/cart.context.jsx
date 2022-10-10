import { createContext, useState } from 'react';

export const CartContext = createContext({
  cartItems: [],
  addItemToCart: () => {},
});

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
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

  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(productToAdd));
  };

  const value = {
    cartItems,
    addItemToCart,
  };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
