import { Outlet, Link } from 'react-router-dom';
import { useContext } from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../store/user/user.selector';
import { CartContext } from '../../contexts/cart.context';
import { ReactComponent as Logo } from '../../assets/fashion-company.svg';
import './navigation.styles.scss';
import { signOutUser } from '../../utils/firebase/firebase.utils';
import CartIcon from '../../components/cart-icon/cart-icon.component';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';

const Navigation = () => {
  const currentUser = useSelector(selectCurrentUser);
  const { toggleCartOpen, isCartOpen } = useContext(CartContext);
  const toggleCartDropdown = (e) => {
    e.stopPropagation();
    toggleCartOpen();
  };

  return (
    <>
      <div className="navigation">
        <Link className="logo-container" to="/">
          <Logo className="logo" />
        </Link>
        <div className="nav-links-container">
          <Link className="nav-link" to="/shop">
            SHOP
          </Link>
          {!currentUser ? (
            <Link className="nav-link" to="/auth">
              SIGN IN
            </Link>
          ) : (
            <span className="nav-link" onClick={signOutUser}>
              SIGN OUT
            </span>
          )}
          <CartIcon toggleCartDropdown={toggleCartDropdown} />
        </div>
        {isCartOpen && <CartDropdown />}
      </div>
      <Outlet />
    </>
  );
};

export default Navigation;
