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
      <div className="image-container">
        <img src={imageUrl} alt={`${name}`} />
      </div>
      <span className="name">{name}</span>
      <div className="quantity">
        <div className="arrow" onClick={() => removeItemFromCart(item)}>
          &#10094;
        </div>
        <span className="value">{quantity}</span>
        <div className="arrow" onClick={() => addItemToCart(item)}>
          &#10095;
        </div>
      </div>
      <span className="price">${price}</span>
      <span className="remove-button" onClick={deleteProductHandler}>
        &#10005;
      </span>
    </div>
  );
};

export default CheckoutItem;
