// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
} from 'firebase/auth';

import {
  getFirestore,
  collection,
  getDoc,
  addDoc,
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  onSnapshot,
} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCmNpUD5ERQnZrSFRhVnPWkpx8NlKrScoA',
  authDomain: 'new-fashion-7d480.firebaseapp.com',
  projectId: 'new-fashion-7d480',
  storageBucket: 'new-fashion-7d480.appspot.com',
  messagingSenderId: '89589618898',
  appId: '1:89589618898:web:94d6b21dfd2196cfa5f50b',
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const provide = new GoogleAuthProvider();
provide.setCustomParameters({ prompt: 'select_account' });

const auth = getAuth();
export const signInWithGooglePopup = () => {
  return signInWithPopup(auth, provide);
};

export const db = getFirestore(firebaseApp);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = doc(db, 'users', userAuth.uid);
  const snapShot = await getDoc(userRef);

  if (!snapShot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userRef, {
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const createAuthUserWithEmailAndPassword = async (
  email,
  password,
  displayName
) => {
  try {
    const { user } = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    await createUserProfileDocument(user, { displayName });
  } catch (error) {
    console.log(error);
  }
};
