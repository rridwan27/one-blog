import { useState, createContext, useEffect } from "react";
import { auth, googleProvider } from "../firebase/firebase.config";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import axios from "axios";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [mongoUser, setMongoUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMongoUser = async () => {
      try {
        const res = await axios.get(
          "https://one-blog-tr95.onrender.com/api/v1/user/me",
          {
            withCredentials: true,
          }
        );
        setMongoUser(res.data.user);
      } catch (err) {
        console.error("Failed to fetch MongoDB user:", err);
        setMongoUser(null);
      }
    };
    fetchMongoUser();
  }, []);

  const googleSignIn = () => {
    return signInWithPopup(auth, googleProvider);
  };

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const updateUser = (updatedData) => {
    return updateProfile(auth.currentUser, updatedData);
  };

  const logOut = () => {
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      setLoading(false);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const authData = {
    user,
    mongoUser,
    setUser,
    loading,
    setLoading,
    googleSignIn,
    createUser,
    signIn,
    updateUser,
    logOut,
  };

  return <AuthContext value={authData}>{children}</AuthContext>;
};

export default AuthProvider;
