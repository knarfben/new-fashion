export const selectCartItems = (state) => state.cart.items;

export const selectIsCartOpen = (state) => state.cart.isCartOpen;

export const selectCartCount = (state) =>
  state.cart.items.reduce((acc, curr) => {
    return acc + curr.quantity;
  }, 0);

export const selectCartTotal = (state) =>
  state.cart.items.reduce((acc, curr) => {
    return acc + curr.quantity * curr.price;
  }, 0);
