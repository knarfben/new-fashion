import './cart-dropdown.styles.scss';
import { useSelector } from 'react-redux';
import Button from '../button/button.component';
import CartItem from '../cart-item/cart-item.component';
import { useNavigate } from 'react-router-dom';
import { useDetectClickOutside } from 'react-detect-click-outside';
import { useDispatch } from 'react-redux';
import { toggleCartOpen } from '../../store/cart/cart.action';
import {
  selectCartItems,
  selectCartCount,
} from '../../store/cart/cart.selector';

const CartDropdown = () => {
  const cartItems = useSelector(selectCartItems);
  const cartCount = useSelector(selectCartCount);
  const dispatch = useDispatch();
  const ref = useDetectClickOutside({
    onTriggered: () => dispatch(toggleCartOpen()),
  });
  const navigate = useNavigate();
  const goToCheckoutHandler = () => {
    navigate('/checkout');
    dispatch(toggleCartOpen());
  };
  return (
    <div className="cart-dropdown-container" ref={ref}>
      <div className="cart-items">
        {cartItems.length ? (
          cartItems.map((cartItem) => (
            <CartItem key={cartItem.id} item={cartItem} />
          ))
        ) : (
          <span className="empty-message">Your cart is empty</span>
        )}
      </div>
      {!!cartCount && (
        <Button onClick={goToCheckoutHandler}>GO TO CHECKOUT</Button>
      )}
    </div>
  );
};

export default CartDropdown;
