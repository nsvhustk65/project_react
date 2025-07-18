import ProductList from "./components/ProductList";
import CategoryList from "./components/CategoryList";
import "./App.css";
import BrandList from "./components/BrandList";
import UserList from "./components/UserList";
import OrderList from "./components/OrderList";

function App() {
  return (
    <div style={{ padding: 20 }}>
      <h2>Danh sách Sản phẩm</h2>
      <ProductList />

      <h2 style={{ marginTop: 40 }}>Danh sách D anh mục</h2>
      <CategoryList />

      <h2 style={{ marginTop: 40 }}>Danh sách Thương hiệu</h2>
      <BrandList />

      <h2 style={{ marginTop: 40 }}>Danh sách Người dùng</h2>
      <UserList />
            <h2 style={{ marginTop: 40 }}>Danh sách Đơn hàng</h2>
      <OrderList />
    </div>
  );
}

export default App;
