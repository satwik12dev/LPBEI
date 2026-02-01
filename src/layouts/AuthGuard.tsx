import { Navigate, Outlet } from "react-router-dom";

const AuthGuard = () => {
  const role = localStorage.getItem("role");

  if (!role) {
    return <Navigate to="/auth" replace />;
  }

  return <Outlet />;
};

export default AuthGuard;
