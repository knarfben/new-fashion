import { Outlet, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectCurrentUser } from '../../store/user/user.selector';
import { ReactComponent as Logo } from '../../assets/fashion-company.svg';
import './navigation.styles.scss';
import { signOutUser } from '../../utils/firebase/firebase.utils';
import CartIcon from '../../components/cart-icon/cart-icon.component';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';
import { toggleCartOpen } from '../../store/cart/cart.action';
import { selectIsCartOpen } from '../../store/cart/cart.selector';

const Navigation = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const isCartOpen = useSelector(selectIsCartOpen);
  const toggleCartDropdown = (e) => {
    e.stopPropagation();
    dispatch(toggleCartOpen());
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
