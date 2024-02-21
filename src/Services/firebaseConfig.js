import { initializeApp } from "firebase/app";
import {
  getAuth,
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyDcEqQ-dFpGi_dijsybleioWmLGWGiLjFs",
  authDomain: "chatappreactnative-a858f.firebaseapp.com",
  projectId: "chatappreactnative-a858f",
  storageBucket: "chatappreactnative-a858f.appspot.com",
  messagingSenderId: "660928246404",
  appId: "1:660928246404:web:cba79c38d87873282648d1",
};

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = initializeAuth(FIREBASE_APP, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
export const FIRESTORE_DB = getFirestore(FIREBASE_APP);
