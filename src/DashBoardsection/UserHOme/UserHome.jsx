import React, { useContext } from 'react';
import { Authcontext } from '../../AuthProvider/Authprovider';

const UserHome = () => {
    const {user} = useContext(Authcontext)
    return (
       <div>
          <span className='uppercase flex items-center gap-2 '>
          <h1 className='text-2xl font-semibold'>Hi Welcome</h1> 
          <h1 className='stext-2xl font-semibold'> {
            user ? user.displayName : "Back"
           }</h1>
          </span>
        </div>
    );
};

export default UserHome;