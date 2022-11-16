import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBEeH0z2vVCgmX_vfrbk_GcaBqIn2c0dFY',
  authDomain: 'my-8dbeb.firebaseapp.com',
  projectId: 'my-8dbeb',
  storageBucket: 'my-8dbeb.appspot.com',
  messagingSenderId: '41814011353',
  appId: '1:41814011353:web:9977ee0bf9e9ac93e1bdc8'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();

export default app;
