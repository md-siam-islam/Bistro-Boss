import React, { createContext, useEffect, useState } from 'react';
import { auth } from '../Firebase/Firebaseinit';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile,GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import Axiospublic from '../AxiosPublic/Axiospublic';
export const Authcontext = createContext()
const Authprovider = ({children}) => {

    const [user,setUser]=useState()
    const [loading,setLoading]=useState(true)
    const useAxiospublic = Axiospublic()

    const provider = new GoogleAuthProvider();


    const userLogin = (email,password)=>{
        setLoading(true)
        return signInWithEmailAndPassword(auth,email,password)
    }

    const googleLogin = () => {
        setLoading(true)
        signInWithPopup(auth,provider)
    }

    const userSignup = (email,password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth,email,password)
        
    }

    const Usersignout = () => {
        setLoading(true)
        return signOut(auth)
    }

    const userInfo = (userData) =>{
        return updateProfile(auth.currentUser , userData)
    }
    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
          if (currentUser) {
              setUser(currentUser);
              const userInfo = { email: currentUser.email };
  
              useAxiospublic.post('/jwt', userInfo)
                  .then((res) => {
                      if (res.data.token) {
                          localStorage.setItem('access-token', res.data.token);
                      }
                  })
                  .finally(() => {
                      setLoading(false); 
                  });
          } else {
              localStorage.removeItem('access-token');
              setUser(null);
              setLoading(false);
          }
      });
  
      return () => unsubscribe();
  }, [useAxiospublic]);
  
      

    const authInfo = {
        user,
        setUser,
        loading,
        userLogin,
        userSignup,
        Usersignout,
        userInfo,
        googleLogin
    }
    return (
        <Authcontext.Provider value={authInfo}>
            {children}
        </Authcontext.Provider>
    );
};

export default Authprovider;