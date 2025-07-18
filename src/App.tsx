import ProductList from "./components/ProductList";
import CategoryList from "./components/CategoryList";
import BrandList from "./components/BrandList";
import UserList from "./components/UserList";
import OrderList from "./components/OrderList";
import AdminLayout from "./components/AdminLayout";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";

function App() {
  const router = createBrowserRouter([
    {
      path: "/admin",
      element: <AdminLayout />,
      children: [
        { path: "products", element: <ProductList /> },
        { path: "categories", element: <CategoryList /> },
        { path: "orders", element: <OrderList /> },
        { path: "brands", element: <BrandList /> },
        { path: "users", element: <UserList /> },
        { index: true, element: <ProductList /> }, // /admin mặc định là ProductList
      ],
    },
    // Optional: route mặc định chuyển hướng về /admin
    {
      path: "/",
      element: <div>Redirecting...</div>,
      loader: () => {
        window.location.href = "/admin";
        return null;
      },
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
