import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';
import './cart-icon.styles.scss';
import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';

const CartIcon = ({ toggleCartDropdown }) => {
  const { cartItems } = useContext(CartContext);
  const itemCount = cartItems.reduce(
    (previous, current) => previous + current.quantity,
    0
  );
  return (
    <div className="cart-icon-container" onClick={toggleCartDropdown}>
      <ShoppingIcon className="shopping-icon" />
      <span className="item-count">{itemCount}</span>
    </div>
  );
};

export default CartIcon;
