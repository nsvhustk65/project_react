import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";

import AdminLayout from "./components/AdminLayout";
import ProductList from "./components/ProductList";
import CategoryList from "./components/CategoryList";
import BrandList from "./components/BrandList";
import UserList from "./components/UserList";
import OrderList from "./components/OrderList";
import Dashboard from "./components/Dashboard"; // ✅ thêm dòng này
import ProductDetail from "./components/ProductDetail";
import EditProduct from "./components/EditProduct";
import AddProduct from "./components/AddProduct";
import AddCategory from "./components/AddCategory";
import AddBrand from "./components/AddBrand";
import EditCategory from "./components/EditCategory";
import EditBrand from "./components/EditBrand";
import OrderDetail from "./components/OrderDetail";

function App() {
  const router = createBrowserRouter([
    {
      path: "/admin",
      element: <AdminLayout />,
      children: [
        { index: true, element: <Dashboard /> }, // ✅ Trang mặc định khi vào /admin
        { path: "products", element: <ProductList /> },
        { path: "categories", element: <CategoryList /> },
        { path: "orders", element: <OrderList /> },
        { path: "brands", element: <BrandList /> },
        { path: "users", element: <UserList /> },
        {
          path: "detail/:id",
          element: <ProductDetail />,
        },
        { path: "products/edit/:id", element: <EditProduct /> },
        {
          path: "products/add",
          element: <AddProduct />,
        },
        { path: "categories/edit/:id", element: <EditCategory /> },
        {
          path: "categories/add",
          element: <AddCategory />,
        },
        { path: "brands/edit/:id", element: <EditBrand /> },
        {
          path: "brands/add",
          element: <AddBrand />,
        },
        {
  path: "/admin/orders/:id",
  element: <OrderDetail />
}
      ],
    },
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
