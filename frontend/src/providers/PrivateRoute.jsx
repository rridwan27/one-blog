import React, { useContext } from "react";
import { AuthContext } from "./AuthProvider";
import { Navigate, useLocation } from "react-router";
import { Loader } from "lucide-react";

const PrivateRoute = ({ children }) => {
  const { user, loading, mongoUser } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader className="animate-spin text-violet-600" size={40} />
      </div>
    );
  }

  if (user && user.email && mongoUser) {
    return children;
  }

  return <Navigate to="/auth/sign-in" state={location.pathname} replace />;
};

export default PrivateRoute;
