import ProductList from "./components/ProductList";
import CategoryList from "./components/CategoryList";
import "./App.css";
import BrandList from "./components/BrandList";
import UserList from "./components/UserList";
import OrderList from "./components/OrderList";
import { createBrowserRouter, Route, RouterProvider } from "react-router-dom";

function App() {
  const router = createBrowserRouter([
    { path: "/", element: <ProductList /> },
    { path: "/products", element: <ProductList /> },
    { path: "/categories", element: <CategoryList /> },
    { path: "/orders", element: <OrderList /> },
    { path: "/brands", element: <BrandList /> },
    { path: "/users", element: <UserList /> },
  ]);
  return (
    <div >
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
