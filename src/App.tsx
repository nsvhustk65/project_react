import ProductList from "./components/ProductList";
import CategoryList from "./components/CategoryList";
import "./App.css";

function App() {
  return (
    <div style={{ padding: 20 }}>
      <h2>Danh sách Sản phẩm</h2>
      <ProductList />

      <h2 style={{ marginTop: 40 }}>Danh sách Danh mục</h2>
      <CategoryList />
    </div>
  );
}

export default App;
