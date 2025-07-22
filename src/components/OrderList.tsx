import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { Spin, Button } from "antd";

interface Product {
  id: string;
  name: string;
}

interface Order {
  id: string;
  products: string; // danh sách id sản phẩm, ví dụ: "1,2"
  userId: string;
  customerName: string;
  totalAmount: number;
  status: string;
  date: string;
}

function OrderList() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const {
    data: orders,
    isLoading: isOrdersLoading,
    error: ordersError,
  } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const res = await fetch("http://localhost:3001/orders");
      return res.json();
    },
  });

  const {
    data: products,
    isLoading: isProductsLoading,
    error: productsError,
  } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await fetch("http://localhost:3001/products");
      return res.json();
    },
  });

  const getProductNames = (ids: string) => {
    if (!products) return "";
    const idArray = ids.split(",");
    const names = idArray.map((id) => {
      const found = products.find((p: Product) => p.id === id.trim());
      return found ? found.name : "Không tìm thấy";
    });
    return names.join(", ");
  };

  const filteredOrders = orders?.filter((order: Order) => {
    const keyword = searchTerm.toLowerCase();
    const productNames = getProductNames(order.products).toLowerCase();
    return (
      order.customerName.toLowerCase().includes(keyword) ||
      order.status.toLowerCase().includes(keyword) ||
      productNames.includes(keyword)
    );
  });

  return (
    <section id="main-content">
      <section className="wrapper">
        <div className="row">
          <div className="col-sm-12">
            <section className="card">
              <header className="card-header">
                Danh sách đơn hàng
                <span className="tools pull-right">
                  <a href="#" className="fa fa-chevron-down"></a>
                  <a href="#" className="fa fa-times"></a>
                </span>
              </header>
              <div className="card-body">
                <div className="form-group mb-3 d-flex justify-content-between align-items-center">
                  <form className="d-flex w-100">
                    <input
                      type="text"
                      name="search"
                      className="form-control"
                      placeholder="Tìm kiếm đơn hàng..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      style={{ width: "300px" }}
                    />
                  </form>
                </div>

                {(isOrdersLoading || isProductsLoading) && <Spin />}
                {(ordersError || productsError) && (
                  <p className="text-danger">
                    Đã xảy ra lỗi:{" "}
                    {(ordersError as Error)?.message ||
                      (productsError as Error)?.message}
                  </p>
                )}

                <div className="adv-table">
                  <table className="table table-striped table-bordered">
                    <thead>
                      <tr>
                        <th className="center">STT</th>
                        <th>Mã đơn hàng</th>
                        <th>Sản phẩm</th>
                        <th>Khách hàng</th>
                        <th>Tổng tiền</th>
                        <th>Trạng thái</th>
                        <th>Ngày đặt</th>
                        <th className="center">Hành động</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredOrders && filteredOrders.length > 0 ? (
                        filteredOrders.map((order: Order, index: number) => (
                          <tr key={order.id}>
                            <td className="center">{index + 1}</td>
                            <td>{order.id}</td>
                            <td>{getProductNames(order.products)}</td>
                            <td>{order.customerName}</td>
                            <td>{order.totalAmount.toLocaleString()}₫</td>
                            <td>{order.status}</td>
                            <td>{order.date}</td>
                            <td className="center">
                              <Button
                                type="primary"
                                onClick={() => navigate(`/admin/orders/${order.id}`)}
                                style={{ fontWeight: "bold" }}
                              >
                                Xem chi tiết
                              </Button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={8} className="text-center">
                            Không có dữ liệu phù hợp.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
          </div>
        </div>
      </section>
    </section>
  );
}

export default OrderList;
