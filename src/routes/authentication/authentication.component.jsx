import './authentication.styles.scss';
import {
  signInWithGooglePopup,
  createUserProfileDocument,
} from '../../utils/firebase/firebase.utils';
import SignUpForm from '../../components/sign-up-form/sign-up-form.component';
import SignIn from '../../components/sign-in-form/sign-in-form.component';

const Authentication = () => {
  return (
    <div className="authentication-container">
      <SignIn />
      <SignUpForm />
    </div>
  );
};

export default Authentication;
