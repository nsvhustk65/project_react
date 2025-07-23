import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const token = localStorage.getItem("token");
  const userStr = localStorage.getItem("user");
  let role = null;
  if (userStr) {
    try {
      const user = JSON.parse(userStr);
      role = user.role;
    } catch {}
  }
  if (!token) return <Navigate to="/login" />;
  if (role !== "admin") return <Navigate to="/login" state={{ error: "Bạn không được phép truy cập" }} />;
  return <>{children}</>;
};

export default PrivateRoute; 