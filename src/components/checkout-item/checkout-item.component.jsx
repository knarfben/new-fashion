import './checkout-item.styles.scss';
import { useSelector, useDispatch } from 'react-redux';
import { selectCartItems } from '../../store/cart/cart.selector';
import {
  deleteProduct,
  removeItemFromCart,
  addItemToCart,
} from '../../store/cart/cart.action';

const CheckoutItem = ({ item }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);

  const { name, quantity, price, imageUrl } = item;

  const addItemToCartHandler = (item) => {
    dispatch(addItemToCart(cartItems, item));
  };

  const deleteProductHandler = (item) => {
    dispatch(deleteProduct(cartItems, item));
  };

  const removeItemFromCartHandler = (item) => {
    dispatch(removeItemFromCart(cartItems, item));
  };

  return (
    <div className="checkout-item-container">
      <div className="image-container">
        <img src={imageUrl} alt={`${name}`} />
      </div>
      <span className="name">{name}</span>
      <div className="quantity">
        <div className="arrow" onClick={() => removeItemFromCartHandler(item)}>
          &#10094;
        </div>
        <span className="value">{quantity}</span>
        <div className="arrow" onClick={() => addItemToCartHandler(item)}>
          &#10095;
        </div>
      </div>
      <span className="price">${price}</span>
      <span
        className="remove-button"
        onClick={() => deleteProductHandler(item)}
      >
        &#10005;
      </span>
    </div>
  );
};

export default CheckoutItem;
