import './checkout-item.styles.scss';
import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';

const CheckoutItem = ({ item }) => {
  const { name, quantity, price, imageUrl, id } = item;
  const {
    cartItems,
    setCartItems,
    addItemToCart,
    removeItemFromCart,
    deleteProduct,
  } = useContext(CartContext);

  const deleteProductHandler = () => {
    deleteProduct(item);
  };
  return (
    <div className="checkout-item-container">
      <img className="image-container" src={imageUrl} alt={`${name}`} />
      <span className="description">{name}</span>
      <span className="quantity">
        <span onClick={() => addItemToCart(item)}>+</span>&nbsp;{quantity}&nbsp;
        <span onClick={() => removeItemFromCart(item)}>-</span>
      </span>
      <span className="price">{price}$</span>
      <span className="remove-button" onClick={deleteProductHandler}>
        x
      </span>
    </div>
  );
};

export default CheckoutItem;
