import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth';
import { auth } from '../firebase';

// Helper function to handle Firebase auth errors
// Exported to make it available for use in other files
export const handleAuthError = (error: any): string => {
  const errorCode = error.code || '';
  const errorMessage = error.message || 'An unknown error occurred';
  
  console.error('Firebase Auth Error:', errorCode, errorMessage);
  
  switch(errorCode) {
    case 'auth/configuration-not-found':
      return 'Firebase authentication configuration not found. Please check your Firebase setup.';
    case 'auth/email-already-in-use':
      return 'This email is already in use. Please try another email or sign in.';
    case 'auth/invalid-email':
      return 'Invalid email address format.';
    case 'auth/user-disabled':
      return 'This user account has been disabled.';
    case 'auth/user-not-found':
      return 'No user found with this email address.';
    case 'auth/wrong-password':
      return 'Incorrect password. Please try again.';
    case 'auth/weak-password':
      return 'Password is too weak. Please use a stronger password.';
    case 'auth/network-request-failed':
      return 'Network error. Please check your internet connection.';
    case 'auth/too-many-requests':
      return 'Too many unsuccessful login attempts. Please try again later.';
    case 'auth/popup-closed-by-user':
      return 'Google sign-in was cancelled. Please try again.';
    case 'auth/popup-blocked':
      return 'Pop-up was blocked by your browser. Please allow pop-ups and try again.';
    case 'auth/cancelled-popup-request':
      return 'Google sign-in was cancelled. Please try again.';
    case 'auth/account-exists-with-different-credential':
      return 'An account already exists with the same email address but different sign-in credentials.';
    default:
      return errorMessage;
  }
};

// Sign up with email and password
export const signUp = async (email: string, password: string): Promise<User> => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error: any) {
    throw new Error(handleAuthError(error));
  }
};

// Sign in with email and password
export const signIn = async (email: string, password: string): Promise<User> => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error: any) {
    throw new Error(handleAuthError(error));
  }
};

// Sign out
export const logOut = async (): Promise<void> => {
  try {
    await signOut(auth);
  } catch (error: any) {
    throw new Error(handleAuthError(error));
  }
};

// Sign in with Google
export const signInWithGoogle = async (): Promise<void> => {
  try {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  } catch (error: any) {
    throw new Error(handleAuthError(error));
  }
};

// Listen to auth state changes
export const onAuthStateChange = (callback: (user: User | null) => void): () => void => {
  return onAuthStateChanged(auth, callback);
};