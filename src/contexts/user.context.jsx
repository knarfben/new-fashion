import { createContext, useEffect, useState } from 'react';
import {
  createUserDocumentFromAuth,
  onAuthStateChangedListener,
} from '../utils/firebase/firebase.utils';

export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => {},
});

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const value = { currentUser, setCurrentUser };

  useEffect(
    () =>
      onAuthStateChangedListener((user) => {
        if (user) {
          createUserDocumentFromAuth(user);
        }
        setCurrentUser(user);
      }),
    []
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
