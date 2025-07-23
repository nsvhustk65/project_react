import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import React, { useState, createContext, useContext } from "react";
import "./App.css";

import AdminLayout from "./components/AdminLayout";
import ProductList from "./components/ProductList";
import CategoryList from "./components/CategoryList";
import BrandList from "./components/BrandList";
import UserList from "./components/UserList";
import OrderList from "./components/OrderList";
import Dashboard from "./components/Dashboard";
import ProductDetail from "./components/ProductDetail";
import EditProduct from "./components/EditProduct";
import AddProduct from "./components/AddProduct";
import AddCategory from "./components/AddCategory";
import AddBrand from "./components/AddBrand";
import EditCategory from "./components/EditCategory";
import EditBrand from "./components/EditBrand";
import OrderDetail from "./components/OrderDetail";
import Login from "./components/Login";
import Register from "./components/Register";
import PrivateRoute from "./components/PrivateRoute";

// Auth context để chia sẻ trạng thái đăng nhập
export const AuthContext = createContext<{token: string|null, setToken: (t: string|null) => void}>({token: null, setToken: () => {}});

const AuthProvider = ({children}: {children: React.ReactNode}) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  return <AuthContext.Provider value={{token, setToken}}>{children}</AuthContext.Provider>;
};

const useAuth = () => useContext(AuthContext);

// Wrapper cho PrivateRoute để dùng context
const PrivateRouteWithContext = ({children}: {children: React.ReactNode}) => {
  const {token} = useAuth();
  return token ? <>{children}</> : <Navigate to="/login" replace />;
};

function App() {
  const [redirectToAdmin, setRedirectToAdmin] = useState(false);
  const {token, setToken} = useAuth();

  const handleLogin = (token: string) => {
    setToken(token);
    setRedirectToAdmin(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  const router = createBrowserRouter([
    {
      path: "/login",
      element: redirectToAdmin && token ? <Navigate to="/admin" replace /> : <Login onLogin={handleLogin} />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/admin",
      element: (
        <PrivateRouteWithContext>
          <AdminLayout />
        </PrivateRouteWithContext>
      ),
      children: [
        { index: true, element: <Dashboard /> },
        { path: "products", element: <ProductList /> },
        { path: "products/add", element: <AddProduct /> },
        { path: "products/edit/:id", element: <EditProduct /> },
        { path: "detail/:id", element: <ProductDetail /> },
        { path: "categories", element: <CategoryList /> },
        { path: "categories/add", element: <AddCategory /> },
        { path: "categories/edit/:id", element: <EditCategory /> },
        { path: "brands", element: <BrandList /> },
        { path: "brands/add", element: <AddBrand /> },
        { path: "brands/edit/:id", element: <EditBrand /> },
        { path: "orders", element: <OrderList /> },
        { path: "orders/:id", element: <OrderDetail /> },
        { path: "users", element: <UserList /> },
      ],
    },
    {
      path: "/",
      element: <Navigate to="/login" replace />, // Chuyển hướng về trang đăng nhập
    },
  ]);

  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
