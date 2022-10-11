import { createContext, useEffect, useState } from 'react';

export const CartContext = createContext({
  cartItems: [],
  addItemToCart: () => {},
  cartCount: 0,
  total: 0,
});

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setCartCount(
      cartItems.reduce((total, current) => total + current.quantity, 0)
    );
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
