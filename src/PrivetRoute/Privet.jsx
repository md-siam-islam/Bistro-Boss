import React, { useContext } from "react";
import { Authcontext } from "../AuthProvider/Authprovider";
import { Navigate, useLocation } from "react-router-dom";

const Privet = ({ children }) => {
  const location = useLocation();
  const { user, loading } = useContext(Authcontext);

  if (loading) {
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

  if (user) {
    return children;
  }

 return <Navigate state={location.pathname} to="/login" />;

};

export default Privet;
