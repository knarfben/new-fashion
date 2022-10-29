import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';
import './cart-icon.styles.scss';

import { useSelector } from 'react-redux';
import { selectCartCount } from '../../store/cart/cart.selector';

const CartIcon = ({ toggleCartDropdown }) => {
  const cartCount = useSelector(selectCartCount);
  return (
    <div className="cart-icon-container" onClick={toggleCartDropdown}>
      <ShoppingIcon className="shopping-icon" />
      <span className="item-count">{cartCount}</span>
    </div>
  );
};

export default CartIcon;
