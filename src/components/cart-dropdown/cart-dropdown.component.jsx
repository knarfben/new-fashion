import './cart-dropdown.styles.scss';
import Button from '../button/button.component';
import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';
import CartItem from '../cart-item/cart-item.component';
import { useNavigate } from 'react-router-dom';
import { useDetectClickOutside } from 'react-detect-click-outside';

const CartDropdown = () => {
  const { cartItems, cartCount, toggleCartOpen } = useContext(CartContext);
  const ref = useDetectClickOutside({
    onTriggered: toggleCartOpen,
  });
  const navigate = useNavigate();
  const goToCheckoutHandler = () => {
    navigate('/checkout');
    toggleCartOpen();
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
