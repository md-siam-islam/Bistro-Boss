import React, { createContext, useEffect, useState } from "react";
import { auth } from "../Firebase/Firebaseinit";
import { 
  createUserWithEmailAndPassword, 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  signOut, 
  updateProfile, 
  GoogleAuthProvider, 
  signInWithPopup 
} from "firebase/auth";
import Axiospublic from "../AxiosPublic/Axiospublic";

export const Authcontext = createContext();

const Authprovider = ({ children }) => {
  const [user, setUser] = useState(null); // Default value should be null
  const [loading, setLoading] = useState(true);
  const useAxiospublic = Axiospublic();

  const provider = new GoogleAuthProvider();

  // **User Login**
  const userLogin = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // **Google Login**
  const googleLogin = () => {
    setLoading(true);
    return signInWithPopup(auth, provider); // Added `return`
  };

  // **User Signup**
  const userSignup = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // **User Signout**
  const Usersignout = () => {
    setLoading(true);
    return signOut(auth);
  };

  // **Update User Info**
  const userInfo = (userData) => {
    return updateProfile(auth.currentUser, userData);
  };

  // **On Auth State Changed**
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        const userInfo = { email: currentUser.email };

        useAxiospublic
          .post("/jwt", userInfo)
          .then((res) => {
            if (res.data.token) {
              localStorage.setItem("access-token", res.data.token);
            }
            setLoading(false);
          })
      } else {
        setLoading(false);
        localStorage.removeItem("access-token");
        setUser(null);
      }
    });

    return unsubscribe;
  }, [useAxiospublic]);


  const authInfo = {
    user,
    setUser,
    loading,
    userLogin,
    userSignup,
    Usersignout,
    userInfo,
    googleLogin,
  };

  return (
    <Authcontext.Provider value={authInfo}>
      {children}
    </Authcontext.Provider>
  );
};

export default Authprovider;
