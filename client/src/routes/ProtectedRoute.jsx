import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ children, redirectPath = "/signin" }) => {
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to={redirectPath} replace />;
  }
  return children ? children : <Outlet />;
};

export default ProtectedRoute;
