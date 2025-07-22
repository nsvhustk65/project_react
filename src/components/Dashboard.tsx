import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  LineChart,
  Line,
} from "recharts";

const Dashboard: React.FC = () => {
  // Fake dữ liệu đơn hàng theo tháng
  const monthlyOrders = [
    { month: "Jan", orders: 20 },
    { month: "Feb", orders: 35 },
    { month: "Mar", orders: 50 },
    { month: "Apr", orders: 45 },
    { month: "May", orders: 60 },
    { month: "Jun", orders: 70 },
    { month: "Jul", orders: 80 },
  ];

  // Fake dữ liệu doanh thu theo tháng
  const monthlyRevenue = [
    { month: "Jan", revenue: 5000000 },
    { month: "Feb", revenue: 7500000 },
    { month: "Mar", revenue: 12000000 },
    { month: "Apr", revenue: 10000000 },
    { month: "May", revenue: 14000000 },
    { month: "Jun", revenue: 16000000 },
    { month: "Jul", revenue: 19000000 },
  ];

  // Fake dữ liệu trạng thái đơn hàng
  const orderStatus = [
    { name: "Đang xử lý", value: 40 },
    { name: "Đã giao", value: 30 },
    { name: "Đã huỷ", value: 10 },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FF8042"];

  return (
    <section id="main-content">
      <section className="wrapper">
        <div className="p-4">
          <h2 className="mb-4">Thống kê đơn hàng</h2>

          <div className="row">
            <div className="col-md-6 mb-4">
              <h5>Số đơn hàng theo tháng</h5>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monthlyOrders}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="orders" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="col-md-6 mb-4">
              <h5>Doanh thu theo tháng</h5>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={monthlyRevenue}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => `${Number(value).toLocaleString()}₫`} />
                  <Legend />
                  <Line type="monotone" dataKey="revenue" stroke="#82ca9d" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6 mb-4">
              <h5>Tỉ lệ trạng thái đơn hàng</h5>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={orderStatus}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={100}
                    fill="#8884d8"
                    label
                  >
                    {orderStatus.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
};

export default Dashboard;
