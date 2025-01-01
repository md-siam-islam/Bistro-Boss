import React, { createContext, useEffect, useState } from 'react';
import { auth } from '../Firebase/Firebaseinit';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth';
export const Authcontext = createContext()
const Authprovider = ({children}) => {

    const [user,setUser]=useState()
    const [loading,setLoading]=useState(true)


    const userLogin = (email,password)=>{
        setLoading(true)
        return signInWithEmailAndPassword(auth,email,password)
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
    useEffect(()=>{
        const unsudscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser)
            console.log(currentUser);
        })

        return () => {
            return unsudscribe()
        }
    },[])

    const authInfo = {
        user,
        setUser,
        loading,
        userLogin,
        userSignup,
        Usersignout,
        userInfo
    }
    return (
        <Authcontext.Provider value={authInfo}>
            {children}
        </Authcontext.Provider>
    );
};

export default Authprovider;