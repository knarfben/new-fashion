import { Outlet, Link } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../../contexts/user.context';
import { ReactComponent as Logo } from '../../assets/fashion-company.svg';
import './navigation.styles.scss';
import { signOutUser } from '../../utils/firebase/firebase.utils';

const Navigation = () => {
  const { currentUser } = useContext(UserContext);

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
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default Navigation;
