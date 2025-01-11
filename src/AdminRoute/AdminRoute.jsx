import React, { useContext } from 'react';
import useAdmin from '../AdminCheack/useAdmin';
import { useLocation } from 'react-router-dom';
import { Authcontext } from '../AuthProvider/Authprovider';

const AdminRoute = ({children}) => {
    const location = useLocation()
    const { user, loading } = useContext(Authcontext);
    const [isAdmin,isAdminLoading]=useAdmin()

  if (loading || isAdminLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div>
          <span className="loading loading-dots loading-xs"></span>
          <span className="loading loading-dots loading-sm"></span>
          <span className="loading loading-dots loading-md"></span>
          <span className="loading loading-dots loading-lg"></span>
        </div>
      </div>
    );
  }

  if (user && isAdmin) {
    return children;
  }

 return <Navigate state={{from: location}} to="/login" />;
   
};

export default AdminRoute;