import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Button, Spin } from "antd";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
}

interface Order {
  id: string;
  products: string; // Ví dụ: "1,2"
  customerName: string;
  totalAmount: number;
  status: string;
  date: string;
}

function OrderDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: order, isLoading: orderLoading, error: orderError } = useQuery({
    queryKey: ["order", id],
    queryFn: async () => {
      const res = await fetch(`http://localhost:3001/orders/${id}`);
      if (!res.ok) throw new Error("Không tìm thấy đơn hàng");
      return res.json();
    },
  });

  const { data: allProducts, isLoading: productLoading, error: productError } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await fetch("http://localhost:3001/products");
      return res.json();
    },
  });

  if (orderLoading || productLoading) return <Spin />;
  if (orderError || productError)
    return <p className="text-danger">Lỗi: {(orderError as Error)?.message || (productError as Error)?.message}</p>;

  const productList = order.products.split(",").map((id: string) => {
    const found = allProducts.find((p: Product) => p.id === id.trim());
    return found || { id, name: "Không tìm thấy", price: 0, image: "" };
  });

  return (
    <section id="main-content">
      <section className="wrapper">
        <div className="row">
          <div className="col-sm-12">
            <section className="card">
              <header className="card-header d-flex justify-content-between align-items-center">
                Chi tiết đơn hàng #{order.id}
                <Button type="default" onClick={() => navigate(-1)}>
                  Quay lại
                </Button>
              </header>
              <div className="card-body">
                <h5>Khách hàng: {order.customerName}</h5>
                <p>Ngày đặt: {order.date}</p>
                <p>Trạng thái: {order.status}</p>
                <p>Tổng tiền: {order.totalAmount.toLocaleString()}₫</p>

                <hr />

                <h5>Sản phẩm trong đơn:</h5>
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>Hình ảnh</th>
                      <th>Tên sản phẩm</th>
                      <th>Giá</th>
                    </tr>
                  </thead>
                  <tbody>
                    {productList.map((product: Product) => (
                      <tr key={product.id}>
                        <td>
                          <img
                            src={product.image || "https://via.placeholder.com/80"}
                            alt={product.name}
                            width="80"
                          />
                        </td>
                        <td>{product.name}</td>
                        <td>{product.price.toLocaleString()}₫</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </div>
        </div>
      </section>
    </section>
  );
}

export default OrderDetail;
