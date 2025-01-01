import React, { createContext, useEffect, useState } from 'react';
import { auth } from '../Firebase/Firebaseinit';
import { onAuthStateChanged } from 'firebase/auth';
export const Authcontext = createContext()
const Authprovider = ({children}) => {

    const [user,setUser]=useState()
    const [loading,setLoading]=useState(true)



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
        loading
    }
    return (
        <Authcontext.Provider value={authInfo}>
            {children}
        </Authcontext.Provider>
    );
};

export default Authprovider;